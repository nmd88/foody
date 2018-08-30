import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker, TextInput,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView,
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
    return (
      <View style={{flex: 1}}>
        <View>
          <Image style={{width: '100%', height: 300}} source={{uri: `${HOST}${post.image.url}`}} />
        </View>
        <View>
          <Text>Title: {post.title}</Text>
          <Text>Content: {post.content}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts
  }
};

export default connect(mapStateToProps)(DetailPost);
