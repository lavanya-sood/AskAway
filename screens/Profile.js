import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import firebaseSDK from "../config/firebaseSDK";

const styles = StyleSheet.create({
	container: {
		paddingTop: 150,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 300
	},
	logoutBtn: {
		backgroundColor: "#B21838",
		borderColor: "white",
		borderRadius: 10,
		borderStyle: "solid",
		borderWidth: 0.5,
		height: 50,
		width: "80%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50
	},
	logoutText: {
		color: "white",
		fontSize: 23,
	},
	edit: {
		alignSelf: "flex-end",
		marginRight: 50
	},
	title: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold"
	},
	email: {
		color: "black",
		fontSize: 20,
		marginTop: 10
	},
	uploadProfile: {
		borderWidth: 0.5,
		width: 120,
		backgroundColor: "white",
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 60,
		padding: 20,
		marginBottom: 20,
	},
	uploadText: {
		color: "black",
		fontSize: 14,
		textAlign: "center",
	},
	media: {
		width: 120,
		height: 120,
		marginBottom: 20,
		borderRadius: 60
	}
});

export default function Profile({ navigation }) {
	const [ username, setUsername ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ pic, setPic ] = useState("");

	useEffect(() => {
		setPic(firebase.auth().currentUser.photoURL);
		setEmail(firebase.auth().currentUser.email);
		setUsername(firebase.auth().currentUser.displayName);
	}, []);

	useEffect(() => {
		const show = navigation.addListener("focus",()=>{
			setPic(firebase.auth().currentUser.photoURL);
			setEmail(firebase.auth().currentUser.email);
			setUsername(firebase.auth().currentUser.displayName);
		})
		return () => show;
	}, [navigation]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.edit}
				onPress={() => {
					navigation.navigate("Edit Profile");
				}}
			>
				<Entypo name="edit" size={30} color="black" />
			</TouchableOpacity>
			<View>
				{pic ? (
					<Image source={{ uri: pic }} style={styles.media} alt="profile pic"/>
				) : (
					<View style={styles.uploadProfile}>
						<Text style={styles.uploadText}>Your profile picture is empty</Text>
				 	</View>
				)}
			</View>
			<Text style={styles.title}>{username}</Text>
			<Text style={styles.email}>{email}</Text>

			<TouchableOpacity
				style={styles.logoutBtn}
				onPress={() => {
					navigation.navigate("Login");
				}}
			>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}
