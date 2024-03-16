import React, { useState } from 'react';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { Button } from 'react-native';

function Jacoszek() {
  // Stan zawierający wiadomości
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Funkcja dodająca nową wiadomość
  const handleSend = (newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  // Funkcja obsługująca wysyłanie sugerowanej wiadomości
  const handleSuggestedMessage = (text: string) => {
    handleSend([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      },
    ]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: 1 }} // Identyfikator użytkownika - można dostosować do potrzeb
      renderSend={props => (
        <Send {...props}>
          <Button title="Send" onPress={() => props.onSend && props.onSend({ text: props.text ? props.text.trim() : '' }, true)} />
        </Send>
      )}
      renderActions={() => (
        <Button
          title="Suggested Message"
          onPress={() => handleSuggestedMessage('To jest sugerowana wiadomość')}
        />
      )}
    />
  );
}

export default Jacoszek;
