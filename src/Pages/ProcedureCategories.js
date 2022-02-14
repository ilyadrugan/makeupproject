import React, { useState, useEffect } from 'react';
import { View, FlatList,ActivityIndicator, } from 'react-native'
import CategoryProcedureComponent from '../component/CategoryProcedureComponent';
import {i18n, lang} from '../i18n';
import styles, * as styleConstants from '../constant/styles';
import  urls  from '../modules/urls';


export default function ProcedureCategories({navigation}) {
    const [categories, setCategories] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(urls.categories_procedures(), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setCategories(data)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
        //setLoading(false)
      }, [])

    const renderItem = ({ item }) => (

        <CategoryProcedureComponent category={item[lang]} category_en_name={item.en_title} navigation={navigation} category_icon={item.icon} category_picture={item.picture}/>
      );
    
    return (

      <View style={styles.containerPages}>
          <View style={styles.container2}>
            <View  style={styles.flatlistyle}>
            {isLoading?<ActivityIndicator style={styles.containerIndicator}animating={true} size="large" color="#e9cf63"/>:<FlatList data={categories} renderItem={renderItem}  keyExtractor={item => item.id}/>}
            
            </View>
            
        </View>
      </View>

    );
  }