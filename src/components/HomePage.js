import React, { Component } from 'react';
import {  Image, Text, TouchableOpacity, View, AsyncStorage, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { HOST } from './Const';
import { insertPosts, insertImages } from '../actionsMitsu';

import HomeCars from './home/Cars';
import HomePosts from './home/Posts';
import HomeImages from './home/Images';

class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {color: 'black', textAlign: 'center'}
  };

  async userLogout() {
    try {
        Alert.alert(`${JSON.stringify(this.props.navigation)}`, 'Click');
      await AsyncStorage.removeItem('token');
      this.props.navigation.navigate('login');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _renderRowDetail = (rowData, rowID) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
          <View style={{flex: 40, marginRight: 5}}>
            <TouchableOpacity>
              <Image style={{width: '100%', height: 120}}
                source={{uri: `${HOST}${rowData.image.url}`}} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 55}}>
            <TouchableOpacity>
              <Text>{rowData.title}</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <HomeImages />
          <ScrollView
            style={{flex: 1}}
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            contentContainerStyle={{marginLeft: 2, marginRight: 2}}
          >
            <HomeCars navigate={navigate} />
            <HomePosts navigate={navigate} />
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

export default connect()(HomePage);
