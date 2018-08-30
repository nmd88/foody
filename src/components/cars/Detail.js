import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker, TextInput,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { HOST } from '../Const';

class DetailCar extends Component {
  static navigationOptions = {
    title: 'Detail Car',
    headerTitleStyle: {color: 'black', textAlign: 'center'}
  };

  constructor() {
    super();
    this.state = {
      car: {},
    }
  }

  componentWillMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.setState({
      car: this.props.cars.find(function(obj) {return obj.id == id})
    });
  }

  render() {
    const car = this.state.car;
    return (
      <View style={{flex: 1}}>
        <View>
          <Image style={{width: '100%', height: 300}} source={{uri: `${HOST}${car.image.url}`}} />
        </View>
        <View>
          <Text>Code: {car.code}</Text>
          <Text>Name: {car.name}</Text>
          <Text>Cost: {car.cost}</Text>
          <Text>Description: {car.description}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.carReducer.cars
  }
};

export default connect(mapStateToProps)(DetailCar);
