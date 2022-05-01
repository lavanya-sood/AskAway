import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import firebaseSDK from '../config/firebaseSDK';

export default function Login({ navigation }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const onPressLogin = async () => {
		setLoading(true);

		const user = {
			email: email,
			password: password
		};

		await firebaseSDK.login(user, loginSuccess, loginFailed);
	};

	const loginSuccess = () => {
		setLoading(false);
		navigation.navigate('Home');
	};

	const loginFailed = () => {
		alert('Login failed. Email or password is invalid');
		setLoading(false);
	};

	return (
		<View style={styles.container}>		
			<Text style={styles.logo}>AskAway</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Email"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) => {
						setEmail(text);
					}}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					secureTextEntry
					style={styles.inputText}
					placeholder="Password"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) => {
						setPassword(text);
					}}
				/>
			</View>
			{loading ?
				<ActivityIndicator
				style={styles.showLoading}
				size="large"
				animating={loading}
				color="white"
				/> :
				<TouchableOpacity style={styles.loginBtn} onPress={() => onPressLogin()}>
					<Text style={styles.loginText}>Login</Text>
				</TouchableOpacity>
			}
			<TouchableOpacity>
				<Text
					style={styles.signupText}
					onPress={() => {
						navigation.navigate('Signup');
					}}
				>
					New user? Sign up here
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#B21838',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		height: '100%'
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 50,
		color: 'white',
		marginBottom: 40
	},
	inputView: {
		width: '80%',
		backgroundColor: 'white',
		borderColor: '#B21838',
		borderRadius: 25,
		borderStyle: 'solid',
		borderWidth: 2,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20
	},
	inputText: {
		height: 50,
		color: 'black'
	},
	forgot: {
		color: 'white',
		fontSize: 13,
		textDecorationLine: 'underline',
		marginBottom: 5
	},
	error: {
		color: 'yellow',
		fontSize: 13,
		borderRadius: 25,
		marginBottom: 5
	},
	loginBtn: {
		width: '80%',
		backgroundColor: 'white',
		borderColor: 'white',
		borderRadius: 10,
		borderStyle: 'solid',
		borderWidth: 0.5,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		marginBottom: 10,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
		elevation: 5
	},
	loginText: {
		color: '#B21838',
		fontSize: 23
	},
	signupText: {
		marginTop: 20,
		fontSize: 15,
		color: 'white',
		textDecorationLine: 'underline'
	},
	showLoading: {
		marginBottom: 25,
		marginTop: 20,
		marginBottom: 10,
	}
});
