import React, { Component } from 'react';
//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers';
import CounterContainer from './src/containers/CounterContainer';

let store = createStore(allReducers);
const App = () => (
    <Provider store={store}>
        <CounterContainer />
    </Provider>
);

export default class AppSaga extends Component {
  render() {
    return <App/>;
  }
}
