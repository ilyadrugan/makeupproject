import styles from "../constant/styles";
import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Back from "../assets/icons/back.svg";
import { Icon } from 'react-native-elements';
import {i18n} from '../i18n';



const Header = ({pageName, navigation}) => {

    return(
        <View style={pageName=="Facebook" || pageName=="Instagram" ?styles.webviewheaderStyle:styles.headerStyle}>
            <TouchableOpacity style={styles.backStyle} onPress={() => navigation.goBack()}>
             <Icon name="arrow-back-ios" size={44}/>
          </TouchableOpacity>

            {pageName=="Facebook" || pageName=="Instagram" ?<Text style={styles.headerText}>{i18n.t("back")}</Text>:<Text style={styles.headerText}>{pageName}</Text>}
        </View>
    );

}

export default Header;