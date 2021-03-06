import React from 'react';
import {View, Text, Image, Dimensions, Button, StyleSheet,TouchableOpacity, Animated} from 'react-native';
import UpvoteCounter from '../components/UpvoteCounter';
import CardView from 'react-native-cardview'
import IconWithTextBelow from '../components/IconWithTextBelow';

const {height, width} = Dimensions.get('window');

export default class HomePageQuestions extends React.Component {
  constructor(props){
    super(props);
    this.state={
      focused: false,
      color: 'white',
      ButtonText : 'Default Button Title'
    }
  }
  focusColor(){
    this.setState({focused: true, color: 'lightyellow'});
  }
  unfocusColor(){
    this.setState({focused: false, color: 'white'})
  }
  render() {
    console.log("THIS PROPS DATA STUFF", this.props.data, this.props.my_key)

    return (
      
      <View style={[{ borderColor: 'lightgray',
      alignItems:"center",
      //marginLeft:5,
      //marginRight:5,
      paddingLeft:10,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 18,
      flexDirection: "row", 
      //flex: 1, 
      width: width  },{backgroundColor:this.state.color}]}>
        <TouchableOpacity onPress = {next => this.props.focusCallback(this.props.my_key)}>
          <IconWithTextBelow
          ></IconWithTextBelow>
        </TouchableOpacity>
        <View style={StyleSheet.container}>

        <TouchableOpacity
          style={styles.btnView}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.push("Question", {myItemName: this.props.data.questionText,})}
          >
          <Text style={{
              padding: 10,
              color: 'white',
              fontSize: 20,
            }}>{this.props.data.questionText}</Text>
        </TouchableOpacity>
        </View>
        
        <UpvoteCounter 
          my_upvotes={this.props.data.upvotes} 
          my_key ={this.props.my_key}
          style={alignItems='center'}>
        </UpvoteCounter>
      </View>
    );
  }
}

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
    fontFamily:'sans-serif',
    color: 'lightblue',
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  btnView: {
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    marginBottom:10,
    height: undefined,
    width: width*0.7,
    
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  textInput: {
    fontFamily:'sans-serif',
    height:55,
    flex:1,
    width: width-40,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    backgroundColor: 'lightgray',
  }
});