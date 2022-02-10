import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../component/Header';
import styles from '../constant/styles';

export default function Webview({navigation,route}) {
  return (

      <View style={[styles.containerPages, {backgroundColor:"#FFF"}]}>
        {/* <Header pageName={route.params.nameLink} navigation={navigation}/> */}
    <WebView 
      
      source={{ uri: route.params.link }}
    />
    </View>
  );
}