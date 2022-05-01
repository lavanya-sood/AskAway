import React, { useState, useEffect } from "react";
import { GiftedChat, Bubble, Send, SystemMessage } from "react-native-gifted-chat";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";
import Question from "../components/QuestionGen.js";

export default function RoomScreen({ route }) {
	const [ messages, setMessages ] = useState([]);
	const currentUser = firebase.auth().currentUser;
	const { thread } = route.params;

	async function handleSend(messages) {
		const text = messages[0].text;
		firebase.firestore()
			.collection("Chatrooms")
			.doc(thread._id)
			.collection("Messages")
			.add({
				text,
				createdAt: new Date().getTime(),
				user: {
					_id: currentUser.uid,
					email: currentUser.email,
					name:currentUser.displayName
				}
			});

		await firebase.firestore()
			.collection("Chatrooms")
			.doc(thread._id)
			.set(
				{
					latestMessage: {
						text,
						time: new Date().getTime(),
						user: currentUser.displayName,
						name:currentUser.displayName
					}
				},
				{ merge: true }
			);
	}

	useEffect(() => {
		const messagesListener = firebase
			.firestore()
			.collection("Chatrooms")
			.doc(thread._id)
			.collection("Messages")
			.orderBy("createdAt", "desc")
			.onSnapshot((querySnapshot) => {
				const messages = querySnapshot.docs.map((doc) => {
					const firebaseData = doc.data();

					const data = {
						_id: doc.id,
						text: "",
						createdAt: new Date().getTime(),
						...firebaseData
					};

					if (!firebaseData.system) {
						data.user = {
							...firebaseData.user,
							name: firebaseData.user.name,
						};
					}
					return data;
				});

				setMessages(messages);
			});

		// Stop listening for updates whenever the component unmounts
		return () => messagesListener();
	}, []);

	function renderBubble(props) {
		return (			
			<View>
				<Text style={props.currentMessage.user.name === currentUser.displayName ? styles.name : ""}>{props.currentMessage.user.name}</Text>
				<Bubble
					{...props}
					wrapperStyle={{
						right: {
							backgroundColor:  "#B21838"
						},
						left: {
							backgroundColor:  "#fff"
						}
					}}
					textStyle={{
						right: {
							color: "#fff"
						},
						left: {
							color: "black"
						}
					}}
				/>
			</View>	
		);
	}

	function renderLoading() {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#B21838" />
			</View>
		);
	}

	function renderSend(props) {
		return (
			<Send {...props}>
				<View style={styles.sendingContainer}>
					<IconButton icon="send-circle" size={40} color="#B21838" />
				</View>
			</Send>
		);
	}

	function scrollToBottomComponent() {
		return (
			<View style={styles.bottomComponentContainer}>
				<IconButton icon="chevron-double-down" size={36} color="#B21838" />
			</View>
		);
	}

	function renderSystemMessage(props) {
		return (
			<SystemMessage {...props} wrapperStyle={styles.systemMessageWrapper} textStyle={styles.systemMessageText} />
		);
	}

	return (
		<>
			<Question />
			<GiftedChat
				messages={messages}
				onSend={handleSend}
				user={{ 
					_id: currentUser.uid,
				}}
				placeholder="Type your message here..."
				alwaysShowSend
				showUserAvatar
				scrollToBottom
				renderBubble={renderBubble}
				renderLoading={renderLoading}
				renderSend={renderSend}
				scrollToBottomComponent={scrollToBottomComponent}
				renderSystemMessage={renderSystemMessage}
				style={{backgroundColor: "white"}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	sendingContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	bottomComponentContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	systemMessageWrapper: {
		backgroundColor: "#4E4E4E",
		borderRadius: 4,
		padding: 5
	},
	systemMessageText: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
	name: {
		textAlign: "right"
	}
});
