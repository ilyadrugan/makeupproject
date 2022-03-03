import React, { useState, useEffect } from 'react';
import { View,TouchableOpacity, Image,ActivityIndicator,Text, Linking,Dimensions } from 'react-native'

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
const windowHeight = Dimensions.get('window').height;

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

    
    return (

      <View style={styles.containerPages}>
          {isLoading?<ActivityIndicator style={{top:windowHeight*0.4}} animating={true} size="large" color="#e9cf63"/>:(
          <View style={styles.contactContainer}>
            <View style={styles.contactCard}>
                
                <Image style={styles.contactCardImage} source={require("../assets/kontakte_icon.png")}></Image>
                <View style={styles.contactCardText}>
                <Text style={styles.contactCardMainText}>Beauty Home Kosmetik Lounge Bad Berleburg</Text>
                <Text style={styles.contactCardSecondText}>{contactsData.undertitle}</Text>
                </View>
               
            </View>
            {/* {isLoading?<ActivityIndicator style={styles.containerIndicator}animating={true} size="large" color="#e9cf63"/>:<FlatList data={procedures} renderItem={renderItem}  keyExtractor={item => item.id}/>} */}
            <TouchableOpacity style={styles.contactLine} onPress={() => callNumber(contactsData.phoneNumber)}>
                <Text>{contactsData.phone_number}</Text>
                <Phone  width={iconSize} height={iconSize} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.contactLine} onPress={() =>  navigation.navigate('GMaps')}>
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
             <TouchableOpacity style={styles.contactLine} onPress={() =>  Linking.openURL(contactsData.facebook_link)}>
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