import React, { useState } from 'react';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { Button, View } from 'react-native';

function Jacoszek() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSend = (newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  const handleSuggestedMessage = (text: string) => {
    handleSend([
      {
        _id: Math.round(Math.random() * 1000000).toString(),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
        <Button
          title="Suggested Message 1"
          onPress={() => handleSuggestedMessage('To jest pierwsza sugerowana wiadomość')}
        />
        <Button
          title="Suggested Message 2"
          onPress={() => handleSuggestedMessage('To jest druga sugerowana wiadomość')}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: 1 }}
        renderSend={(props) => (
          <Send {...props}>
            <Button title="Send" onPress={() => props.onSend && props.onSend({ text: props.text ? props.text.trim() : '' }, true)} />
          </Send>
        )}
        
      />
    </View>
  );
}

export default Jacoszek;
