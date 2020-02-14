const express = require('express');
const groceryList = require('./groceryList.js');
const groceryDetails = require('./groceryDetails.js');
const groceryDelete = require('./groceryDelete.js');
const groceryUpdate = require('./groceryUpdate.js');
const groceryAdd = require('./groceryAdd.js');

const groceryRouter = express.Router();

groceryRouter.get('/groceries', groceryList);
groceryRouter.get('/groceries/:id', groceryDetails);
groceryRouter.delete('/groceries/:id', groceryDelete);
groceryRouter.patch('/groceries/:id', groceryUpdate);
groceryRouter.post('/groceries', groceryAdd);

module.exports = groceryRouter;
