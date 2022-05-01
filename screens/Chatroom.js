import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import moment from "moment";
import { List, Divider } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";
import { Searchbar } from "react-native-paper";

export default function Chatroom({ navigation }) {
	const [ chatrooms, setChatrooms ] = useState([]);
	const name = firebase.auth().currentUser.displayName;
	const [searchQuery, setSearchQuery] = React.useState("");

	const onChangeSearch = query => setSearchQuery(query);
	
	// Fetch chatrooms from Firestore
	useEffect(() => {
		const subscriber = firebase
			.firestore()
			.collection("Chatrooms")
			.orderBy("latestMessage.time", "desc")
			.onSnapshot((querySnapshot) => {				
				const chatrooms = querySnapshot.docs
					.filter((documentSnapshot) => {
						if (searchQuery !== "") {
							return documentSnapshot.data().usersJoined.includes(name) && documentSnapshot.data().name.includes(searchQuery);
						}
						return documentSnapshot.data().usersJoined.includes(name);						
					})
					.map((documentSnapshot) => {
						return {
							_id: documentSnapshot.id,
							// initialising default values
							name: "",
							latestMessage: {
								time: "",
								text: "",
								user: ""
							},

							// edit data
							name: documentSnapshot.data().name,
							latestMessage: documentSnapshot.data().latestMessage
						};
					});
				console.log(chatrooms);
				setChatrooms(chatrooms);
			});
		// unsubscribe listener
		return () => subscriber();
	}, [searchQuery]);

	const dateToString = (date) => {
		return moment(date).fromNow();
	};

	return (
		<View style={styles.container}>
			{chatrooms.length === 0 ? (
				<Text style={styles.message}>You currently have no chatrooms. Tap the plus button to create one.</Text>
			) : (
				<>
					<Searchbar    
						placeholder="Search by chatroom name"
						onChangeText={onChangeSearch}
						value={searchQuery}
					/>
					<FlatList
						data={chatrooms}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => navigation.navigate("Chat", { thread: item })}>
								<List.Item
									title={item.name}
									description={item.latestMessage.user ? `${item.latestMessage.user}: ${item.latestMessage.text}`: " "}
									titleNumberOfLines={1}
									titleStyle={styles.listTitle}
									descriptionStyle={styles.listDescription}
									descriptionNumberOfLines={1}
									descriptionEllipsizeMode="tail"
									right={(props) => (
										<List.Item
											{...props}
											title={dateToString(item.latestMessage.time)}
											titleNumberOfLines={1}
											descriptionNumberOfLines={1}
											description="example"
											descriptionStyle={styles.invisible}
										/>
									)}
								/>
								<Divider />
							</TouchableOpacity>
						)}
					/>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	listTitle: {
		fontSize: 22,
		fontWeight: "600"
	},
	listDescription: {
		fontSize: 18,
		color: "black"
	},
	invisible: {
		color: "transparent"
	},
	message: {
		margin: 30,
		marginTop: 50,
		textAlign: "center",
		fontSize: 18
	}
});
