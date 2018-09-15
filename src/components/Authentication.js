import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { HOST } from './Const';

import bgSrc from '../../images/wallpaper.png';
import logoImg from '../../images/logo.png';
import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import eyeImgOn from '../../images/eye_black.png';
import eyeImgOff from '../../images/eye_off.png';

class Authentication extends Component {
  static navigationOptions = {header: null}

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      isLoading: false,
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
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
      return(
        <View style={{backgroundColor: 'red', flex: 1, }}>
          <ImageBackground style={{
            flex: 1,
            width: null,
            height: null,
            // resizeMode: 'cover',
          }} source={bgSrc}>
            <View style={styles.container_}>
              <Image source={logoImg} style={styles.image_} />
              <Text style={styles.text_}>REACT NATIVE</Text>
            </View>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.inputWrapper}>
                <Image source={usernameImg} style={styles.inlineImg} />
                <TextInput
                  style={styles.input}
                  placeholder={"Username"}
                  autoCorrect={false}
                  onChangeText={(email) => this.setState({email})}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  placeholderTextColor="white"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Image source={passwordImg} style={styles.inlineImg} />
                <TextInput
                  style={styles.input}
                  placeholder={"Password"}
                  autoCorrect={false}
                  onChangeText={(password) => this.setState({password})}
                  secureTextEntry={this.state.showPass}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  placeholderTextColor="white"
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnEye}
                onPress={this.showPass}>
                <Image source={this.state.showPass? eyeImgOff:eyeImgOn} style={styles.iconEye} />
              </TouchableOpacity>
              <View style={styles.container_button}>
                <TouchableOpacity style={styles.button} onPress={this.userLogin}>
                  <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container_text}>
                <Text style={styles.text}>Create Account</Text>
                <Text style={styles.text}>Forgot Password?</Text>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      )
    }
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container_ :{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_: {
    width: 80,
    height: 80,
  },
  text_: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  btnEye: {
    position: 'absolute',
    top: 60,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  container_text: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  container_button: {
    flex: 1,
    width: DEVICE_WIDTH - 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: 40,
    borderRadius: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});

export default Authentication;
