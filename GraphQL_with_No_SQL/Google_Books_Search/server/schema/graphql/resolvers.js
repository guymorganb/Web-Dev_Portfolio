
const User = require('../../models/User');
const { signToken } = require('../../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
/**
 * Resolvers: 
 * These are functions that handle the business logic for each query and mutation they are the equivalent to the controllers from RestAPI. 
 * They interact with the database and return the data in the shape defined in your GraphQL schema.
 */

const resolvers = {
    Query: { // underline represents the parent
        me: async (_, args, context ) => {
          try {  
            // console.log("Looking for user with ID:", context.user._id);                 
            const user = await User.findOne({_id: context.user._id  });  // grabbing the info from inside the JWT
            // console.log("Found user:", user);
            return user;

          } catch (error) {
            throw new Error(`User not found: ${error.message}`);
          }
        },
    },
    Mutation: {
      // The function takes three arguments: _ (an unused placeholder for the "root" object, which is typically not used in a mutation), { email, password } (the actual variables we're interested in), and context (which can provide additional information, like authentication state).
      loginUser : async (_, { email, password },  context) => {
       
          const user  = await User.findOne({ email});

          if (!user) {
            throw new AuthenticationError('No profile with this email found!');
          }
          // const correctPw = await user.isCorrectPassword(password);: Checks if the password is correct. This is internal business logic, like you might have in a REST API.
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
          // const token = signToken(user);: Generates a JWT token for the user. Similar to creating a session in REST.
          const token = signToken(user);

          // return { token, user };: Returns an object containing the token and user data. This corresponds to the Auth type in your typeDefs.
          return { token, user };

      },
  
      createUser : async(_, { username, email, password }) => {
        try {
          const user= await User.create({username, email, password });

          const token = signToken(user);
          return { token, user };

        } catch (error) {
          throw new AuthenticationError(`User creation failed: ${error.message}`);
        }
      },
  
      saveBook: async (_, { book }, context) => {
        try {                                                     // we are going into the saved books array inside User and adding the book
          const user= await User.findOneAndUpdate({_id: context.user._id}, {$addToSet:{savedBooks:book}}, {new: true});
          // return user because mutation is expecting it
         return user;

        } catch (error) {
          throw new AuthenticationError(`Book saving failed: ${error.message}`);
        }
      },
  
      removeBook: async (_, { bookId }, context) => {
        try {
          console.log("Looking for user with ID:", context.user._id);
      
          const user = await User.findById(context.user._id);
      
          if (!user) {
            throw new AuthenticationError("User not found");
          }
      
          console.log("Looking for book with ID:", bookId);
      
          user.savedBooks = user.savedBooks.filter(book => {
            console.log(`Comparing database ObjectId: ${book._id} with input bookId: ${bookId}`);
            return book._id.toString() !== bookId;
          });
      
          await user.save();
      
          console.log("user.savedBooks", user.savedBooks);
          return user;
      
        } catch (error) {
          console.log(`Book removal failed: ${error.message}`);
          throw new AuthenticationError(`Book removal failed: ${error.message}`);
        }
      },      
    },
};

module.exports = resolvers;