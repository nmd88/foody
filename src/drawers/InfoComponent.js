import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    Text, View, Image, TouchableHighlight
} from 'react-native';
import HeaderComponent from './HeaderComponent';

const backgroundColor = '#007256';

export default class InfoComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Scan Code';
        let drawerIcon = () => (
            <Image
                source={require('./../../images/scanCode.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return { drawerLabel, drawerIcon };
    }
    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            <HeaderComponent {...this.props} />
            <View style={{
                flex: 1,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Scan Code Screen
                </Text>
            </View>
        </View>);
    }
}
