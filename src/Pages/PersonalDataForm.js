import { View, Text, TextInput,Button,Alert,FlatList } from 'react-native'
import styles from '../constant/styles';
import React, { useState, useEffect} from 'react';
import {i18n, lang} from '../i18n';
import urls from '../modules/urls';
import { useNavigation } from '@react-navigation/native';

export default function PersonalDataForm({route}) {
    const [firstName, onChangefirstName] = useState("");
    const [lastName, onChangelastName] = useState("");
    const [email, onChangeemail] = useState("");
    const [mobile, onChangemobile] = useState("");
    const [date, setDate] = useState(new Date());
    const options = {year: 'numeric', month: 'short', day: 'numeric' };

    const navigation = useNavigation();

    const sendRequest= async()=>{
        // console.log(firstName,lastName,email,mobile,time, "dwdwdw")
        if (firstName=="" || lastName=="" || email=="" || mobile==""){
            Alert.alert(
                "",
                i18n.t('alert'),
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
        else{
          route.params.dataRequest.map((item)=>{
            let dataReq = {
              category_name: item.datarequest.category_en,
              procedure_name:item.datarequest.en_title,
              sex:i18n.t(item.datarequest.sex),
              price:item.datarequest.price,
              first_name:	firstName,
              last_name:lastName,
              email:email,
              phone:mobile,
              specialist:item.datarequest.specialist,
              time:item.datarequest.date.toDateString(i18n.locale, options)+" "+item.datarequest.time,
              duration:item.datarequest.duration
          };
          fetch(urls.requests(), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(dataReq)
            })
            .then(resp => resp.json())
            .then(data=>{
              console.log(data)
              Alert.alert(
                "",
                i18n.t('alertRequest'),
                [
                  { text: "OK", onPress: () => {navigation.goBack();navigation.goBack()} }
                ]
              );
            }) 
          })
        }
    }
    const renderItem = ({ item }) => (
      <View style={{borderBottomWidth:2}}>
      <View style={styles.wrkTextContainerStyle} >
       <Text style={{fontSize:18}}>{item.datarequest.category}</Text>
       <Text style={{fontSize:18}}>{i18n.t(item.datarequest.sex)}</Text>
       </View>
      <View style={styles.wrkTextContainerStyle} >
      <Text style={{fontSize:18}}>{item.datarequest.value}</Text>
           <Text style={{fontSize:18}}>{item.datarequest.price} €</Text>
       </View>
       <View style={styles.wrkTextContainerStyle} >
      <Text style={{fontSize:18}}>{item.datarequest.date.toLocaleDateString(i18n.locale)}</Text>
           <Text style={{fontSize:18}}>{item.datarequest.time}</Text>
       </View>
       </View>
    );
    return(
        <View style={[styles.containerPages,{backgroundColor:"#FFF1E0"}]}>
            
                <TextInput value={firstName} onChangeText={onChangefirstName} style={styles.textInputstyle} placeholder={i18n.t("firstName")}/>
                <TextInput value={lastName} onChangeText={onChangelastName}  style={styles.textInputstyle} placeholder={i18n.t("lastName")}/>
                <TextInput value={email} onChangeText={onChangeemail}  style={styles.textInputstyle} placeholder="E-Mail"/>
                <TextInput value={mobile} onChangeText={onChangemobile}  style={styles.textInputstyle} placeholder={i18n.t("mobile")}/>

                <Button onPress={() => sendRequest()}  style={styles.buttonNext} title={i18n.t('send')}/>
                <View style={styles.flatPD}>
        <FlatList data={route.params.dataRequest} renderItem={renderItem} keyExtractor={item => item.id}/>
        </View>
        </View>
    );
}
