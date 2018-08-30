import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage, YellowBox } from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducersMitsu';

const store = createStore(allReducers);

import Authentication from './src/components/Authentication';
import Home from './src/components/HomePage';
import HomeCars from './src/components/home/Cars';
import HomeImages from './src/components/home/Images';
import HomePosts from './src/components/home/Posts';
import Cars from './src/components/cars';
import DetailCar from './src/components/cars/Detail';
import Posts from './src/components/posts';
import FormPost from './src/components/posts/Form';
import DetailPost from './src/components/posts/Detail';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const RootStack = createStackNavigator(
  {
    login: {screen: Authentication},
    home: {screen: Home},
    home_cars: {screen: HomeCars},
    home_posts: {screen: HomePosts},
    home_images: {screen: HomeImages},
    cars: {screen: Cars},
    detail_car: {screen: DetailCar},
    posts: {screen: Posts},
    detail_post: {screen: DetailPost},
    form_post: {screen: FormPost},
  },
  {
    initialRouteName: 'login'
  }
);

class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      return (
        <Provider store={store}>
          <RootStack/>
        </Provider>
      );
    }
  }
}

export default App;
