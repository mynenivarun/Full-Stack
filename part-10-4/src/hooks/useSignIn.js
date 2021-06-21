import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
  
    const signIn = async ({ username, password }) => {
      // call the mutate function here with the right arguments
      const myResult = await mutate({variables: {input: {username, password}}});
      await authStorage.setAccessToken(myResult.data.authorize.accessToken);
      apolloClient.resetStore();
      return myResult;
    };
  
    return [signIn, result];
  };

export default useSignIn;