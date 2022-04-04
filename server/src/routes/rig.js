import express from 'express';
import * as rigController from '../controller/rig.js';
import auth from '../middleware/auth.js'


const { Router } = express;
const route = Router();


export default ({app}) => {
    app.use('/rig',route);
    route.get('/',auth,rigController.getRigs);
    route.get('/:id/',auth,rigController.getRig);
    route.post('/',auth, rigController.addRig);
    route.delete('/:id/',auth,rigController.removeRig);
    route.patch('/upVote/:id/:userId',auth,rigController.upVote);
    route.patch('/downVote/:id/:userId',auth,rigController.downVote);
    route.get('/isUpVote/:id/:userId',auth,rigController.isUpVote);
    route.get('/isDownVote/:id/:userId',auth,rigController.isDownVote);
    route.patch('/item/:id/',auth,rigController.addItem);
    route.get('/buy/:id',rigController.buyRig);
};
