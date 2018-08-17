import React, { Component } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, AsyncStorage,
  FlatList, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { HOST } from './Const';

class Posts extends Component {
  static navigationOptions = {
    title: 'Posts',
    headerTitleStyle: {color: 'black', textAlign: 'center'}
  };

  constructor() {
    super();
    this.state = {
      categories: [],
      posts: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getPosts();
  }

  getPosts = () => {
    AsyncStorage.getItem('token').then((token) => {
      fetch(`${HOST}/api/v1/posts`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          categories: responseJson.categories,
          posts: responseJson.posts,
          isLoading: false,
        });
      }).catch((error) => {
        console.error(error);
      });
    })
  }

  _renderPost = (item, index) => {
    return (
      <TouchableOpacity>
        <View key={index} style={styles.item}>
          <Image style={{width: '100%', height: 120}}
            source={{uri: `${HOST}${item.image.url}`}} />
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      const {navigate} = this.props.navigation;
      return (
        <View style={{flex: 1}}>
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            contentContainerStyle={{marginLeft: 2, marginRight: 2}}
          >
            <View>
              <TouchableOpacity onPress={() => navigate('form_post')}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.posts}
              renderItem={({item, index}) => this._renderPost(item, index)}
              keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: "#0000ff",
  },
  title: {
    borderBottomWidth: 2.5,
    borderBottomColor: 'red',
    fontSize : 25,
    fontWeight : 'bold'
  },
  item: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});

export default Posts;
