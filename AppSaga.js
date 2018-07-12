import React, { Component } from 'react';
//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers';
import CounterContainer from './src/containers/CounterContainer';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas/rootSaga';
//Middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
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

sagaMiddleware.run(rootSaga);
