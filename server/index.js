// const express = require("express");
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import expressApp from './src/express.js';

const startServer = async () => {
    dotenv.config();
    const app = express();
    // use the port specified in the environment variable otherwise fallback to port 3001
    const port = process.env.PORT || 3001;
    const url = 'mongodb://127.0.0.1/compup';
    mongoose.set('runValidators', true);
    mongoose.connect(url, {useNewUrlParser:true});
    const con = mongoose.connection;
    expressApp({ app });
    con.on('open', () => {
        console.log('Connected to the mongodb database ...');
    });
    app.listen(port, () => console.log(`Server started at port ${port}`))
    .on('error', () => {
        process.exit(1);
    });
}

startServer();