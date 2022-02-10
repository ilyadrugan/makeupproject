import React, { useState, useEffect } from 'react';
import { View,TouchableOpacity, Image,ActivityIndicator,Text, Linking } from 'react-native'
import Header from '../component/Header';
import ProcedureComponent from '../component/ProcedureComponent';
import {i18n, lang} from '../i18n';
import Phone from "../assets/icons/phone.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Map from "../assets/icons/map-marker.svg";
import Mail from "../assets/icons/mail.svg";
import Globe from "../assets/icons/globe.svg";
import styles, * as styleConstants from '../constant/styles';
import urls  from '../modules/urls';
import {callNumber} from '../modules/callnumber';
const iconSize = 30
export default function Contacts({ navigation, route }) {
    const [contactsData, setContactsData] = useState()
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(urls.contacts(1), {
          method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
      
          setContactsData(data)
          setLoading(false)
        })
        .catch(error => console.log("Error is : ", error))
        
      }, [])

    const renderItem = ({ item }) => (
        <ProcedureComponent procedure={item[lang]}/>
      );
    
    return (

      <View style={styles.containerPages }>
          {isLoading?<ActivityIndicator animating={true} size="large" color="#00ff00"/>:(
          <View style={styles.contactContainer}>
            <View style={styles.contactCard}>
                
                <Image style={styles.contactCardImage} source={require("../assets/icon.png")}></Image>
                <View style={styles.contactCardText}>
                <Text style={styles.contactCardMainText}>Beauty Home Kosmetik Lounge Bad Berleburg</Text>
                <Text style={styles.contactCardSecondText}>Some text</Text>
                </View>
               
            </View>
            {/* {isLoading?<ActivityIndicator animating={true} size="large" color="#00ff00"/>:<FlatList data={procedures} renderItem={renderItem}  keyExtractor={item => item.id}/>} */}
            <TouchableOpacity style={styles.contactLine} onPress={() => callNumber(contactsData.phoneNumber)}>
                <Text>{contactsData.phone_number}</Text>
                <Phone  width={iconSize} height={iconSize} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.contactLine} onPress={() => null}>
                <Text>{contactsData.map_position}</Text>
                <Map  width={iconSize} height={iconSize} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.contactLine} onPress={() => Linking.openURL('mailto:'+contactsData.email)}>
                <Text>{contactsData.email}</Text>
                <Mail  width={iconSize} height={iconSize} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.contactLine} onPress={() => Linking.openURL(contactsData.site)}>
                <Text>{contactsData.site.slice(0,5)=="https"?contactsData.site.slice(8):(contactsData.site.slice(0,4)=="http"?contactsData.site.slice(7):contactsData.site)}</Text>
                <Globe  width={iconSize} height={iconSize} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.contactLine} onPress={() => navigation.navigate('WebView', {link: contactsData.facebook_link, title:"Facebook"})}>
                <Text>Facebook</Text>
                <Facebook  width={iconSize} height={iconSize} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.contactLine} onPress={() => navigation.navigate('WebView', {link: contactsData.instagram_link, title:"Instagram"})}>
                <Text>Instagram</Text>
                <Instagram  width={iconSize} height={iconSize} />
             </TouchableOpacity>

          
            
        </View>)}
      </View>

    );
  }