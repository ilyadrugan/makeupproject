import React, { useState, useEffect } from 'react';
import { View, FlatList,ActivityIndicator,Text , Image,SafeAreaView } from 'react-native'
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
        <ProcedureComponent procedure={item}/>
      );
    
    return (

      <View style={styles.containerPages}>
        {isLoading?<ActivityIndicator animating={true} size="large" color="#00ff00"/>:(
        <View style={styles.container2}> 
          <SafeAreaView style={{ flex: 1 }} >
          {/* <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mHQMD9_CVr9q-yXhwoIUSBcGQVDpg00d9A&usqp=CAU" }} />
          <View style={styles.wrkTextContainerStyle} >
                 <Text style={{fontSize:18, marginLeft:10}}>{i18n.t("price")}:</Text>
                 <Text style={{fontSize:18}}>{i18n.t("ladies")} / {i18n.t("mens")} </Text>
             </View> */}
            {/* <Header pageName={route.params.category_name} navigation={navigation}/> */}
            <FlatList  data={procedures} renderItem={renderItem}  keyExtractor={item => item.id}/>
            
          
            
        </SafeAreaView >
        </View>
     )}
      </View>

    );
  }