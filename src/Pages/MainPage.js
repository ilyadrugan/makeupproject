import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native";
//import Carousel from '../component/Carousel'
import Footer from '../component/Footer'

import { dummyData } from '../data/Data'
//import Slider from '../component/FlatlistSlider';

import styles, * as styleConstants from '../constant/styles';


export default function App({ navigation }) {
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <View style={styles.container2}>
            <Image
            style={styles.mainimage} source={require("../assets/logo.png")}/>
            {/* <Carousel data = {dummyData}/> */}
            <Footer navigation={navigation}/>
        </View>
      </View>
    </SafeAreaView>
  );
}