import React, { useState, useEffect } from 'react';
import urls from '../modules/urls';
import { View,TouchableOpacity, Image,ActivityIndicator } from 'react-native'
import { SafeAreaView } from "react-native";
import Carousel from '../component/Carousel'
import Footer from '../component/Footer'

import styles, * as styleConstants from '../constant/styles';


export default function App({ navigation }) {
  const [Data, setData] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [facebook, setFacebook]=useState("")
    const [instagram, setInstagram]=useState("")
    useEffect(() => {
      fetch(urls.contacts(1), {
        method: "GET",
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setFacebook(data.facebook_link)
        setInstagram(data.instagram_link)
      })
      .catch(error => console.log("Error is : ", error))
        fetch(urls.mainpage_photos(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
      console.log(data)
      let temp=[]
          data.map((item)=>{
            let pct = {"url": urls.url+"photos/"+item["picture"]}
            temp.push(pct)
          })
          console.log(temp)
          setData(temp)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
        
      }, [])
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <View style={styles.container2}>
            <Image
            style={styles.mainimage} source={require("../assets/logo.jpg")}/>
                 {isLoading?<ActivityIndicator style={styles.carouselContIndicator} animating={true} size="large" color="#e9cf63"/>:  <Carousel data = {Data}/>}
            <Footer navigation={navigation} facebookLink={facebook} instagramLink={instagram}/>
        </View>
      </View>
    </SafeAreaView>
  );
}