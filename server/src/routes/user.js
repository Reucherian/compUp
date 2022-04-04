import express from 'express';
import * as userController from '../controller/user.js';
import auth from '../middleware/auth.js'

const { Router } = express;
const route = Router();


export default ({app}) => {
    app.use('/user',route);
    route.post('/login', userController.loginUser);
    route.post('/register', userController.registerUser);
    route.get('/', auth, userController.getSelf);
};
