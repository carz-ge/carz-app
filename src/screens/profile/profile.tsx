import React from 'react';
import {Alert, Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import colors from '../../styles/colors';
import {useAuth} from '../../context/auth-context';
import useUser from '../../hooks/user';
import {RootStackScreenProps} from '../../navigation/types';

export default function Profile({navigation}: RootStackScreenProps<'profile'>) {
  const user = useUser();

  const {removeAuthToken} = useAuth();

  const onLogOut = () => {
    removeAuthToken()
      .then(() => {
        navigation.navigate('auth', {
          screen: 'signIn',
        });
      })
      .catch(() => {
        Alert.alert('Error', 'Error occurred during log out');
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <>
          <Text style={styles.title}>{user.firstname}</Text>
          <Text style={styles.title}>{user.lastname}</Text>
          <Text style={styles.title}>{user.phone}</Text>
        </>
      )}

      {/* Log out button */}
      <Pressable
        onPress={onLogOut}
        style={[styles.button, {backgroundColor: colors.buttonPrimary}]}>
        <Text style={styles.buttonText}>აპლიკაციიდან გასვლა</Text>
      </Pressable>
    </SafeAreaView>
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
