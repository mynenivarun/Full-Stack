import { useMutation } from '@apollo/react-hooks';
import { CREATEUSER } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';


const useSignUp = () => {
    const [mutate, result] = useMutation(CREATEUSER);
    const apolloClient = useApolloClient();
  
    const signUp = async ({ username, password }) => {
      // call the mutate function here with the right arguments
      const myResult = await mutate({variables: {input: {username, password}}});
      apolloClient.resetStore();
      return myResult;
    };
  
    return [signUp, result];
  };

export default useSignUp;