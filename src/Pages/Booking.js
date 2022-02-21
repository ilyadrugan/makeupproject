import React, { useState, useEffect } from 'react';
import { View, Button,ActivityIndicator, FlatList, Dimensions, } from 'react-native'
import styles, * as styleConstants from '../constant/styles';
import BookingComponent from "../component/BookingComponent"
import { i18n } from '../i18n';

const windowHeight = Dimensions.get('window').height;

export default function Booking({navigation}) {

    const [data, setData] = useState([{id:1,datarequest:{}}])
    const [refreshing, setRefreshing] = useState(false);
    const [nextFlag, setNextFlag] =useState(true)

    useEffect(() => {
    //  setTimeout(setLoading(false),2000)

    }, [])
    const addMore=()=>{
      setNextFlag(true)
      let dt = data
      dt.push({id:dt.length+1,datarequest:{}})
      setData(dt)
      setRefreshing(!refreshing)
    }
  
    const onClick= ()=>{
      console.log(data)
      navigation.navigate('PersonalDataForm', {dataRequest: data, navigation:navigation})
    }

      const renderItem = ({ item }) => (
        <BookingComponent setNextFlag={setNextFlag} dataForm={item} navigation={navigation}  stateLoadChanger={setRefreshing} stateChanger={setData} refreshing={refreshing}  data={data}/>
      );

    return (


      <View style={[styles.containerPages,{backgroundColor:"#f2e0d0"}]}>
          <View style={[styles.container2], {maxHeight:windowHeight*0.86}}>
           <FlatList data={data} extraData={refreshing} renderItem={renderItem}/>
        </View>
        {nextFlag?null:(<View style={{flexDirection:"row", justifyContent:'space-between',marginHorizontal:10}}> 
                <Button  onPress={() => addMore()}  style={[styles.buttonNext], {padding:10}} title={i18n.t('more')}/> 
                  <Button onPress={() => onClick()}  style={styles.buttonNext} title={i18n.t('go')}/>
                </View>)}
      </View>


    );
  }