import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from '../constant/styles';

export default function Webview({navigation,route}) {
  return (

      <View style={[styles.containerPages, {backgroundColor:"#FFF"}]}>
    <WebView 
      
      source={{ uri: "https://goo.gl/maps/KSgpGMjvVhR6kXWE9" }}
    />
    </View>
  );
}