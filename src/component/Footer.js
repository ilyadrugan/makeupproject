import * as React from 'react';
import styles, * as styleConstants from '../constant/styles';
import { View,Text, TouchableOpacity } from 'react-native';
import Phone from "../assets/icons/phone.svg";
import Calendar from "../assets/icons/calendar.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Map from "../assets/icons/map-marker.svg";
import Services from "../assets/icons/services.svg";
import Time from "../assets/icons/time.svg";
import {i18n, lang} from '../i18n';

const iconSize = 46
const facebookLink = "https://www.facebook.com/The-Beauty-Lounge-234135003629345/"
const instagramLink = "https://www.instagram.com/Beautyhomekosmetiklounge/"


const Footer = ({ navigation }) => {
  
    return(
      <View style={styles.containerFooter}>
         <View
        style={styles.footerContainer1}
      >
         <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Contacts')}>
         <Phone  width={56} height={56} />
        <Text style={styles.iconText}>{i18n.t("phone")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
        <Calendar  width={56} height={56}/>
        <Text style={styles.iconText}>{i18n.t("booking")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Worktime')}>
        <Time width={56} height={56} />
        <Text style={styles.iconText}>{i18n.t("worktime")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('GMaps')}>
        <Map  width={56} height={56} />
        <Text style={styles.iconText}>{i18n.t("gmaps")}</Text>
        </TouchableOpacity>

      </View>
      <View
        style={styles.footerContainer1}
      >
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('WebView', {link: facebookLink, title:"Facebook"})}>
        <Facebook width={60} height={60}/>
        <Text style={styles.iconText}>{i18n.t("facebook")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProcedureCategories')}>
        <Services width={60} height={60}/>
        <Text style={styles.iconText}>{i18n.t("procedures")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('WebView', {link: instagramLink, title:"Instagram"})}>
        <Instagram width={60} height={60}/>
        <Text style={styles.iconText}>{i18n.t("instagram")}</Text>
        </TouchableOpacity>       
        
      </View>
        
    </View>
    )

}
export default Footer;