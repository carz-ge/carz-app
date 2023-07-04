import * as React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Text} from 'react-native';
import Profile from '../screens/profile';
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

function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="tabs"
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
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
