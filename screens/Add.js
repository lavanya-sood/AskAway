import React from "react";
// import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		backgroundColor: "#ffffff"
	},
	createBtn: {
		width: "90%",
		backgroundColor: "#4E4E4E",
		borderColor: "white",
		borderRadius: 10,
		borderStyle: "solid",
		borderWidth: 0.5,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	createText: {
		color:"white",
		fontSize: 23
	},
	joinButton: {
		width: "90%",
		backgroundColor: "white",
		borderColor: "#4E4E4E",
		borderRadius: 10,
		borderStyle: "solid",
		borderWidth: 3,
		alignItems: "center",
		justifyContent: "center",
		color: "#4E4E4E",
		marginTop: 20,
		marginBottom: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	joinText: {
		fontSize: 23,
		color: "#4E4E4E",
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
	or: {
		fontSize: 20
	}
});

export default function Add({ navigation }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity 
				style={styles.joinButton}
				onPress={() => {
					navigation.navigate("Join");
				}}
			>
				<Text style={styles.joinText}>Join a Room</Text>
			</TouchableOpacity>
			<View style={styles.dividerArea}>
				<View style={styles.lineStyle} />
				<Text style={styles.or}>OR </Text>
				<View style={styles.lineStyle} />
			</View>
			<TouchableOpacity 
				style={styles.createBtn} 
				onPress={() => {
					navigation.navigate("Create");
				}}>
				<Text style={styles.createText}>Create a Room</Text>
			</TouchableOpacity>
		</View>
	);
}
