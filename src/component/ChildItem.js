import React from 'react';
import {TouchableHighlight, Image, StyleSheet} from 'react-native';

export default (ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height
}) => {
  return (
    <TouchableHighlight
      style={styles.container}
       onPress={() => onPress(index)}
      >
      <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: item[imageKey]}}
      />
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems: 'center',
  },
  image: {
    height: 300,
    // resizeMode: 'cover',
    borderRadius:10,
   
  },
});