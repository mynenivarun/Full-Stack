import { useQuery } from '@apollo/react-hooks';
import { GET_REPO } from '../graphql/queries';

const useRepository = (id) => {
  let variables = {"id": id, "first": 9};
  const { data, loading, fetchMore, ...result} = useQuery(GET_REPO,{
    fetchPolicy: 'cache-and-network',
    variables
  });
  
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPO,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews:{
              ...fetchMoreResult.repository.reviews,
              edges: [
              ...previousResult.repository.reviews.edges,
              ...fetchMoreResult.repository.reviews.edges,
              ]
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;