import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker, TextInput,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView, WebView,
} from 'react-native';
import { connect } from 'react-redux';

import { HOST } from '../Const';

class DetailPost extends Component {
  static navigationOptions = {
    title: 'Detail Post',
    headerTitleStyle: {color: 'black', textAlign: 'center'}
  };

  constructor() {
    super();
    this.state = {
      post: {},
    }
  }

  componentWillMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.setState({
      post: this.props.posts.find(function(obj) {return obj.id == id})
    });
  }

  render() {
    const post = this.state.post;
    var content = '<div style="width: 100%"><img src=' + HOST + post.image.url +
      ' width="100%" height: "auto"> <h4>' + post.title + '</h4>' + post.content + '</div>';
    return (
      <WebView source={{ html: content, baseUrl: '' }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts
  }
};

export default connect(mapStateToProps)(DetailPost);
