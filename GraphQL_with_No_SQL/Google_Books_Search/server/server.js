// Third-party imports
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();
const { typeDefs, resolvers } = require('./schema');
const connectDB = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001; // express takes a port, and Apollo take the other
// setting for apollo server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  persistedQueries: false,
  cache: 'bounded',
  context: authMiddleware, //sets the context so the auth middleware
});

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

(async () => {
  try {
      // Connect to MongoDB
    await connectDB();
    
      // Apollo Server setup
    await server.start();
    server.applyMiddleware({ app });
      
    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
      
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
      });
    }

    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Express server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
    
  } catch (error) {
    console.error('Error during server startup:', error);
  }
})();
// Flow of GraphQL API the return trip from the Database is the same flow
// just backwards
/**
 * 
User(makes request to single GraphQL "endpoint")
   |
   v
Apollo Server (parses request, validates against typeDefs)
   |
   v
Resolvers (receive routed request, execute business logic or delegate to controllers)
   |
   v
user-controller (receives function call from resolvers)
   |
   v
Model (interacts with database, executes CRUD operations)

 */