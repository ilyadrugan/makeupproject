import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import MainPage from "./src/Pages/MainPage";
import Worktime from "./src/Pages/Worktime";
import Procedures from "./src/Pages/Procedures";
import ProcedureCategories from "./src/Pages/ProcedureCategories";
import Booking from "./src/Pages/Booking";
import GMaps from "./src/Pages/GMaps";
import Contacts from "./src/Pages/Contacts";
import WebView from "./src/Pages/WebView";




const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <StatusBar hidden={true} backgroundColor="#ffffff" barStyle="#ffffff" />
      <Stack.Navigator
        initialRouteName="MainPage"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
        presentation="modal"
      >
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Worktime" component={Worktime} />
        <Stack.Screen name="ProcedureCategories" component={ProcedureCategories} />
        <Stack.Screen name="Procedures" component={Procedures} />
        <Stack.Screen name="WebView" component={WebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
