import { gql } from '@apollo/client';


// Define a GraphQL query called GET_ME using the gql tag
// This query will be used to fetch the current user's data
export const GET_ME = gql` #graphql
  # this is the description of the query
  query me {
    me { # This is a query named 'me'
      _id        # Fetch the unique identifier for the user
      username   # Fetch the username of the user
      email      # Fetch the email address of the user
      bookCount  # Fetch the count of books saved by the user

      # Fetch the saved books for the user
      savedBooks {
        _id    # Fetch the unique identifier for each saved book
        title  # Fetch the title of each saved book
      }
    }
  }
`;
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
