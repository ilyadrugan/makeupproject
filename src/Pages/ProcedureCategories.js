import React, { useState, useEffect } from 'react';
import { View, FlatList,ActivityIndicator, } from 'react-native'
import Header from '../component/Header';
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

        <CategoryProcedureComponent category={item[lang]} category_en_name={item.en_title} navigation={navigation} category_icon={item.icon}/>
      );
    
    return (

      <View style={styles.containerPages}>
          <View style={styles.container2}>
            <Header pageName={i18n.t("procedures")} navigation={navigation}/>
            {isLoading?<ActivityIndicator animating={true} size="large" color="#00ff00"/>:<FlatList data={categories} renderItem={renderItem}  keyExtractor={item => item.id}/>}
            
          
            
        </View>
      </View>

    );
  }