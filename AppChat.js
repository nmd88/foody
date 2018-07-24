import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

export default class App extends Component  {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          image: 'https://placeimg.com/140/140/any',
          user: {
            _id: 2,
            name: 'Author 1',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Hello kasan',
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'Author 2',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble = props => {
      let username = props.currentMessage.user.name
      let color = this.getColor(username)

      return (
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: 'white'
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: 'red'
            }
          }}
        />
      )
    }

  getColor = (username) => {
    let sumChars = 0;
    for(let i = 0;i < username.length;i++){
      sumChars += username.charCodeAt(i);
    }

    const colors = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ];
    return colors[sumChars % colors.length];
  }


  renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={{borderTopWidth: 1.5, borderTopColor: '#333'}} />
  }

  loading = () => {
    return (<Text>Loading ...</Text>)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <GiftedChat
          messages={this.state.messages}
          placeholder={'Enter content'}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderLoading={this.loading}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            name: 'Ka san',
          }}
          textInputStyle={{ color: 'red' }}
        />
      </View>
    )
  }
}
