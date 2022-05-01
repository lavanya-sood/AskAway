import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Clipboard } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		backgroundColor: "#ffffff"
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
	intro: {
		fontSize: 20,
		marginTop: 20,
		color: "#000000",
		fontWeight:"bold",
		textAlign: "center"
	},
	code:{
		color: "#B21838",
		fontWeight:"bold",
		fontSize:18,
		marginTop:10,
		marginBottom:10
	},
	room:{
		fontSize:20,
		marginTop:3
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
	},
	copy: {
		borderStyle:"solid",
		borderColor:"black",
		borderWidth:2,
		borderRadius:3,
		padding:5,
		fontSize:15
	}
});

export default function Create({ navigation }) {
	const [ roomCode, setRoomCode ] = useState("");
	const [ roomName, setRoomName ] = useState("");
	const [ success, setSuccess ] = useState(false);
	const [copytext,setCopyText] = useState("Copy to clipboard");
	
	const createARoom = async () => {
		const chatrooms = firebase.firestore().collection("Chatrooms");
		const user = firebase.auth().currentUser.displayName;
		if (roomName === ""){
			alert("Please enter a room name");
			return;
		}
		chatrooms.add({
			name: roomName,
			createdBy: user,
			usersJoined: [user],
			latestMessage: {
				time: new Date().getTime()
			}
		});

		const snapshot = await chatrooms.where("name", "==", roomName).get();

		snapshot.forEach((doc) => {
			setRoomCode(doc.id);
		});
		setSuccess(true);
	};

	const copyToClipboard = () => {
		Clipboard.setString(roomCode);
		setCopyText("Copied!");
	};

	const goToRoom = () => {
		const obj = {
			_id: roomCode,
			name: roomName
		};
		navigation.navigate("Chat", { thread: obj });	
	};

	if (success) {
		return (
			<View style={styles.page}>
				<View style={styles.container} className="pag1">
					<Text style={styles.intro}>Created new room:</Text>
					<Text style={styles.room}>{roomName}</Text>
					<Text style={styles.intro}>Send this code to friends</Text>
					<Text style={styles.code}>{roomCode}</Text>
					<TouchableOpacity onPress={() => copyToClipboard()}>
						<Text style={styles.copy}>{copytext}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.createBtn} onPress={() => goToRoom()}>
						<Text style={styles.createText}>Start</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	return (
		<View style={styles.page}>
			<View style={styles.container} className="pag1">
				<Text style={styles.intro}>Enter a name for your chat</Text>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Room Name"
						placeholderTextColor="#003f5c"
						onChangeText={(text) => setRoomName(text)}
					/>
				</View>
				<TouchableOpacity style={styles.createBtn} onPress={() => createARoom()}>
					<Text style={styles.createText}>Create</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
