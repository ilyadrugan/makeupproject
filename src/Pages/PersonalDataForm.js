import { View, Text, TextInput,Button,Alert } from 'react-native'
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
    const [time, onChangetime] = useState("");
    const [dataRequest, setDataRequest] = useState(route.params.dataRequest);
    const navigation = useNavigation();

    const sendRequest= async()=>{
        // console.log(firstName,lastName,email,mobile,time, "dwdwdw")
        if (firstName=="" || lastName=="" || email=="" || mobile=="" ||  time==""){
            Alert.alert(
                "",
                i18n.t('alert'),
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
        else{
            let dataReq = {
                category_name: route.params.dataRequest.category_en,
                procedure_name:route.params.dataRequest.en_title,
                sex:route.params.dataRequest.sex,
                price:route.params.dataRequest.price,
                first_name:	firstName,
                last_name:lastName,
                email:email,
                phone:mobile,
                time:time,
            };
            let response = await fetch(urls.requests(), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(dataReq)
              });
              
              let result = await response.json();
              console.log(result)
              Alert.alert(
                "",
                i18n.t('alertRequest'),
                [
                  { text: "OK", onPress: () => {navigation.goBack();navigation.goBack()} }
                ]
              );
                
        }
    }

    return(
        <View style={[styles.containerPages,{backgroundColor:"#FFF1E0"}]}>
            <View style={{borderTopWidth:2,borderBottomWidth:2}}>
            <View style={styles.wrkTextContainerStyle} >
             <Text style={{fontSize:18}}>{route.params.dataRequest.category}</Text>
             <Text style={{fontSize:18}}>{i18n.t(route.params.dataRequest.sex)}</Text>
             </View>
            <View style={styles.wrkTextContainerStyle} >
            <Text style={{fontSize:18}}>{route.params.dataRequest.value}</Text>
                 <Text style={{fontSize:18}}>{route.params.dataRequest.price} €</Text>
             </View>
             </View>
                <TextInput value={firstName} onChangeText={onChangefirstName} style={styles.textInputstyle} placeholder={i18n.t("firstName")}/>
                <TextInput value={lastName} onChangeText={onChangelastName}  style={styles.textInputstyle} placeholder={i18n.t("lastName")}/>
                <TextInput value={email} onChangeText={onChangeemail}  style={styles.textInputstyle} placeholder="E-Mail"/>
                <TextInput value={mobile} onChangeText={onChangemobile}  style={styles.textInputstyle} placeholder={i18n.t("mobile")}/>
                <TextInput value={time} onChangeText={onChangetime}  style={styles.textInputstyle} placeholder={i18n.t("time")}/>
                <Button onPress={() => sendRequest()}  style={styles.buttonNext} title={i18n.t('send')}/>

        </View>
    );
}
