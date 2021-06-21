import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (sorting, search) => {
  let variables = {};

  switch (sorting) {
    case 'highest':
      variables = {"order":"RATING_AVERAGE", "dir": "DESC", search, first: 8}; break;
    case 'lowest':
      variables = {"order":"RATING_AVERAGE", "dir": "ASC", search, first: 8}; break;
    default:
      variables = {"order":"CREATED_AT", "dir": "DESC", search, first: 8};
  }

  const { data, loading, fetchMore, ...result  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', variables
  });
  
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;