import express from 'express';
import item from './item.js'
import rig from './rig.js'
import user from './user.js'
const { Router } = express;

// new routes will be added here

export default () => {
    const app = Router();
    item({app});
    rig({app});
    user({app});
    return app;
}