const express = require('express');
const unitList = require('./unitList');

const unitRouter = express.Router();

unitRouter.get('/units', unitList);

module.exports = unitRouter;
