import { withLayoutContext } from 'expo-router';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator, DrawerContentComponentProps, DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { Text } from 'react-native';

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext<DrawerNavigationOptions,
  typeof DrawerNavigator>(DrawerNavigator);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ alignSelf: 'center', fontSize: 20 }}>მოგესალმები</Text>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  console.log("DrawerLayout")
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={"index"}
        options={{  title: 'მთავარი' }}
      />
      <Drawer.Screen name="profile" options={{ title: 'პროფილი' }} />
      {/*<Drawer.Screen name="bookmarks" options={{ title: 'დამახსოვრებული' }} />*/}
    </Drawer>
  );
}
