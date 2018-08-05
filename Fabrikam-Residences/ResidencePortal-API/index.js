require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const appInsights = require('applicationinsights');
appInsights.setup(); //Requires APPINSIGHTS_INSTRUMENTATIONKEY to be declared in the environment
const key = appInsights.defaultClient.context.keys.cloudRole;
appInsights.defaultClient.context.tags[key] = "FabrikamResidences-API";
appInsights.start();

const root = './';
const port = process.env.PORT || '3000';
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
