const express = require('express');
const groceryList = require('./groceryList');
const groceryDetails = require('./groceryDetails');
const groceryDelete = require('./groceryDelete');
const groceryUpdate = require('./groceryUpdate');
const groceryAdd = require('./groceryAdd');

const groceryRouter = express.Router();

groceryRouter.get('/groceries', groceryList);
groceryRouter.patch('/groceries', groceryUpdate);
groceryRouter.post('/groceries', groceryAdd);
groceryRouter.get('/groceries/:id', groceryDetails);
groceryRouter.delete('/groceries/:id', groceryDelete);

module.exports = groceryRouter;
