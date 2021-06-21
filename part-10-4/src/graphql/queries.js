import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query repos($order: AllRepositoriesOrderBy, $dir: OrderDirection, $search: String, $first: Int, $after: String) { 
  repositories (orderBy: $order, orderDirection: $dir, searchKeyword: $search, first: $first, after: $after){
      edges{
          node{
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            language
          }
          cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
  }
}
`;

export const GET_REPO = gql`
query repo($id: ID!, $first: Int, $after: String){
  repository(id: $id) {
              id
              ownerAvatarUrl
              fullName
              description
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
              language
              url
              reviews(first: $first, after: $after) {
                edges {
                  node {
                    id
                    text
                    rating
                    createdAt
                    user {
                      id
                      username
                    }
                  }
                  cursor
                }
                pageInfo {
                  endCursor
                  startCursor
                  totalCount
                  hasNextPage
                }
              }
  }
}
`;


export const GET_AUTHORIZEDUSER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
            }
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;