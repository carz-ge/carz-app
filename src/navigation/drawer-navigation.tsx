import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text} from 'react-native';
import Expenses from '../screens/(drawer)/expences';
import NotificationScreen from '../screens/(drawer)/notifications';
import Profile from '../screens/(drawer)/profile';
import Chat from '../screens/(drawer)/chat';
import Tabs from './tab-navigation';
import {DrawerParamList} from './types';
import MyCars from '../screens/(drawer)/my-car';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{alignSelf: 'center', fontSize: 20}}>მოგესალმები</Text>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// function useTitleNameForTabs() {
//   const pathname = useNaiv();
//   if (pathname === '/bookings') {
//     return 'ჯავშნები';
//   }
//   return 'მთავარი';
// }

const DrawerNavigation = () => (
  <Drawer.Navigator drawerContent={CustomDrawerContent}>
    <Drawer.Screen
      name={'tabs'}
      options={{title: 'მთავარი'}}
      component={Tabs}
    />
    <Drawer.Screen
      name="profile"
      options={{title: 'პროფილი'}}
      component={Profile}
    />
    <Drawer.Screen
      name="myCar"
      options={{title: 'ავტომობილები'}}
      component={MyCars}
    />
    <Drawer.Screen
      name="chat"
      options={{title: 'ასისტენტი'}}
      component={Chat}
    />
    <Drawer.Screen
      name="expences"
      options={{title: 'ხარჯები'}}
      component={Expenses}
    />
    <Drawer.Screen
      name="notifications"
      options={{title: 'ნოტიფიკაციები'}}
      component={NotificationScreen}
    />
  </Drawer.Navigator>
);

export default DrawerNavigation;
