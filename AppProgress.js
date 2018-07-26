import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true,
    };
  }

  componentDidMount() {
    this.animate();
  }


  nextProcess = () => {
    setInterval(this.incProcess, 1000);
  }

  incProcess = () => {
    if (this.state.a == 100) {
      this.setState({a: 0})
    } else {
      this.setState({a: ++this.state.a})
    }
    this.nextProcess();
  }

  animate() {
    let progress = 0;
    this.setState({ indeterminate: false });
    setInterval(() => {
      if (progress == 100) {
        progress = 1;
      } else {
       progress += 1;
      }
      this.setState({progress});
    }, 100);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Progress Example</Text>
        <Progress.Bar
          style={styles.progress}
          progress={this.state.progress * 0.01}
          indeterminate={this.state.indeterminate}
        />
        <View style={styles.circles}>
          <Progress.Circle
            style={styles.progress}
            progress={this.state.progress * 0.01}
            indeterminate={this.state.indeterminate}
            showsText={true}
            size={100}
            color="red"
          />
          <Progress.Pie
            style={styles.progress}
            progress={this.state.progress * 0.01}
            indeterminate={this.state.indeterminate}
            size={100}
          />
          <Progress.Circle
            style={styles.progress}
            progress={this.state.progress * 0.01}
            indeterminate={this.state.indeterminate}
            direction="counter-clockwise"
            showsText={true}
            size={100}
            color="yellow"
          />
        </View>
        <View style={styles.circles}>
          <Progress.CircleSnail style={styles.progress} />
          <Progress.CircleSnail
            style={styles.progress}
            color={['#F44336', '#2196F3', '#009688']}
          />
        </View>
      </View>
    );
  }
}
