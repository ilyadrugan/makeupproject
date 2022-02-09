import React, { useState, useEffect } from 'react';
import { View, FlatList,ActivityIndicator, } from 'react-native'
import Header from '../component/Header';
import ProcedureComponent from '../component/ProcedureComponent';
import {i18n, lang} from '../i18n';

import styles, * as styleConstants from '../constant/styles';
import urls  from '../modules/urls';


export default function Procedures({ navigation, route }) {
    const [procedures, setProcedures] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(urls.procedures(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          let newArr = [];
         
          data.map((item,i)=>{
            console.log(item.category,route.params.category_en_name)
            if(item.category==route.params.category_en_name) newArr.push(item)
          })
          console.log("newArr",newArr)
          setProcedures(newArr)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
        
      }, [])

    const renderItem = ({ item }) => (
        <ProcedureComponent procedure={item[lang]}/>
      );
    
    return (

      <View style={styles.containerPages}>
          <View style={styles.container2}>
            <Header pageName={route.params.category_name} navigation={navigation}/>
            {isLoading?<ActivityIndicator animating={true} size="large" color="#00ff00"/>:<FlatList data={procedures} renderItem={renderItem}  keyExtractor={item => item.id}/>}
            
          
            
        </View>
      </View>

    );
  }