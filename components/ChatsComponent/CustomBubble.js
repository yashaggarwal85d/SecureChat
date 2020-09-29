import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import posed, { Transition } from 'react-native-pose';
import * as styles from '../../appStyles';

const TransitionBubble = posed.View({
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0.5, x: ({ offset }) => offset }
});

const CustomBubble = bubbleProps => {
  
  const { user: { _id: authorId }, currentMessage: { user: { _id: currentId } } } = bubbleProps;

  const offset = authorId === currentId ? 20 : -20;

  return (
    <Transition offset={offset} animateOnMount>
      <TransitionBubble key='message-bubble' style={styles.CustomBubblercontainer}>
        <Bubble
          {...bubbleProps}
          // @ts-ignore
          style = {styles.Bubble}
          wrapperStyle={{ right: styles.CustomBubblerright }}
        />
      </TransitionBubble>
    </Transition>
  );
};


export default CustomBubble;