import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Add from "../../screens/Add.js";

const CreateRoomStack = createStackNavigator();

export default function CreateRoomNav() {
	return (
		<CreateRoomStack.Navigator>
			<CreateRoomStack.Screen
				name="Start Chatting"
				component={Add}
				options={{
					headerLeft: null,
					headerStyle: {
						backgroundColor: "#B21838"
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 28,
					},
					headerTitleAlign: "center"
				}}
			/>
		</CreateRoomStack.Navigator>
	);
}
