import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../constant/styles';
import * as React from 'react';
import {i18n, lang} from '../i18n';

export default function ProcedureComponent({procedure}) {

    return(
        
            <View style={styles.wrkTextContainerStyle} >
                 <Text style={{fontSize:18, marginLeft:10}}>{procedure[lang]}</Text>
                 <Text style={{fontSize:18}}>{procedure["price_women"]} € / {procedure["price_men"]==0?"--":procedure["price_men"]} €</Text>
             </View>

    );
}
