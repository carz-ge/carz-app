import {Pressable} from 'react-native';
import React from 'react';
import {Avatar} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
interface ProfileIconProps {
  onClick: () => void;
}

// function useUsername() {
//   const user = useUser();
//   if (!user) return '1';
//   const username = `${user.firstname || ''} ${user.lastname || ''}`;
//   return username === ' ' ? '2' : username;
// }

export default function ProfileIcon({onClick}: ProfileIconProps) {
  return (
    <Pressable onPress={onClick}>
      <Avatar
        size={50}
        autoColor
        icon={props => <Icon name="account" {...props} />}
        // image={{uri: 'https://mui.com/static/images/avatar/1.jpg'}}
      />
    </Pressable>
  );
}
