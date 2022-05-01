import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import firebaseSDK from "../config/firebaseSDK";

export default function Signup({ navigation }) {
	const [ email, setEmail ] = useState("");
	const [ name, setName ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ repassword, setRePassword ] = useState("");
	const [ loading, setLoading ] = useState(false);

	const onPressSignup = async () => {
		if (password !== repassword) {
			alert("Password does not match");
			return;
		}
		setLoading(true);
		try {
			const user = {
				email: email,
				password: password,
				name: name
			};
			await firebaseSDK.createAccount(user, signupSuccess, signUpFailed);			
		} catch ({ message }) {			
			setLoading(false);
			alert("Creating an account failed. Error: " + message);
		}		
	};

	const signupSuccess = () => {
		navigation.navigate("Home");
		setLoading(false);
	};

	const signUpFailed = (error) => {
		alert(error.message);
		setLoading(false);
	};

	return (
		<View style={styles.container}>			
			<Text style={styles.logo}>AskAway</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Name"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) => setName(text)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Email"
					autoCapitalize="none"
					placeholderTextColor="#003f5c"
					onChangeText={(text) => setEmail(text)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					secureTextEntry
					style={styles.inputText}
					placeholder="New Password"
					autoCapitalize="none"
					placeholderTextColor="#003f5c"
					textContentType={"oneTimeCode"}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					secureTextEntry
					style={styles.inputText}
					autoCapitalize="none"
					placeholder="Confirm New Password"
					placeholderTextColor="#003f5c"
					textContentType={"oneTimeCode"}
					onChangeText={(text) => setRePassword(text)}
				/>
			</View>
			{loading ?
				<ActivityIndicator
				style={styles.showLoading}
				size="large"
				animating={loading}
				color="white"
				/> :
				<TouchableOpacity style={styles.loginBtn} onPress={() => onPressSignup()}>
					<Text style={styles.loginText}>Sign Up</Text>
				</TouchableOpacity>
			}
			<TouchableOpacity>
				<Text
					style={styles.signupText}
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					Already a user? Login here
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#B21838",
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
		height: "100%"
	},
	logo: {
		fontWeight: "bold",
		fontSize: 50,
		color: "white",
		marginBottom: 40
	},
	inputView: {
		width: "80%",
		backgroundColor: "white",
		borderColor: "#B21838",
		borderRadius: 25,
		borderStyle: "solid",
		borderWidth: 2,
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 20
	},
	inputText: {
		height: 50,
		color: "black"
	},
	forgot: {
		color: "black",
		fontSize: 13,
		textDecorationLine: "underline"
	},
	loginBtn: {
		width: "80%",
		backgroundColor: "white",
		borderColor: "white",
		borderRadius: 10,
		borderStyle: "solid",
		borderWidth: 0.5,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 10,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 2,  
		elevation: 5
	},
	loginText: {
		color: "#B21838",
		fontSize: 23,
	},
	signupText: {
		color: "white",
		textDecorationLine: "underline",
		marginTop: 20
	},
	error: {
		color: "yellow",
		fontSize: 13,
		borderRadius: 25,
		marginBottom: 5
	},
	showLoading: {
		marginBottom: 25,
		marginTop: 20,
		marginBottom: 10,
	}
});