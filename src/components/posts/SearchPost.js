import React, { Component } from 'react';
import {
  Alert, Image, Text, TouchableOpacity, View, AsyncStorage, Picker, TextInput,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView,
} from 'react-native';

import { HOST } from '../Const';

class SearchPost extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      categories: '',
      title: '',
    }
  }

  componentWillMount() {
    this.setState({
      categories: this.props.categories,
    });
  }

  searchTitle = (text) => {
    this.setState({title: text});
    this.props.handleSearch({title: text, category_id: this.state.category});
  }

  searchCategory = (value, index) => {
    this.setState({category: value});
    this.props.handleSearch({title: this.state.title, category_id: value});
  }

  reset = () => {
    this.setState({
      category: '',
      title: '',
    });
    this.props.handleSearch({});
  }

  _renderCategory = (item, _key) => {
    return (
      <Picker.Item key={`category_${item.id}`} label={item.name} value={item.id} />
    );
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', height: 40}}>
          <TextInput
            editable={true}
            style={{ flex: 4/5 }}
            onChangeText={(text) => this.searchTitle(text)}
            placeholder='Enter title'
            value={this.state.title}
          />
          <TouchableOpacity style={{ flex: 1/5 }} onPress={() => this.reset()}>
            <Text style={{ lineHeight: 40 }}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 40 }}>
          <Picker
            selectedValue={this.state.category}
            style={{width: 200}}
            onValueChange={(value, index) => this.searchCategory(value, index)}>
            <Picker.Item label='Types' value='' />
            {this.state.categories.map((item, key) => this._renderCategory(item, key))}
          </Picker>
        </View>
      </View>
    );
  }
}

export default SearchPost;
