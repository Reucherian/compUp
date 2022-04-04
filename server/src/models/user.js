import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;
const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required:true,
        trim: true,
        lowercase: true,
        validate (value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    pictureUri:{
        type: String,
        required: true,
        trim: true,
        validate (value) {
            if(!validator.isURL(value)){
                throw new Error('Picture URL is not valid')
            }
        }
    }
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  };
  
  userSchema.methods.generateAuthToken = async function () {
    const user = this;
    console.log(process.env.SECRET)
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);
    return token;
  };
  
  userSchema.statics.findByCredentials = async (email, password) => {
      console.log("Entered here");
      console.log(email);
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new Error('Unable to login');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Unable to login');
      }
      return user;
    
  };
  
  // Hash the plain text password before saving
  userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });

const User = mongoose.model('user', userSchema);

export default User;