import * as React from 'react';
import { View, Text, SafeAreaView, Dimensions, FlatList  } from 'react-native'

import WorktimeComponent from '../component/WorktimeComponent';
import {i18n, lang} from '../i18n';
import styles, * as styleConstants from '../constant/styles';
import { dataDays } from '../data/dataDays';


export default function Worktime({navigation}) {
    const renderItem = ({ item }) => (
        <WorktimeComponent day={item.day} time={item.time}/>
      );
    return (

      <View style={styles.containerPages}>
          <View style={styles.container2}>
          <View  style={styles.flatlistyle}>
            <FlatList data={dataDays} renderItem={renderItem}  keyExtractor={item => item.id}/>
            </View>
        </View>
      </View>

    );
  }