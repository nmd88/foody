/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class Demo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      rotateValue: new Animated.Value(0),
    }
  }

  _fadeAnimation = () => {
    Animated.timing(this.state.fadeValue, {toValue: 1, duration: 1000}).start();
  }

  _moveAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - 100,
      duration: 1000,
      // asing: Easing.linear,
      asing: Easing.back(),
    }).start();
  }

  _toggleAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - 100,
      duration: 1000,
      // asing: Easing.linear,
      asing: Easing.back(),
    }).start(() => {
      Animated.timing(this.state.xValue, {
        toValue: 0,
        duration: 1000,
        // asing: Easing.linear,
        asing: Easing.back(),
      }).start(() => {
        this._toggleAnimation();
      });
    });
  }

  _springAnimation = () => {
    Animated.timing(this.state.springValue, {
      toValue: 1,
      friction: 1,
    }).start(() => {
      Animated.timing(this.state.springValue, {
        toValue: 0.3,
        friction: 1,
      }).start(() => {
        this._springAnimation();
      });
    });
  }

  _rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 1000,
        asing: Easing.linear,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
        asing: Easing.linear,
      }),
    ]).start(() => {
      this._rotateAnimation();
    });
  }

  _moveAndRotateAnimation = () => {
    Animated.parallel([
      this._toggleAnimation(),
      this._rotateAnimation(),
    ]).start();
  }

  render() {
    const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        {/*
          <Animated.View style={[styles.animationView, {left: this.state.xValue}]}>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={this._moveAnimation}>
             <Text style={styles.buttonText}>Animate </Text>
          </TouchableOpacity>
        */}

        {/*
          <Animated.View style={[styles.animationView, {opacity: this.state.fadeValue}]}>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={this._fadeAnimation}>
            <Text style={styles.buttonText}>Animate </Text>
          </TouchableOpacity>
        */}

        <Animated.Image
          source={require('./../../images/react.png')}
          style={[styles.imageView, {left: this.state.xValue}]}>
        </Animated.Image>
        <TouchableOpacity style={styles.button} onPress={this._toggleAnimation}>
          <Text style={styles.buttonText}>Animate </Text>
        </TouchableOpacity>

        <Animated.Image
          source={require('./../../images/react.png')}
          style={[styles.imageView, {transform: [{scale: this.state.springValue}], alignSelf: 'center'}]}>
        </Animated.Image>
        <TouchableOpacity style={styles.button} onPress={this._springAnimation}>
          <Text style={styles.buttonText}>Animate </Text>
        </TouchableOpacity>

      {/*
        <Animated.Image
          source={require('./../../images/react.png')}
          style={[styles.imageView, {transform: [{rotate: interpolatedRotateAnimation}]}]}>
        </Animated.Image>
        <TouchableOpacity style={styles.button} onPress={this._rotateAnimation}>
          <Text style={styles.buttonText}>Animate </Text>
        </TouchableOpacity>
        */}

        <Animated.Image
          source={require('./../../images/react.png')}
          style={[styles.imageView,
            {left: this.state.xValue},
            {transform: [{rotate: interpolatedRotateAnimation}]}]}>
        </Animated.Image>
        <TouchableOpacity style={styles.button} onPress={this._moveAndRotateAnimation}>
          <Text style={styles.buttonText}>Animate </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'steelblue',
    height: 45,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 19,
  },
  imageView: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent'
  },
});
