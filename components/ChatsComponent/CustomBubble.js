import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import posed, { Transition } from 'react-native-pose';
import { LightTheme,DarkTheme, MediumTheme } from '../../appStyles';

const TransitionBubble = posed.View({
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0.5, x: ({ offset }) => offset }
});

const CustomBubble = bubbleProps => {
  
  const { user: { _id: authorId }, currentMessage: { user: { _id: currentId } } } = bubbleProps;
  const offset = authorId === currentId ? 20 : -20;
  
  var appStyles=LightTheme;
  if(bubbleProps.theme == 'light')
  appStyles=LightTheme;
  else if(bubbleProps.theme == 'medium')
  appStyles=MediumTheme;
  else if(bubbleProps.theme == 'dark')
  appStyles=DarkTheme;
  
  return (
    <Transition offset={offset} animateOnMount>
      <TransitionBubble key='message-bubble' style={appStyles.CustomBubblercontainer}>
        <Bubble
          {...bubbleProps}
          // @ts-ignore
          style = {appStyles.Bubble}
          wrapperStyle={{ right: appStyles.CustomBubblerright , left:appStyles.CustomBubblerleft }}
        />
      </TransitionBubble>
    </Transition>
  );
};

export default CustomBubble;