import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
mutation Authorize($input: AuthorizeInput) {
    authorize(credentials: $input) {
      accessToken
    }
}
`;

export const CREATEREVIEW = gql`
mutation CreateReview($input: CreateReviewInput){
  createReview(review: $input){
    repositoryId
  }
}
`;

export const CREATEUSER = gql`
mutation CreateUser($input: CreateUserInput){
  createUser(user: $input){
    id
		username
  }
}
`;

export const DELETEREVIEW = gql`
mutation DeleteReview($id: ID!){
  deleteReview(id: $id)
}
`;