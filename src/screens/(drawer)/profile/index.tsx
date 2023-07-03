import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import colors from '../../../styles/colors';
import {useAuth} from '../../../context/auth-context';
import useUser from '../../../hooks/user';
import {RootStackParamList} from '../../../navigation/types';

export default function Profile() {
  const user = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {removeAuthToken} = useAuth();

  const onLogOut = () => {
    removeAuthToken()
      .then(() => {
        navigation.navigate('auth', {
          screen: 'signIn',
        });
      })
      .catch(() => {});
  };
  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.title}>{user.firstname}</Text>
          <Text style={styles.title}>{user.lastname}</Text>
        </>
      )}

      {/* Log out button */}
      <Pressable
        onPress={onLogOut}
        style={[styles.button, {backgroundColor: colors.buttonPrimary}]}>
        <Text style={styles.buttonText}>აპლიკაციიდან გასვლა</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
