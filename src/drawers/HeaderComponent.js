import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    Text, View, Image, TouchableHighlight, Alert
} from 'react-native';

export default class HeaderComponent extends Component {
    render() {
        return (<View style={{
            height: 90,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 20 }}
                onPress={() => this.props.navigation.openDrawer()}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={require('./../../images/menu-icon.png')}
                />
            </TouchableHighlight>
        </View>);
    }
}
