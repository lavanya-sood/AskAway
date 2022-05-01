import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

const styles = StyleSheet.create({
	outercontainer: {
		flexDirection: "row",
		marginTop:20,
		textAlign:"center",
		justifyContent: "center",
		alignItems: "center",
		textAlignVertical:"center"
	},
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textAlign:"center",
		borderRadius: 20,
		width:300,
		height:85,
		borderColor:"#B21838",
		borderStyle:"solid",
		borderWidth:2,
		backgroundColor:"white"
	},
	question: {
		color: "#B21838",
		marginRight: 20,
        marginLeft: 20,
		fontSize: 16,
		fontWeight:"bold",
		textAlign:"center"
	},
});

export default function Questions() {
	const [ currIndex, setCurrIndex ] = useState(0);
	const [ questions, setQuestions ] = useState([]);

	useEffect(() => {
		const subscriber = firebase.firestore().collection("Questions").onSnapshot((querySnapshot) => {
			const questionBank = querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data().question);
			setQuestions(questionBank);
		});
		return () => subscriber();
	}, []);

	const showPrevQuestion = () => {
        if (currIndex - 1 !== -1) {
            const curr = currIndex - 1;
            setCurrIndex(curr);
        }
	};

	const showNextQuestion = () => {
        if (currIndex + 1 !== questions.length) {
            const curr = currIndex + 1;
            setCurrIndex(curr);
        }
	};

	return (
		<View style={styles.outercontainer}>
			<AntDesign
				name="caretleft"
				onPress={() => showPrevQuestion()}
				size={24}
				color={currIndex - 1 !== -1 ? "black" : "white"}
			/>
			<View style={styles.container}>
				<Text style={styles.question}>{questions[currIndex]}</Text>
			</View>
			<AntDesign
				name="caretright"
				onPress={() => showNextQuestion()}
				size={24}
				color={currIndex + 1 !== questions.length ? "black" : "white"}
			/>
		</View>
	);
}
