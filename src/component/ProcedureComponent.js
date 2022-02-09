import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../constant/styles';
import * as React from 'react';
import { Icon } from 'react-native-elements';

export default function ProcedureComponent({procedure}) {


    return(
        
            <View style={styles.wrkTextContainerStyle} >
                <View style={styles.procedureContainerStyle}>
                <Icon name="face-retouching-natural" size={30}/>
                 <Text style={{fontSize:16, marginLeft:10}}>{procedure}</Text>
                 </View>
                
             </View>

    );
}
