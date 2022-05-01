import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chatroom from "../../screens/Chatroom.js";
import Create from "../../screens/Create.js";
import Join from "../../screens/Join.js";

const ChatroomsStack = createStackNavigator();

export default function ProfileNav() {
	return (
		<ChatroomsStack.Navigator>
			<ChatroomsStack.Screen
				name="Chatrooms"
				component={Chatroom}
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
			<ChatroomsStack.Screen name="Join" component={Join} />
			<ChatroomsStack.Screen name="Create" component={Create} />
		</ChatroomsStack.Navigator>
	);
}
