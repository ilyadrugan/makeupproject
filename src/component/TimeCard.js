import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../constant/styles';
import React, { useState, useEffect } from 'react';
import {i18n, lang} from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function TimeCard({time,date,setTime,setRefreshing,refreshing}) {
    // console.log(time,setTime,setRefreshing,refreshing)
    const [clicked, setClicked] = useState(false)
    const onClick =()=>{
        console.log(clicked)
        // setTime(time)
        // setRefreshing(!refreshing)
        setClicked(!clicked)
    }
    const getTime = async () => {
        try {
          const value = await AsyncStorage.getItem('curTime')
          if(value !== null) {
            return value
          }
        } catch(e) {
          // error reading value
        }
      }
      
    useEffect(() => {
        getTime()
      }, [])
    return(
        
            <TouchableOpacity style={clicked?styles.timeCardChecked:styles.timeCard} onPress={onClick}>
                <Text>{time}</Text>
            </TouchableOpacity>
    );
}
