import React, { useEffect } from 'react';
import { useHistory } from "react-router-native";
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';


const SignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push("/");
  };

  useEffect(() => {
    logout();
  },[]);
  
  return (<></>);
};

export default SignOut;