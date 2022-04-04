import User from '../models/user.js'

export async function loginUser(req, res) {
    try {
      console.log("Logging In")
      const user = await User.findByCredentials(req.body.email, req.body.password);
      console.log(user);
      const token = await user.generateAuthToken();
      res.json({ user, token });
    } catch (err) {
      res.status(400).send();
    }
  };
  
  export async function getSelf(req, res) {
    try {
      const user = await User.findById(req.user._id);
      res.json(user);
    } catch (err) {
      res.status(400).send();
    }
  }
  
  export async function registerUser(req, res) {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (err) {
      res.status(400).json({ message:'Error'+err });
    }
  };