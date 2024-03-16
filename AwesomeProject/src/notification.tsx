import PushNotification from "react-native-push-notification";

const showNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'your_channel_id',
    title,
    message,
  });
};



export { showNotification };