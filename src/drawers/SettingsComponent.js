import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    Text, View, Image, TouchableHighlight
} from 'react-native';
import HeaderComponent from './HeaderComponent';

const backgroundColor = '#e97600';
export default class SettingsComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    let drawerLabel = 'Withdrawal';
    let drawerIcon = () => (
      <Image
        source={require('./../../images/withdrawal.png')}
        style={{ width: 26, height: 26, tintColor: backgroundColor }}
      />
    );
    return { drawerLabel, drawerIcon };
  }
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        }}
      >
        <HeaderComponent {...this.props} />
        <View style={{
          flex: 1,
          backgroundColor: backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
            This is Withdrawal Screen
          </Text>
        </View>
      </View>
    );
  }
}
