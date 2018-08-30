import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList, AsyncStorage, StyleSheet, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';

import { HOST } from '../Const';
import { insertCars } from '../../actionsMitsu';
import styles from './Styles';

class HomeCars extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getCars();
  }

  getCars = () => {
    AsyncStorage.getItem('token').then((token) => {
      fetch(`${HOST}/api/v1/cars`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          cars: responseJson.cars,
          isLoading: false,
        });
        this.props.dispatch(insertCars(responseJson.cars));
      }).catch((error) => {
        console.error(error);
      });
    })
  }

  _renderCar = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigate('detail_car', {id: item.id})}>
        <View key={index} style={styles.item}>
          <Image style={{width: '100%', height: 120}}
            source={{uri: `${HOST}${item.image.url}`}} />
          <Text>{item.name}</Text>
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
            <TouchableOpacity onPress={() => this.props.navigate('cars')}>
              <Text style={styles.title}>Cars</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.cars}
            renderItem={({item, index}) => this._renderCar(item, index)}
            keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>
        </View>
      );
    }
  }
}

export default connect()(HomeCars);
