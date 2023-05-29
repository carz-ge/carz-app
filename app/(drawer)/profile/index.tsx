import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import colors from '../../../lib/styles/colors';
import {useAuth} from '../../../lib/context/auth-context';

export default function Profile() {
  const {removeAuthToken} = useAuth();
  const onLogOut = () => {
    removeAuthToken();
  };
  return (
    <View style={styles.container}>
      {/*name*/}
      <Text style={styles.title}>სახელი</Text>
      {/*last Name*/}
      <Text style={styles.title}>გვარი</Text>

      {/* log out button */}
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
    backgroundColor: '#FAFFF3',
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
