import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../components/navigators/ProfileNav.js";
import Chatroom from "../components/navigators/ChatroomsNav.js";
import Add from "../components/navigators/CreateRoomNav.js";

const Tab = createBottomTabNavigator();

export default function TabbedNav({ notifications }) {
  return (
    <Tab.Navigator
        initialRouteName="Chatroom"
        tabBarOptions={{
            activeTintColor: "#B21838",
            inactiveTintColor: "gray",
        }}
    >
        <Tab.Screen name="Chatroom" component={Chatroom} options={{ 
            tabBarLabel: "CHATROOMS",
            tabBarBadge: notifications,
            tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? "md-chatboxes": "md-chatboxes"} size={size} color={color} />
                )
            }} 
        />
        <Tab.Screen name="Add" component={Add} options={{ 
            tabBarLabel: "",
            tabBarIcon: ({ size }) => (
                    <>
                        <View style={styles.whiteBg} height={size*2} width={size*2} />
                        <Ionicons style={styles.plusBtn} name="ios-add-circle" size={size*3.2} color="#B21838" />
                    </>
                ),
            }}
        />
        <Tab.Screen name="Profile" component={Profile} options={{ 
            tabBarLabel: "PROFILE",
            tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? "md-person": "md-person"} size={size} color={color} />
                )
            }} 
        />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    plusBtn: {
        position: "absolute",
        bottom: -12,
    },
    whiteBg: {
        backgroundColor: "white",
        borderRadius: 100
    }
});
