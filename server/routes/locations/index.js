const express = require('express');
const locationList = require('./locationList');
const locationGroceries = require('./locationGroceries');

const locationRouter = express.Router();

locationRouter.get('/locations', locationList);
locationRouter.get('/locations/:id', locationGroceries);

module.exports = locationRouter;
