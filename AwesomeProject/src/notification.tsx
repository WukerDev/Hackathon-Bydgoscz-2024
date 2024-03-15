import PushNotification from "react-native-push-notification";

const showNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'your_channel_id',
    title,
    message,
  });
};

const handleScheduledNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    channelId: 'your_channel_id',
    title,
    message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

const alramNotification = (title, message, time) => {
    PushNotification.localNotificationSchedule({
        channelId: 'your_channel_id',
        title,
        message,
        date: new Date(time),
    });
    }


const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export { showNotification, handleScheduledNotification, handleCancel, alramNotification };