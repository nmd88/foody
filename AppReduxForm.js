import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { Provider } from "react-redux";
// import App from './App';
import store from "./store";
import ContactForm from './src/components/ContactForm';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ContactForm/>
            </Provider>
        );
    }
};
