const express = require('express');
const locationList = require('./locationList');
const locationGroceries = require('./locationGroceries');
const locationDelete = require('./locationDelete');
const locationAdd = require('./locationAdd');
const locationUpdate = require('./locationUpdate');

const locationRouter = express.Router();

locationRouter.get('/locations', locationList);
locationRouter.post('/locations', locationAdd);
locationRouter.patch('/locations', locationUpdate);
locationRouter.get('/locations/:id', locationGroceries);
locationRouter.delete('/locations/:id', locationDelete);

module.exports = locationRouter;
