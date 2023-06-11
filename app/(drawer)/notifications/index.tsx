import React, {useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, Platform, Button} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {
  Scalars,
  useAddDeviceToken,
  useSendPushNotification,
} from '../../../graphql/operations';
import {PermissionStatus} from 'expo-modules-core/src/PermissionsInterface';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== PermissionStatus.GRANTED) {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== PermissionStatus.GRANTED) {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function NotificationScreen() {
  const [expoPushToken, setExpoPushToken] = useState<string | null | undefined>(
    '',
  );
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [sendNotification] = useSendPushNotification();
  const [addDeviceToken] = useAddDeviceToken();

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification() {
    console.log('sendPushNotification clicked');
    try {
      const res = await sendNotification({
        variables: {
          input: {
            deviceToken: expoPushToken!,
            text: 'Test Text',
            title: 'Test Title',
          },
        },
      });
      console.log('result:', JSON.stringify(res));
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      setExpoPushToken(token);
      try {
        await addDeviceToken({
          variables: {
            input: {
              deviceToken: token,
              platform: Platform.OS,
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, [addDeviceToken]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>
            Title: {notification && notification.request.content.title}{' '}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{' '}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
