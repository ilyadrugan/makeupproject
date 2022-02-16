import { View, Text, TextInput,Button,Alert,Platform } from 'react-native'
import styles from '../constant/styles';
import React, { useState, useEffect} from 'react';
import {i18n, lang} from '../i18n';
import urls from '../modules/urls';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PersonalDataForm({route}) {
    const [firstName, onChangefirstName] = useState("");
    const [lastName, onChangelastName] = useState("");
    const [email, onChangeemail] = useState("");
    const [mobile, onChangemobile] = useState("");
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date());
    const options = {year: 'numeric', month: 'short', day: 'numeric' };

    const navigation = useNavigation();
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
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
            let dataReq = {
                category_name: route.params.dataRequest.category_en,
                procedure_name:route.params.dataRequest.en_title,
                sex:route.params.dataRequest.sex,
                price:route.params.dataRequest.price,
                first_name:	firstName,
                last_name:lastName,
                email:email,
                phone:mobile,
                time:date.toDateString(i18n.locale, options)+" "+(date.getHours()>9?date.getHours().toString():("0"+date.getHours().toString()))+":"+(date.getMinutes()>9?date.getMinutes().toString():("0"+date.getMinutes().toString())),
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
               <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:4, marginHorizontal:10}}>
                <Button onPress={showDatepicker} title={date.toDateString(i18n.locale, options)} />
                <Button onPress={showTimepicker} title={(date.getHours()>9?date.getHours().toString():("0"+date.getHours().toString()))+":"+(date.getMinutes()>9?date.getMinutes().toString():("0"+date.getMinutes().toString()))}/>
                </View>
                {show && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />}
                <Button onPress={() => sendRequest()}  style={styles.buttonNext} title={i18n.t('send')}/>

        </View>
    );
}
