const routes = require('express').Router();
const activities = require('./activities.json');
const appInsights = require('applicationinsights');

routes.get('/', (req, res) => {
  res.status(200).json(activities);
});

routes.post('/', (req, res) => {
  var activity = req.body;

  try {
    if (activity.date.length > 17) {
      throw new Error(`Date value:  '${activity.date}' is too long`);
    }
  } catch (ex) {
    client = appInsights.defaultClient;
    client.trackException({exception: ex});
   
    activity.date = activity.date.substring(0,17);
  }

  var maxId = 1;

  if (!activity.id) {
    for (item in activities) {
      if (activities[item].id > maxId) {
        maxId = activities[item].id;
      }
    }
  }
  activity.id = maxId + 1;
  activities.push(activity);

  res.status(201).json(activity);
});

routes.delete('/:id', (req, res) => {
  var id = req.params.id;
  var index = activities.findIndex(activity => activity.id === id);
  activities.splice(index, 1);
  res.sendStatus(204);
});

module.exports = routes;
