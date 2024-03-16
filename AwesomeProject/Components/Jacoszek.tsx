import { GiftedChat, Bubble,IMessage } from 'react-native-gifted-chat';
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tinycolor from 'tinycolor2';

import { CustomDarkTheme, CustomLightTheme } from './Theme';
import { useColorScheme } from 'react-native';

import { Composer } from 'react-native-gifted-chat';

const CHAT_HISTORY_KEY = '@chat_history';

const Chat: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
      const history = jsonValue != null ? JSON.parse(jsonValue) : [];
      setMessages(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const storeChatHistory = async (newMessages: IMessage[]) => {
    try {
      const jsonValue = JSON.stringify(newMessages);
      await AsyncStorage.setItem(CHAT_HISTORY_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const clearChatHistory = async () => {
    try {
      await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  const onSend = async (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    setLoadingMessage('Asystent pisze...');

    const chatHistory = messages.concat(newMessages).map((msg) => ({
      role: msg.user._id === 1 ? 'user' : 'assistant',
      content: msg.text,
    }));

    try {
      const response = await fetch('http://192.168.217.175:31647/sendToGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatHistory),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reply = await response.json();

      const messageParts = reply.content.split('. ');

      for (let index = 0; index < messageParts.length; index++) {
        const part = messageParts[index];
        const delay = index === 0 ? 0 : part.length * 100;

        setTimeout(() => {
          const receivedMessage: IMessage = {
            _id: Math.round(Math.random() * 2000000),
            text: part,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'assistant',
            },
          };

          setMessages((previousMessages) => {
            const updatedMessages = GiftedChat.append(previousMessages, [receivedMessage]);
            storeChatHistory(updatedMessages);
            return updatedMessages;
          });

          if (index === messageParts.length - 1) {
            setLoadingMessage('');
          }
        }, delay);
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      setLoadingMessage('');
    }
  };

  const renderComposer = (props: any) => (
    <Composer
      {...props}
      textInputStyle={{
        color: theme.colors.background,
      }}
    />
  );

  const renderBubble = (props: any) => {
    let backgroundColor;

    if (props.currentMessage.user._id === 1) { // Użytkownik
      backgroundColor = 'red'; // Intensywny czerwony dla bąbli użytkownika
    } else { // Odpowiedź
      backgroundColor = tinycolor('red').lighten(25).toString(); // Czerwony, ale jaśniejszy dla odpowiedzi
    }

    return (
    <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: backgroundColor,
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.newChatButton}>
        <Button title="Nowa Konwersacja" onPress={clearChatHistory} />
      </View>
      <GiftedChat
        renderComposer={renderComposer}
        renderBubble={renderBubble}
        messages={messages}
        isTyping={true}
        onSend={(messagesToSend: IMessage[]) => onSend(messagesToSend)}
        user={{ _id: 1 }}
        renderFooter={() => (
          <View style={styles.loadingIndicator}>
            <Text>{loadingMessage}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newChatButton: {
    padding: 10,
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Chat;
