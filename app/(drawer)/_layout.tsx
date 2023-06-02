import React from 'react';
import {usePathname} from 'expo-router';
import {Text} from 'react-native';
import {Drawer} from 'expo-router/drawer';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{alignSelf: 'center', fontSize: 20}}>მოგესალმები</Text>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function useTitleNameForTabs() {
  const pathname = usePathname();
  if (pathname === '/bookings') {
    return 'ჯავშნები';
  }
  return 'მთავარი';
}

export default function DrawerLayout() {
  const titleNameForTabs = useTitleNameForTabs();

  return (
    <Drawer drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name={'(tabs)'}
        options={{title: 'მთავარი', headerTitle: titleNameForTabs}}
      />
      <Drawer.Screen name="profile" options={{title: 'პროფილი'}} />
      <Drawer.Screen name="my-car" options={{title: 'ავტომობილები'}} />
      <Drawer.Screen name="chat" options={{title: 'ასისტენტი'}} />
      <Drawer.Screen name="expences" options={{title: 'ხარჯები'}} />
    </Drawer>
  );
}
