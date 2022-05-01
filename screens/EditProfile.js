import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import firebaseSDK from "../config/firebaseSDK";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#B21838",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		color: "white"
	},
	btn: {
		flexDirection: "row",
		marginTop: 10,
		display: "flex",
		justifyContent: "center",
		marginLeft: "3%"
	},
	profilepic: {
        flexDirection: "row",
        marginBottom: 20,
	},
	saveBtn: {
		width: "30%",
		backgroundColor: "white",
		borderRadius: 10,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		marginRight: 20,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
		elevation: 5
	},
	saveText: {
		color: "#B21838",
		fontSize: 23
	},
	inputView: {
		width: "80%",
		backgroundColor: "white",
		borderColor: "#B21838",
		borderRadius: 25,
		borderStyle: "solid",
		borderWidth: 2,
		height: 40,
		marginBottom: 10,
		justifyContent: "center",
		padding: 10
	},
	inputText: {
		height: 30,
		color: "black"
	},
	uploadProfile: {
		width: 120,
		backgroundColor: "white",
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 60,
        textAlign: "center",
        padding: 20,
    },
    picBtnContainer: {
        alignItems: "flex-end",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    profileButtons: {
        width: "40%"
    },
    icon: {
        paddingRight: 5
    },
	editProfile: {
		backgroundColor: "#B21838",
		borderColor: "white",
		borderRadius: 25,
		borderStyle: "solid",
		borderWidth: 0.5,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
        marginLeft: 20,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: "row",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
		elevation: 5
    },
	editText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14
	},
	uploadText: {
		color: "black",
        fontSize: 14,
        textAlign: "center"
	},
	media: {
		width: 120,
		height: 120,
		borderRadius: 60
	},
	title: {
		marginBottom: 10,
		color: "white",
		fontWeight: "bold"
	}
});

export default function EditProfile({ navigation }) {
	const [ email, setEmail ] = useState(firebase.auth().currentUser.email);
	const [ newpassword, setNewPassword ] = useState("");
	const oldemail = firebase.auth().currentUser.email;
	const [ oldpassword, setOldPassword ] = useState("");
	const [ name, setName ] = useState(firebase.auth().currentUser.displayName);
	const [ pic, setPic ] = useState("");
	const [ chgpassword, setChgPassword ] = useState(false);

	useEffect(() => {
		if (firebase.auth().currentUser.photoURL) {
			setPic(firebase.auth().currentUser.photoURL);
		}
	}, []);

	const onImageUpload = async () => {
		try {
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [ 1, 1 ]
			});
			if (!pickerResult.cancelled) {
				setPic(pickerResult.uri);
				firebaseSDK.uploadProfileImg(pickerResult.uri);
			}
		} catch (err) {
			alert("Upload image error: " + err.message);
		}
	};

	const onImageDeletion = async () => {
		try {
			setPic("");
			firebaseSDK.uploadProfileImg("");
		} catch (err) {
			alert("Upload image error: " + err.message);
		}
	};

	const onSave = async () => {
		if (chgpassword && oldpassword === "") {
			alert("Please enter current password to change email or password");
			return;
		}
		const user = {
			name: name,
			email: email,
			newpassword: newpassword,
			oldpassword: oldpassword,
			oldemail: oldemail
		};
		firebaseSDK.updateUserDetails(user, editSuccess);
	};

	const editSuccess = () => {
		navigation.navigate("Profile");
	};

	return (
		<View style={styles.container}>
			<View style={styles.profilepic}>
                {pic !== "" ? (
                    <Image source={{ uri: pic }} style={styles.media} alt="profile pic" />
                ) : (
                    <View style={styles.uploadProfile}>
                        <Text style={styles.uploadText}>Your profile picture is empty</Text>
                    </View>
                )}
                <View style={styles.picBtnContainer}>
                    <TouchableOpacity style={styles.editProfile} onPress={() => onImageUpload()}>
                        <Entypo name="edit" style={styles.icon} size={20} color="white" />
                        <Text style={styles.editText}>Upload picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editProfile} onPress={() => onImageDeletion()}>
                        <Entypo name="trash" style={styles.icon} size={20} color="white" />
                        <Text style={styles.editText}>Delete picture</Text>
                    </TouchableOpacity>
                </View>			
			</View>

			<Text style={styles.title}>Name</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder={name}
					value={name}
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) => setName(text)}
				/>
			</View>
			<Text style={styles.title}>Email</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder={email}
					value={email}
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) => {
						setEmail(text);
						setChgPassword(true);
					}}
				/>
			</View>
			<Text style={styles.title}>Password</Text>
			<View style={styles.inputView}>
				<TextInput
					secureTextEntry
					style={styles.inputText}
					placeholder="Enter new password"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) => {
						setNewPassword(text);
						setChgPassword(true);
					}}
				/>
			</View>
			{chgpassword && (
				<View style={styles.inputView}>
					<TextInput
						secureTextEntry
						style={styles.inputText}
						placeholder="Enter current password"
						placeholderTextColor="#003f5c"
						autoCapitalize="none"
						onChangeText={(text) => setOldPassword(text)}
					/>
				</View>
			)}
			<View style={styles.btn}>
				<TouchableOpacity style={styles.saveBtn} onPress={() => onSave()}>
					<Text style={styles.saveText}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.saveBtn}
					onPress={() => {
						navigation.navigate("Profile");
					}}
				>
					<Text style={styles.saveText}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
