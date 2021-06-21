import { useMutation } from '@apollo/react-hooks';
import { CREATEREVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';


const useReview = () => {
    const [mutate, result] = useMutation(CREATEREVIEW);
    const apolloClient = useApolloClient();
  
    const createReview = async ({ repoOwner, repoName, rating, review }) => {
      // call the mutate function here with the right arguments
      const myResult = await mutate({variables:{"input":{"repositoryName": repoName,"ownerName": repoOwner,"rating": parseInt(rating), "text": review} }});
      apolloClient.resetStore();
      return myResult;
    };
  
    return [createReview, result];
  };

export default useReview;

