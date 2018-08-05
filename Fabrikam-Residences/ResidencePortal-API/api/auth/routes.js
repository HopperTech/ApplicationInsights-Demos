const routes = require('express').Router();
const users = require('./users.js');

const appInsights = require('applicationinsights');

routes.post('/login', (req, res) => {
    var username = req.body.username;
    const fndUser = users.find(user => user.username === username);
    
    if (fndUser)
    {
        delete fndUser['password'];
        res.status(200).json(fndUser);
    } else {
        client = appInsights.defaultClient;
        client.trackTrace({message: `Invalid login attempt: ${username}`, severity: appInsights.Contracts.SeverityLevel.Error});
        res.sendStatus(404);
    }
});

module.exports = routes;
