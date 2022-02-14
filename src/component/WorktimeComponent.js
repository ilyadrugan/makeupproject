import { View, Text } from 'react-native'
import styles from '../constant/styles';
import * as React from 'react';


export default function WorktimeComponent({day, time}) {


    return(
            <View style={styles.wrkTextContainerStyle}>
                 <Text style={{fontSize:16}}>{day}</Text>
                 <Text style={{fontSize:16}}>{time}</Text>
             </View>
    );
}
