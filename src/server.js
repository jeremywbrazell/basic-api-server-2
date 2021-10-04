'use strict';

//3rd Party Dependencies (Modules)
const express = require('express');
const morgan = require('morgan');

const app = express();

//Error handlers, Routes, and our own modules
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const foodRoutes = require('./routes/food.js');
const clothesRoutes = require('./routes/clothes.js');

// Global Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(clothesRoutes);
app.use(foodRoutes);

// Error Handlers -- Need to be defined last!!
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the express app and start method

module.exports = {
    server: app,
    start: port => {
        if (!port) { throw new Error('Missing Port'); }
        app.listen(port, () => console.log(`Listening on port ${port}`));
    },
};