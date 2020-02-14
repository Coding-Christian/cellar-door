const express = require('express');
const groceryRouter = require('./routes/groceries/');
const locationRouter = require('./routes/locations/');
const categoryRouter = require('./routes/categories/');
const unitRouter = require('./routes/units/');

const server = express();
server.use(express.json());
server.use('/api', groceryRouter);
server.use('/api', locationRouter);
server.use('/api', categoryRouter);
server.use('/api', unitRouter);

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server listening on port 3001\n');
});
