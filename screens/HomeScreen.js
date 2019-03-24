import React, { Component } from 'react';
import { Text,Alert, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue'
import InputUser from '../components/InputUser'
import InputPass from '../components/InputPass'
//import Button from '../components/Button'
import Button from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QuestionsScreen from './QuestionsScreen';
import MapScreen from './MapScreen';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
}

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image style={styles.logo} source={require("../assets/images/logo.png")} resizeMode='contain'/>
        <Text style={styles.header}>CitySlate</Text>
        <KeyboardAwareScrollView>
          <View style={styles.textInput}>
            <Image style={styles.icon} source={require("../assets/images/avatar.png")}
            />
            <TextInput 
            placeholder="Email"
            fontSize={25}
            placeholderTextColor="white"
            underlineColorAndroid='transparent'
            spellCheck={false}
            autoCorrect={false}
            />
          </View>
          
          <View style={styles.textInput}>
            <Image style={styles.icon} source={require("../assets/images/avatar.png")}
            />
            <TextInput 
            placeholder="Password" 
            fontSize={25}
            placeholderTextColor="white"
            underlineColorAndroid='transparent'
            spellCheck={false}
            autoCorrect={false}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.btnView}
            onPress={onPress = () => {
              this.setState({
                
              })
            }}
            >   
            <Text style={{
              color: 'white',
              fontSize: 25,
            }}>Log In</Text>
          </TouchableOpacity>
          
          
          {/* <TouchableOpacity>
          <View style={styles.btnView}>
            <Text style={{
            color: 'white',
            fontSize: 20,
            }}>Log In</Text>
          </View>
          </TouchableOpacity>) */}
        </KeyboardAwareScrollView>
        
      </KeyboardAvoidingView>
    );
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  logo: {
    flex:1,
    alignSelf:'stretch',
    width: undefined,
    height: undefined,
    marginTop: 10,
  },
  header: {
    fontSize: 50,
    fontFamily:'monospace',
    color: 'lightblue',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 20,
  },
  btnView: {
    marginTop: 25,
    height: 55,
    width: width-40,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  textInput: {
    fontFamily:'monospace',
    height:55,
    flex:1,
    width: width-40,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    backgroundColor: 'lightgray',
  }
});


// import React, { Component } from 'react';
// import {
//     ScrollView,
//     Text,
//     TextInput,
//     View,
//     Button
// } from 'react-native';

// export default class Login extends Component {

//     render() {
//         return (
//             <ScrollView style={{padding: 20}}>
//                 <Text 
//                     style={{fontSize: 27}}>
//                     Login
//                 </Text>
//                 <TextInput placeholder='Username' />
//                 <TextInput placeholder='Password' />
//                 <View style={{margin:7}} />
//                 <Button 
//                           onPress={this.props.onLoginPress}
//                           title="Submit"
//                       />
//                   </ScrollView>
//             )
//     }
// }
