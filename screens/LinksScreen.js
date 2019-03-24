import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import {View, Text, Image, Button,Alert, docu} from 'react-native';
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
      idx: 0,
      lookup: {},
    }
  }

  _generateItem(navigation, key, questionList){
    this.state.lookup[key] = this.state.idx;
    this.state.idx += 1;
    return (<ScrollIntoView ref={key}><HomePageQuestions  navigation = {navigation}  
      data={questionList[key]} my_key = {key} ></HomePageQuestions></ScrollIntoView>)
  }

  scrollToQuestion(key){
    this.refs[key].scrollIntoView();
  }

  render() {
    var _onRefresh = () => {
      this.setState({refreshing: true});
      this.props.refreshCallback();
    }
    this.state.idx = 0;

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
        {Object.keys(this.state.questions).map(question => this._generateItem(this.props.navigation, question, this.state.questions))}
        
      </CustomScrollView>
    </View>
    );
  }
}

const CustomScrollView = wrapScrollView(ScrollView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  submitButton: {
  width: 60,  
  height: 60,   
  borderRadius: 30,            
  backgroundColor: '#ee6e73',                                    
  position: 'absolute',                                          
  bottom: 10,                                                    
  right: 10, 
}
});

