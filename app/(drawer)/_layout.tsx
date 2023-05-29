import React from 'react';
import {withLayoutContext} from 'expo-router';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import {Text} from 'react-native';
import {usePathname} from 'expo-router/src/LocationProvider';

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext<
  DrawerNavigationOptions,
  typeof DrawerNavigator
>(DrawerNavigator);

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
      <Drawer.Screen name="car" options={{title: 'ავტომობილები'}} />
    </Drawer>
  );
}
