import React from "react";
import {Link, Tabs, useNavigation} from 'expo-router';
import {Pressable, useColorScheme} from 'react-native';
import Colors from '../../lib/styles/colors';
import {FontAwesome, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import {DrawerActions} from "@react-navigation/native";

function AvatarHeader() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => {
      console.log("pressed");
      navigation.dispatch(DrawerActions.openDrawer())
    }}>
      <Octicons size={25} name={"three-bars"}  style={{marginLeft: 15}}/>
    </Pressable>
  );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  console.log("TabLayout")
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({pressed}) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => <AvatarHeader/>

        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon name="clock-time-four" color={color}/>,
        }}
      />
    </Tabs>
  );
}
