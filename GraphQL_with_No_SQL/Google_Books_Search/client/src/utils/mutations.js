import { gql } from '@apollo/client';

// these naming conventions should match your resolvers
// because these talk to the resolvers through Apollo server

// LOGIN_USER called from client side React UI
export const LOGIN_USER = gql`#graphql
# the declaration of a new mutation
  mutation loginUser($email: String!, $password: String!) { # for desciprion purposes
    # loginUser is whats returned to the front end
   
    loginUser(email: $email, password: $password) {  # Now calling the back-end mutation loginUser on the server and passing the variables
      # client is asking for the token feild from the returned Auth Object as defined in the typeDefs
      token
      # client is asking for the nested user field within the Auth object.
      user {
        _id
        username
        email
      }
    }
  }
`;
// CREATE_USER called in React
export const CREATE_USER = gql`#graphql
# the declaration of a new mutation
  mutation createUser($username: String!, $email: String!, $password: String!) {
    # Now the mutation createUser is called serverside
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
// Save_BOOK called in React
export const SAVE_BOOK = gql`
# declaration of the saveBook mutation on the clientside
  mutation saveBook($book: SavedBook!) {
    #now calling the saveBook mutation on the serverside
    saveBook(book: $book) {
      # asking for the _id feild from the returned User object as defined in the typeDefs
      _id
      savedBooks {
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`#graphql
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId){
        _id
        savedBooks{
            title
        }
    }
}`
