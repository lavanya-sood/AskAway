import React from "react";
import { Share, Text, TouchableOpacity, StyleSheet } from "react-native";

const ShareBtn = ({ thread }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Ask Away | You are invited to ${thread.name}'s chatroom: ${thread._id}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity style={styles.btn} onPress={onShare}>
      <Text style={styles.btnText}>Share</Text>
    </TouchableOpacity>
  );
};

export default ShareBtn;

const styles = StyleSheet.create({
	btn: {
    backgroundColor: "#B21838",
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
  },
  btnText: {
    color: "white",
  }
});