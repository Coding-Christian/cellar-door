const express = require('express');
const locationList = require('./locationList');
const locationGroceries = require('./locationGroceries');
const locationDelete = require('./locationDelete');
const locationAdd = require('./locationAdd');

const locationRouter = express.Router();

locationRouter.get('/locations', locationList);
locationRouter.post('/locations', locationAdd);
locationRouter.get('/locations/:id', locationGroceries);
locationRouter.delete('/location/:id', locationDelete);

module.exports = locationRouter;
