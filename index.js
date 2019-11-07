const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./admin/admin-client');
const producerRoute = require('./client/producer');
const consumerRoute = require('./client/consumer');

const app = express();
const expressWS = require('express-ws')(app);

//middleware
app.use(bodyParser.json());
app.use('/admin-client/create-topic',adminRoute);
app.use('/producer', producerRoute);
app.use('/consumer', consumerRoute);


app.listen(3000);