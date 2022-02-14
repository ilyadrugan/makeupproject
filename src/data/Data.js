import React, { useState, useEffect } from 'react';
import urls from '../modules/urls';
import { View,TouchableOpacity, Image,ActivityIndicator,Text, Linking,Dimensions } from 'react-native'

    

export const dummyData = () =>{

  const [Data, setData] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(urls.mainpage_photos(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
      console.log(data)
      let temp=[]
          data.map((item)=>{
            let pct = {"uri": urls.url+"photos/"+item["picture"]}
            temp.push(pct)
          })
          setData(temp)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
        
      }, [])
      
      {isLoading?<ActivityIndicator animating={true} size="large" color="#e9cf63"/>: Data}

  }