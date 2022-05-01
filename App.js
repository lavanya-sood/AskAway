import * as React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login.js";
import TabbedNav from "./components/TabbedNav.js";
import Signup from "./screens/Signup.js";
import EditProfile from "./screens/EditProfile.js";
import Chat from "./screens/Chat.js";
import ShareBtn from "./components/ShareBtn.js";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				{/* <Stack.Screen name="Home" component={Home} options={{ headerLeft: null }}/> options={{ headerShown: false }}*/}
				<Stack.Screen name="Home" component={TabbedNav} options={{ headerShown: false }} />
				<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
				<Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
				<Stack.Screen name="Edit Profile" component={EditProfile} options={{ headerShown: false }} />
				<Stack.Screen name="Chat" component={Chat}  
				options={({ route }) => ({
					headerTitle: route.params.thread.name,
					headerRight: (props) => <ShareBtn thread={route.params.thread} {...props} />
				})} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
