import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Clipboard } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

export default function Join({ navigation }) {
	const [ roomCode, setRoomCode ] = useState("");
	const [ latestMessage, setlatestMessage ] = useState("");
	const [ roomName, setroomName ] = useState("");

	const fetchCopiedText = async () => {
		const text = await Clipboard.getString();
		setRoomCode(text);
	};

	const joinARoom = async () => {
		const chat = firebase.firestore().collection("Chatrooms").doc(roomCode);
		const doc = await chat.get();
		if (!doc.exists) {
			alert("Wrong room code");
		} else {
			const dat = doc.data();
			setlatestMessage(dat.latestMessage);
			setroomName(dat.name);

			const user = firebase.auth().currentUser.displayName;
			let joined = dat.usersJoined;
			if (!joined.includes(user)) {
				joined.push(user);
				chat.set(
					{
						usersJoined: joined
					},
					{ merge: true }
				);
			}
			const obj = {
				_id: roomCode,
				latestMessage: latestMessage,
				name: roomName
			};
			navigation.navigate("Chat", { thread: obj });
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.intro}>Please enter a room code below to join </Text>

			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Room Code"
					placeholderTextColor="#003f5c"
					onChangeText={(text) => setRoomCode(text)}
					value={roomCode}
				/>
			</View>

			<TouchableOpacity onPress={() => fetchCopiedText()}>
				<Text style={styles.copy}>Enter copied text</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.createBtn} onPress={() => joinARoom()}>
				<Text style={styles.createText}>Let's ask</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		paddingTop: "30%",
		height: "100%",
		backgroundColor: "#ffffff"
	},
	copy:{
		textDecorationLine:'underline'
	},
	createBtn: {
		width: "80%",
		backgroundColor: "#B21838",
		borderColor: "white",
		borderRadius: 10,
		borderStyle: "solid",
		borderWidth: 0.5,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 90,
		marginBottom: 20,
		paddingTop: 10,
		paddingBottom: 10
	},
	createText: {
		fontSize: 23,
		color: "white"
	},
	intro: {
		fontSize: 17,
		marginTop: 20,
		marginBottom:10,
		width: "95%",
		color: "#000000",
		fontWeight:"bold",
		textAlign: "center"
	},
	dividerArea: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	lineStyle: {
		borderWidth: 1,
		borderColor: "#4E4E4E",
		width: "30%",
		margin: 10
	},
	inputView: {
		width: "80%",
		backgroundColor: "white",
		borderColor: "rgba(0, 0, 0, 0.4)",
		borderRadius: 10,
		borderStyle: "solid",
		borderWidth: 2,
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 10
	},
	inputText: {
		fontSize: 15,
		color: "black"
	}
});
