import React,{useState,useEffect} from 'react';
import { StyleSheet ,View,Text} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile.js';
import Chatroom from './Chatroom.js';
import Add from './Add.js';

const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:20,
        color:"#B21838"     
    },
});

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Chatroom') {
                  return (
                    <Ionicons name={focused ? 'md-chatboxes': 'md-chatboxes'} size={size} color={color} />
                  );
                } else if (route.name === 'Profile') {
                  return (
                    <Ionicons name={focused ? 'md-person': 'md-person'} size={size} color={color} />
                  );
                } else if (route.name === 'Add') {
                  return (
                    <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={size} color={color}
                    />
                  );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: '#B21838',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Chatroom" component={Chatroom} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="Add" component={Add} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
  );
}