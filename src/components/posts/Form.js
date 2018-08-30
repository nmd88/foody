import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform,
  TouchableHighlight, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { connect } from 'react-redux';

import { createPost, updatePost } from '../../actionsMitsu';

class FormPost extends Component {
  constructor(props) {
    super(props);
    this.defaultPost();
  }

  defaultPost = () => {
    this.state = {
      title: '',
      content: '',
      image: '',
      description: '',
      category_id: ''
    };
  }

  handleSubmit = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      description: this.state.description,
      category_id: this.state.category_id
    }
    this.props.dispatch(createPost(data));
    this.setState({
      title: '',
      content: '',
      image: '',
      description: '',
      category_id: ''
    });
    this.props.navigation.navigate("posts");
  }

  updateInput(name, value) {
    this.setState({[name]: value});
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
            value={this.state.title}
            placeholder='Enter title'
            onChangeText={(text) => this.updateInput('title', text)}
          />
          <TextInput
            value={this.state.content}
            placeholder='Enter content'
            onChangeText={(text) => this.updateInput('content', text)}
          />
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <Text>create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(FormPost);
