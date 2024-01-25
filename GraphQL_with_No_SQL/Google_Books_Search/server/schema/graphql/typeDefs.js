const { gql } = require('@apollo/server');
// type defs are the graphql schema
/**
 * GraphQL Schema (typeDefs): 
 * Here you define what queries and mutations can be made against your API, 
 * as well as the shape of the data that's returned. 
 * This is a blueprint of all possible operations that a client can perform.
 * define what kinds of requests can be made. 
 * Think of them as a blueprint or schema for the API.
 */
const typeDefs = `#graphql
  # When we query 'books' the Book object is returned
  # these are the types of queries that are avaliable to be called
  type Query {
    # the me query returns the User object
    me: User
    
  }

  type Auth {
    token: String!
    user: User
  }

  # Mutations handle post/put/delete comparable ops from restful API
  type Mutation {
    # loginUser will accept these arguments and return an Auth object
    loginUser(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    # saveBook will take a string parameter and it will return a User Object
    saveBook(book: SavedBook!): User
    removeBook(bookId: String!): User
  }


  type Book {
    _id: ID
    authors: [String]
    description: String! # non-nullable feilds
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input SavedBook {
      authors: [String]
      description: String!
      bookId: String!
      image: String
      link: String
      title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
`;

module.exports = typeDefs;