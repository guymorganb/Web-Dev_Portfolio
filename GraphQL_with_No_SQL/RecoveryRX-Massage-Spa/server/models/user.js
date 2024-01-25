import {Schema, model} from "mongoose"
import bcrypt from "bcrypt"
import mongoose from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
      }
})

// hash user password (for new users MVP will have a password already set)
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  // creating a custom method to compare and validate password for logging in
  userSchema.methods.isPasswordCorrect = async function (password) {
    // . method allows for adding instance methods into the mongoose schema
    return bcrypt.compare(password, this.password);
  };

  const User = mongoose.model('User', userSchema);

export default User