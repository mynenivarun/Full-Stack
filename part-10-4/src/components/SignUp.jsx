import React from 'react';
import { Button, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';


export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ margin: 15 }}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
        <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
        <Button
          title="Sign up"
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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required')
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;