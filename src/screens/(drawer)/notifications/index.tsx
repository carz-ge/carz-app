import React, {useEffect, useRef, useState} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {
  useAddDeviceToken,
  useSendPushNotification,
} from '../../../graphql/operations';
// // import {PermissionStatus} from 'expo-modules-core/src/PermissionsInterface';
// import messaging, {
//   FirebaseMessagingTypes,
// } from '@react-native-firebase/messaging';

// const requestUserPermission = async () => {
//   if (!Device.isDevice) {
//     alert('Must use physical device for Push Notifications');
//     return false;
//   }

//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return enabled;
// };

// async function registerForPushNotificationsAsync() {
//   try {
//     let token;
//     if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
//     if (Device.isDevice) {
//       const {status: existingStatus} =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== PermissionStatus.GRANTED) {
//         const {status} = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== PermissionStatus.GRANTED) {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       token = (await Notifications.getDevicePushTokenAsync()).data;
//       console.log(token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
//
//     return token;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// }

export default function NotificationScreen() {
  const [devicetoken, setDeviceToken] = useState<string | null>();

  const [sendNotification] = useSendPushNotification();
  const [addDeviceToken] = useAddDeviceToken();
  // useEffect(() => {
  //   requestUserPermission().then(async enabled => {
  //     if (enabled) {
  //       await messaging().registerDeviceForRemoteMessages();
  //     }
  //   });

  //   messaging()
  //     .getToken()
  //     .then(async token => {
  //       console.log('device token', token);
  //       setDeviceToken(token);
  //       try {
  //         const res = await addDeviceToken({
  //           variables: {
  //             input: {
  //               deviceToken: token,
  //               platform: Platform.OS,
  //             },
  //           },
  //         });

  //         console.log('Added device toke res:', JSON.stringify(res));
  //         alert(`Token ${token}, res: ${JSON.stringify(res)}`);
  //       } catch (e) {
  //         alert(`send error: ${e}`);
  //       }
  //     });

  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: false,
  //       shouldSetBadge: false,
  //     }),
  //   });

  //   // Handle user clicking on a notification and open the screen
  //   const handleNotificationClick = async (
  //     response: Notifications.NotificationResponse,
  //   ) => {
  //     console.log(`handleNotificationClick: ${JSON.stringify(response)}`);
  //     const screen = response?.notification?.request?.content?.data?.screen;
  //     if (screen !== null) {
  //       // navigation.navigate(screen);
  //     }
  //   };

  //   // Listen for user clicking on a notification
  //   const notificationClickSubscription =
  //     Notifications.addNotificationResponseReceivedListener(
  //       handleNotificationClick,
  //     );

  //   // Handle user opening the app from a notification (when the app is in the background)
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(`onNotificationOpenedApp: ${JSON.stringify(remoteMessage)}`);

  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.data?.screen,
  //     );
  //     if (remoteMessage?.data?.screen) {
  //       // navigation.navigate(`${remoteMessage.data.screen}`);
  //     }
  //   });

  //   // Check if the app was opened from a notification (when the app was completely quit)
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log(`getInitialNotification: ${JSON.stringify(remoteMessage)}`);

  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         if (remoteMessage?.data?.screen) {
  //           // navigation.navigate(`${remoteMessage.data.screen}`);
  //         }
  //       }
  //     });

  //   // Handle push notifications when the app is in the background
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     const notification = {
  //       title: remoteMessage.notification?.title,
  //       body: remoteMessage.notification?.body,
  //       data: remoteMessage.data, // optional data payload
  //     };

  //     // Schedule the notification with a null trigger to show immediately
  //     await Notifications.scheduleNotificationAsync({
  //       content: notification,
  //       trigger: null,
  //     });
  //   });

  //   // Handle push notifications when the app is in the foreground
  //   const handlePushNotification = async (
  //     remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  //   ) => {
  //     console.log(`handlePushNotification: ${JSON.stringify(remoteMessage)}`);
  //     alert(`handlePushNotification: ${JSON.stringify(remoteMessage)}`);

  //     const notification = {
  //       title: remoteMessage.notification?.title,
  //       body: remoteMessage.notification?.body,
  //       data: remoteMessage.data, // optional data payload
  //     };

  //     // Schedule the notification with a null trigger to show immediately
  //     await Notifications.scheduleNotificationAsync({
  //       content: notification,
  //       trigger: null,
  //     });
  //   };

  //   // Listen for push notifications when the app is in the foreground
  //   const unsubscribe = messaging().onMessage(handlePushNotification);

  //   // Clean up the event listeners
  //   return () => {
  //     unsubscribe();
  //     notificationClickSubscription.remove();
  //   };
  // }, [addDeviceToken]);

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification() {
    console.log('sendPushNotification clicked');
    try {
      const res = await sendNotification({
        variables: {
          input: {
            deviceToken: devicetoken!,
            text: 'Test Text',
            title: 'Test Title',
          },
        },
      });
      console.log('result:', JSON.stringify(res));
    } catch (e) {
      console.log(`error: ${(e as Error).message}`);
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Your expo push token: {devicetoken}</Text>

        <Button
          title="Press to Send Notification"
          onPress={sendPushNotification}
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
