import { useMutation } from '@apollo/react-hooks';
import { DELETEREVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';


const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETEREVIEW);
    const apolloClient = useApolloClient();
  
    const deleteReview = async  (id ) => {
      const myResult = await mutate({variables: {id}});
      apolloClient.resetStore();
      return myResult;
    };
  
    return [deleteReview, result];
  };

export default useDeleteReview;