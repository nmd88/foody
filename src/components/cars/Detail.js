import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker, TextInput,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView, WebView,
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
    var content = '<div style="width: 100%"><img src=' + HOST + car.image.url +
      ' width="100%" height: "auto"> <h4>' + car.name + '</h4> <h4>' +
      car.cost + ' VND</h4>' + car.description + '</div>';
    return (
      <WebView source={{ html: content, baseUrl: '' }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.carReducer.cars
  }
};

export default connect(mapStateToProps)(DetailCar);
