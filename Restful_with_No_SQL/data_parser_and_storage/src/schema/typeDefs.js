/**
 * GraphQL typeDef schema
 */

const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers/resolvers');

const typeDefs = `
  type File {
    fileName: String!
    code: String!
  }

  type Category {
    name: String!
    files: [File]!
  }

  type Query {
    codeFiles: [File]!
    categories: [Category]!
    category(name: String!): Category
    file(name: String!, fileName: String!): File
    codeFile(id: ID!): File
  }

  type Mutation {
    createCodeFile(input: CodeFileInput!, categoryName: String!): File!
    updateCodeFile(id: ID!, input: CodeFileInput!): File!
    deleteCodeFile(id: ID!, categoryName: String!): File!
    createCategory(input: CategoryInput!): Category!
  }

  input CodeFileInput {
    fileName: String!
    code: String!
  }

  input CategoryInput {
    name: String!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;


