import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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
import PersonalDataForm from "./src/Pages/PersonalDataForm";
import TimePicker from "./src/Pages/TimePicker";
import { i18n, lang } from './src/i18n';




const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName="MainPage"
        screenOptions={{
          headerStyle: {backgroundColor:"#FFF1E0"},
          headerShown: true,
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
        <Stack.Screen name="MainPage" component={MainPage} options={{title: i18n.t("main")}}/>
        <Stack.Screen
          name="Worktime"
          component={Worktime}
          options={{ title: i18n.t("worktime")}}
        />
        <Stack.Screen name="GMaps" component={GMaps} options={{ title: i18n.t("gmaps")}}/>
        <Stack.Screen name="Contacts" component={Contacts} options={{ title: i18n.t("phone")}}/>
        <Stack.Screen name="ProcedureCategories" component={ProcedureCategories}   options={{ title: i18n.t("procedures")}}/>
        <Stack.Screen name="Procedures" component={Procedures} options={({ route }) => ({ title: route.params.title })}/>
        <Stack.Screen name="WebView" component={WebView} options={({ route }) => ({ title: route.params.title })}/>
        <Stack.Screen name="Booking" component={Booking} options={{ title: i18n.t("booking") }}/>
        <Stack.Screen name="PersonalDataForm" component={PersonalDataForm} options={{ title: i18n.t("booking") }}/>
        <Stack.Screen name="TimePicker" component={TimePicker} options={{ title: i18n.t("booking") }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
