import React from 'react';
import { Container } from 'native-base';
import ChatHeader from '../components/ChatHeader';
import { GiftedChat } from 'react-native-gifted-chat'
import CustomScrollToBottom from '../components/ChatsComponent/CustomScrollToBottom';
import CustomMessageText from '../components/ChatsComponent/CustomMessageText';
import CustomBubble from '../components/ChatsComponent/CustomBubble';
import CustomSend from '../components/ChatsComponent/CustomSend';
import CustomInputToolbar from '../components/ChatsComponent/CustomInputToolbar'

export default class PresentChatScreen extends React.Component {
  state = {
    messages: [{
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
      },
    },],
  };

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <>
      <Container style={state.params.appStyles.GiftedChatContainer}>
      <ChatHeader 
        {...this.props}
        name={state.params.activeChatname} 
        ProfilePicUrl={state.params.ProfilePicUrl}
        appStyles={state.params.appStyles}
        />
      <GiftedChat
        scrollToBottom
        textInputStyle={state.params.appStyles.CustomTextinputStyle}
        renderAvatar={null}
        renderUsernameOnMessage={true}
        inverted={false}
        maxInputLength={200}
        textInputProps={{ disable: true }}
        messages={this.state.messages}
        isTyping={true}
        inverted={true}
        onSend={(messages) => this.onSend(messages)}
        scrollToBottomComponent={CustomScrollToBottom}
        renderBubble={CustomBubble}
        renderSend={CustomSend}
        user={{ _id: 1 }}
        keyboardShouldPersistTaps={null}
        listViewProps={{ showsVerticalScrollIndicator: false, style: { marginBottom: 16 } }}
        renderMessageText={CustomMessageText}
        renderInputToolbar={CustomInputToolbar}
      />
      </Container>
      </>
    );
  }

}