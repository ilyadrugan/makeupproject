import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../constant/styles';
import * as React from 'react';
import { Icon } from 'react-native-elements';

export default function CategoryProcedureComponent({category,category_en_name,category_icon, navigation}) {


    return(
        
            <TouchableOpacity style={styles.wrkTextContainerStyle} onPress={() => navigation.navigate('Procedures', {category_en_name: category_en_name, category_name:category})}>
                <View style={styles.procedureContainerStyle}>
                    <Image style={styles.iconimage}  source={{uri:"http://192.168.0.16/photos/"+category_icon}}></Image>
                {/* <Icon name={category_icon} size={30}/> */}
                 <Text style={{fontSize:16, marginLeft:10}}>{category}</Text>
                 </View>
                 <Icon name="keyboard-arrow-right"/>
             </TouchableOpacity>

    );
}
