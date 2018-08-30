import React, { Component } from 'react';
import {
  Image, Text, TouchableOpacity, View, FlatList, StyleSheet, AsyncStorage,
  ActivityIndicator, Dimensions, ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { HOST } from '../Const';
import { insertImages } from '../../actionsMitsu';
import styles from './Styles';

class HomeImages extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getImages();
  }

  getImages = () => {
    AsyncStorage.getItem('token').then((token) => {
      fetch(`${HOST}/api/v1/image_cars`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          images: responseJson.images,
          isLoading: false,
        });
        this.props.dispatch(insertImages(responseJson.images));
      }).catch((error) => {
        console.error(error);
      });
    })
  }

  _renderImage = (data, key) => {
    return (
      <View key={key} style={{flex: 1}}>
        <Image style={{width: Dimensions.get('window').width, height: 120}}
          source={{uri: `${HOST}${data.image.url}`}} />
      </View>
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
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
          >
            {this.state.images.map((image, key) => this._renderImage(image, key))}
          </ScrollView>
        </View>
      )
    }
  }
}

export default connect()(HomeImages);
