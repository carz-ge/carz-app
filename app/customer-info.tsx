import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {FieldValues, useForm} from 'react-hook-form';
import FormInput from "../components/form/form-input";
import {useUpdateUser} from "../graphql/operations";
import FormButton from "../components/form/form-button";

interface FormData extends FieldValues {
  firstname: string;
  lastname: string;
}

const SignIn = () => {
  const router = useRouter();
  const [updateUser, {loading, error}] = useUpdateUser({
    fetchPolicy: 'network-only',
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      firstname: '',
      lastname: '',
    },
  });

  const onUpdateUser = async (formData: FormData) => {
    console.log('on Update User: ', formData);
    try {
      const {data, errors} = await updateUser({
        variables: {
          input: formData,
        },
      });

      if (errors) {
        console.warn('errors : ', errors);
        return;
      }

      if (!data) {
        console.warn('data is empty : ');
        return;
      }

      router.push({
        pathname: '/home',
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>შეიყვანე მონაცემები</Text>

      <FormInput
        control={control}
        name={'firstname'}
        placeholder={'სახელი'}
        rules={{
          required: 'შეავსე სახელი',
        }}
      />
      <FormInput
        control={control}
        name={'lastname'}
        placeholder={'გვარი'}
        rules={{
          required: 'შეავსე გვარი',
        }}
      />

      <FormButton
        text={'შემდეგი'}
        onPress={handleSubmit(onUpdateUser)}
        loading={loading}
        disabled={loading}
        loadingText={'ნახლდება...'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: 'gray',
  },
});

export default SignIn;
