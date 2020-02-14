const express = require('express');
const categoryList = require('./categoryList');
const categoryGroceries = require('./categoryGroceries');

const categoryRouter = express.Router();

categoryRouter.get('/categories', categoryList);
categoryRouter.get('/categories/:id', categoryGroceries);

module.exports = categoryRouter;
