const routes = require('express').Router();
const activities = require('./activities/routes');
const auth = require('./auth/routes');

routes.use('/activities', activities);
routes.use('/auth', auth);

module.exports = routes;
