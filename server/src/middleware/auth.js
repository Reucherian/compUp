import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export default async function auth(req, res, next){
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: decoded._id })
        req.token = token
        req.user = user
        next()
    } catch(err){
        res.status(401).json({
            message: 'Please authenticate'
        })
    }
};