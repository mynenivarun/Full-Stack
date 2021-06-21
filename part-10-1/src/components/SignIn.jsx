import React from 'react';
import { Button, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";


export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ margin: 15 }}>
        <FormikTextInput name="username" placeholder="Username" testID='usernameField'/>
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID='passwordField'/>
        <Button
          title="Sign in"
          onPress={onSubmit}
          testID="submitButton"
          style={{margin: 10, padding: 10}}
        />
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;