import React from 'react';
import { ScrollView, StyleSheet, RefreshControl,View, Dimensions } from 'react-native';
import HomePageQuestions from '../components/HomePageQuestions';
import {ScrollIntoView, wrapScrollView} from 'react-native-scroll-into-view'




export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      questions: [],
      activeItem: null
    }
  }


  scrollToQuestion(key){
    this.refs[key].scrollIntoView();
    if(this.state.activeItem){
      this.state.activeItem.unfocusColor();
    }
    this.state.activeItem = this.refs[key + "_child"];
    this.state.activeItem.focusColor();
  }

  render() {
    var _onRefresh = () => {
      this.setState({refreshing: true});
      this.props.refreshCallback();
    }

   return (
      <View style={{flex:1}}>
      <CustomScrollView ref="scroll"
      style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={_onRefresh}
          />
        }>
        {Object.keys(this.state.questions).map(question => <ScrollIntoView ref={question}><HomePageQuestions ref={question + "_child"} focusCallback={this.props.focusCallback}  navigation = {this.props.navigation}  
      data={this.state.questions[question]} my_key = {question} ></HomePageQuestions></ScrollIntoView>)}
        
      </CustomScrollView>
    </View>
    );
  }
}
const { width } = Dimensions.get('window')

const CustomScrollView = wrapScrollView(ScrollView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  submitButton: {
    width: width,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: 'lightblue',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
},
textInput: {
  fontFamily:'sans-serif',
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

