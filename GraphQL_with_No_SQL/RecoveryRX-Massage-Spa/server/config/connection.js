import { config } from "dotenv";
import mongoose from "mongoose";

config({
  path: '.env'
});

const connectDB = async () => {
    try {
// console.log(process.env)
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log(`💻 Connected to MongoDB`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;