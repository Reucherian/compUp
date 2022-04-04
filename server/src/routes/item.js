import express from 'express';
import * as itemController from '../controller/item.js';
import auth from '../middleware/auth.js'

const { Router } = express;
const route = Router();

export default ({app}) => {
    app.use('/item',route);
    route.get('/',auth,itemController.getItems);
    route.get('/:id',auth,itemController.getItem);
    route.post('/', auth,itemController.addItem);
    route.delete('/:id',auth,itemController.removeItem);
    route.get('/buyItem/:id',auth,itemController.buyItem);
};
