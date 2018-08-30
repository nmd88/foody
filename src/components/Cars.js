import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { HOST } from './Const';
import SearchCar from './SearchCar';

class Cars extends Component {
  static navigationOptions = {
    title: 'Cars',
    headerTitleStyle: {color: 'black', textAlign: 'center'}
  };

  constructor() {
    super();
    this.state = {
      categories: [],
      cars: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getCars();
  }

  searchCar = (data) => {
    var cars = this.props.cars;
    cars = cars.filter(function(car) {
      if (!data["name"]) {return true;}
      return car.name.toLowerCase().includes(data["name"].toLowerCase());
    }).filter(function(car) {
      if (!data["category_id"]) {return true;}
      return car.category_id === data["category_id"];
    }).filter(function(car) {
      if (!data["cost"]) {return true;}
      return (car.cost >= data["cost"][0] && car.cost <= data["cost"][1]);
    });
    this.setState({cars: cars});
  }

  getCars = () => {
    // $.param(data); a=1&b=2 with data = {a: 1, b: 2}
    AsyncStorage.getItem('token').then((token) => {
      fetch(`${HOST}/api/v1/cars`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          categories: responseJson.categories,
          cars: responseJson.cars,
          isLoading: false,
        });
      }).catch((error) => {
        console.error(error);
      });
    })
  }

  _renderCar = (item, _index) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
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
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            contentContainerStyle={{marginLeft: 2, marginRight: 2}}
          >
            <SearchCar categories={this.state.categories} handleSearch={this.searchCar} />
            <FlatList
              data={this.state.cars}
              renderItem={({item, index}) => this._renderCar(item, index)}
              keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: "#0000ff",
  },
  title: {
    borderBottomWidth: 2.5,
    borderBottomColor: 'red',
    fontSize : 25,
    fontWeight : 'bold'
  },
  item: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});

const mapStateToProps = (state) => {
  return {
    cars: state.carReducer.cars
  }
};

export default connect(mapStateToProps)(Cars);
