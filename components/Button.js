import React, { Component } from 'react';
import { TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window')
const Button = ({
  placeholder="user",
  placeholderTextColor='white',
  imgUrl,
}) => {
  const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (<Touchable>
    <View style={styles.btnView}>
      <Text style={{
        color: 'white',
        fontSize: 20,
      }}>Log In</Text>
    </View>
  </Touchable>)
}

export default Button

const styles = StyleSheet.create({
  btnView: {
    marginTop: 25,
    height: 55,
    width: width-40,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  }
});