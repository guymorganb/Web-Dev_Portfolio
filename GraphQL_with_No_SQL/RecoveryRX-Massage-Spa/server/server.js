import express  from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import typeDefs from './schema/typeDefs.js'
import resolvers from './schema/resolvers.js'
import connectDB from './config/connection.js'
import seedDatabase from './config/seeds.js'; 
import emailjs from '@emailjs/nodejs';
import mongoose from 'mongoose'
import { auth } from "./utils/authenticate.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({
  path: '.env'
});



const app = express();
const PORT = process.env.PORT || 3001

// setting for apollo server
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    persistedQueries: false,
    cache: 'bounded',
    context: auth, //sets the context so the auth middleware
  });
  // print the mongoose db queries for logging/debugging
  mongoose.set('debug', true);

  // Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
    try {
        // Connect to MongoDB
      await connectDB();
   
      if (process.env.NODE_ENV !== 'production') {
        await seedDatabase(); 
      }
        // Apollo Server setup
      await server.start();
      server.applyMiddleware({ app });

      app.post('/api', (req, res) => {
        console.info('Get was used');
        console.log('This email will be contact: ' + req.body.email);
        const templateParams = {
          email: req.body.email,
        };
        console.log(process.env.EMAILJS_PUBLIC);

        emailjs
          .send('service_7098943', 'template_5grsipc', templateParams, {
            publicKey: process.env.EMAILJS_PUBLIC,
            privateKey: process.env.EMAILJS_PRIVATE, // optional, highly recommended for security reasons
          })
          .then(
            (response) => {
              console.log('SUCCESS!', response.status, response.text);
            },
            (err) => {
              console.log('FAILED...', err);
            },
          );
        res.json({message: 'Everything went okay'});
      });
        console.log("env" + process.env.NODE_ENV)
        
      // Serve static assets in production
      if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
        
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });

      }

      
      // Start the server
      app.listen(PORT, () => {
        console.log(`Express server running on port 🔑 ${PORT}!`);
        console.log(`Use GraphQL at ⭐ http://localhost:${PORT}${server.graphqlPath}`);
      });
      
    } catch (error) {
      console.error('Error during server startup:', error);
    }
  })();