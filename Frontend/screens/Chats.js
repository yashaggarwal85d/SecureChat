import React from 'react';
import { Container } from 'native-base';
import ChatHeader from '../components/ChatHeader';
import ChatBubbles from '../components/ChatBubbles';
import ChatFooter from '../components/ChatFooter';

export default class PresentChatScreen extends React.Component {
  render() {
    const {state} = this.props.navigation;
    
    return (
      <Container style={state.params.appStyles.ChatMainContainer}>
        <ChatHeader 
          {...this.props}
          name={state.params.activeChatname} 
          ProfilePicUrl={state.params.ProfilePicUrl}
          appStyles={state.params.appStyles}
        />
        <ChatBubbles
          {...this.props} 
          appStyles={state.params.appStyles} 
          userId={state.params.userId}
        />
        <ChatFooter
          {...this.props} 
          appStyles={state.params.appStyles}
        />
      </Container>
    );
  }

}