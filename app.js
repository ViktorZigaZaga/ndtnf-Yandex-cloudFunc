const express = require('express');
const serverless = require('serverless-http');
const rootRouter = require('./routers/router');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', rootRouter);

const PORT = process.env.PORT || 3000;
try {
    mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => {
        console.log(`server start http://localhost:${PORT}`);
    });
} catch (e) {
    console.error(e);
}

const handler = serverless(app);
module.exports.handler = async (event, context) => {
    mongoose.connect(process.env.DB_URL);
    return await handler(event, context);
};