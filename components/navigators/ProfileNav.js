import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../screens/Profile.js";

const ProfileStack = createStackNavigator();

export default function ProfileNav() {
	return (
		<ProfileStack.Navigator>
			<ProfileStack.Screen
				name="Profile"
				component={Profile}
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
		</ProfileStack.Navigator>
	);
}
