import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import styles from './Styles';
import { HOST } from './Const';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { email: null, password: null, isLoading: false, };
  }

  componentWillMount() {
     AsyncStorage.getItem('token').then((token) => {
       if (token != null) {
         // this.props.navigation.navigate('home');
       }
     });
  }

  userLogin = () => {
    if (!this.state.email || !this.state.password) return;
    this.setState({ isLoading: true });
    fetch(`${HOST}/api/v1/sessions`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.access_token) {
        this.saveItem('token', responseData.access_token);
        this.props.navigation.navigate('home');
      } else {
        this.setState({ isLoading: false });
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async saveItem(item, value) {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
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
        <View style={styles.container}>
          <Text style={styles.title}> Welcome </Text>

          <View style={styles.form}>
            <TextInput
              editable={true}
              onChangeText={(email) => this.setState({email})}
              placeholder='email'
              ref='email'
              returnKeyType='next'
              style={styles.inputText}
              value={this.state.email}
            />

            <TextInput
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='password'
              returnKeyType='next'
              secureTextEntry={true}
              style={styles.inputText}
              value={this.state.password}
            />

            <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
              <Text style={styles.buttonText}> Log In </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

export default Authentication;