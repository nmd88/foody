import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker, TextInput,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView,
} from 'react-native';

import { HOST } from './Const';

class SelectCategory extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      categories: '',
      cost: '',
      costs: '',
      name: '',
    }
  }

  componentWillMount() {
    this.setState({
      categories: this.props.categories,
      costs: [
        {"0 -> 500,000,000": [0, 500000000]},
        {"500,000,000 -> 1,000,000,000": [500000001, 1000000000]},
        {"1,000,000,000 -> 1,500,000,000": [1000000001, 1500000000]},
        {"2,000,000,000 -> 2,500,000,000": [2000000001, 2500000000]},
        {"> 2,500,000,000": [2500000001, 100000000000000]}
      ],
    });
  }

  searchNameCar = (text) => {
    this.setState({name: text});
    this.props.handleSearch({name: text, category_id: this.state.category, cost: this.state.cost});
  }

  searchCategory = (value, index) => {
    this.setState({category: value});
    this.props.handleSearch({name: this.state.name, category_id: value, cost: this.state.cost});
  }

  searchCost = (value, index) => {
    this.setState({cost: value});
    this.props.handleSearch({name: this.state.name, category_id: this.state.category, cost: value});
  }

  reset = () => {
    this.setState({
      category: '',
      cost: '',
      name: '',
    });
    this.props.handleSearch({});
  }

  _renderCategory = (item, _key) => {
    return (
      <Picker.Item key={`category_${item.id}`} label={item.name} value={item.id} />
    );
  }

  _renderCost = (item, key) => {
    var data = Object.keys(item);
    return (
      <Picker.Item key={key} label={data[0]} value={item[data]} />
    );
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', height: 40}}>
          <TextInput
            editable={true}
            style={{ flex: 4/5 }}
            onChangeText={(text) => this.searchNameCar(text)}
            placeholder='Enter name'
            value={this.state.name}
          />
          <TouchableOpacity style={{ flex: 1/5 }} onPress={() => this.reset()}>
            <Text style={{ lineHeight: 40 }}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
          <Picker
            selectedValue={this.state.category}
            style={{ flex: 2/7 }}
            onValueChange={(value, index) => this.searchCategory(value, index)}>
            <Picker.Item label='Types' value='' />
            {this.state.categories.map((item, key) => this._renderCategory(item, key))}
          </Picker>
          <Picker
            selectedValue={this.state.cost}
            style={{ flex: 5/7 }}
            onValueChange={(value, index) => this.searchCost(value, index)}>
            <Picker.Item label='Costs' value='' />
            {this.state.costs.map((item, key) => this._renderCost(item, key))}
          </Picker>
        </View>
      </View>
    );
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

export default SelectCategory;
