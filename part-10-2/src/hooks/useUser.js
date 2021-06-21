import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZEDUSER } from '../graphql/queries';

const useUser = () => {
  let variables = {"first": 9, "includeReviews": true};
  const { data, loading, fetchMore, ...result} = useQuery(GET_AUTHORIZEDUSER,{
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      query: GET_AUTHORIZEDUSER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews:{
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
              ...previousResult.authorizedUser.reviews.edges,
              ...fetchMoreResult.authorizedUser.reviews.edges,
              ]
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    authorizedUser: data ? data.authorizedUser : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useUser;