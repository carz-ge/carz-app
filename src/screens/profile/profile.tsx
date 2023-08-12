import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import {useAuth} from '../../context/auth-context';
import useUser from '../../hooks/user';
import {RootStackScreenProps} from '../../navigation/types';
import {useRemoveUser} from '../../graphql/operations';

export default function Profile({navigation}: RootStackScreenProps<'profile'>) {
  const user = useUser();
  const [removeUser] = useRemoveUser();
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
  const onRemoveAccount = async () => {
    // TODO `add are you sure?`
    await removeUser();

    onLogOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>
              {user.firstname} {user.lastname}
            </Text>
          </View>
          <Text style={styles.title}>{user.phone}</Text>
        </View>
      )}

      {/* Log out button */}
      <Pressable
        onPress={onLogOut}
        style={[styles.button, {backgroundColor: colors.buttonPrimary}]}>
        <Text style={styles.buttonText}>აპლიკაციიდან გასვლა</Text>
      </Pressable>
      <Pressable
        onPress={onRemoveAccount}
        style={[styles.button, {backgroundColor: colors.buttonPrimary}]}>
        <Text style={styles.buttonText}>წაშლა</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    minWidth: 300,
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
