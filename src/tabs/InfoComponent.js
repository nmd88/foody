import React, { Component } from 'react';
import {Text, View, Image} from 'react-native';
import Button from 'react-native-button';
const backgroundColor = '#007256';

export default class InfoComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        let tabBarLabel = 'MyWallet';
        let tabBarIcon = () => (
            <Image
                source={require('./../../images/myWallet.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return { tabBarLabel, tabBarIcon };
    }

    render() {
        return (<View style={{
            flex: 1,
            backgroundColor: backgroundColor,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>This is My Wallet Screen</Text>
        </View>);
    }
}
