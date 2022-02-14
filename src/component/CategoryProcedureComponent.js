import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../constant/styles';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import urls from '../modules/urls';

export default function CategoryProcedureComponent({category,category_en_name,category_icon, category_picture,navigation}) {


    return(
        
            <TouchableOpacity style={styles.wrkTextContainerStyle} onPress={() => navigation.navigate('Procedures', {title: category,category_en_name: category_en_name, category_name:category, picture:category_picture})}>
                <View style={styles.procedureContainerStyle}>
                    <Image style={styles.iconimage}  source={{uri: urls.url+"photos/"+category_icon}}></Image>
                {/* <Icon name={category_icon} size={30}/> */}
                 <Text style={{fontSize:18, marginLeft:10}}>{category}</Text>
                 </View>
                 <Icon name="keyboard-arrow-right"/>
             </TouchableOpacity>

    );
}
