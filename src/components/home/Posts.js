import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { HOST } from '../Const';
import { insertPosts } from '../../actionsMitsu';
import styles from './Styles';

class HomePosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getPosts();
  }

  getPosts = () => {
    AsyncStorage.getItem('token').then((token) => {
      fetch(`${HOST}/api/v1/posts`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          cars: responseJson.posts,
          isLoading: false,
        });
        this.props.dispatch(insertPosts(responseJson.posts));
      }).catch((error) => {
        console.error(error);
      });
    })
  }

  _renderPost = (item, index) => {
    return (
      <TouchableOpacity>
        <View key={index} style={styles.item}>
          <Image style={{width: '100%', height: 120}}
            source={{uri: `${HOST}${item.image.url}`}} />
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      return (
        <View>
          <View style={{marginTop: 5}}>
            <TouchableOpacity onPress={() => this.props.navigate('posts')}>
              <Text style={styles.title}>Posts</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.cars}
            renderItem={({item, index}) => this._renderPost(item, index)}
            keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>
        </View>
      );
    }
  }
}

export default connect()(HomePosts);
