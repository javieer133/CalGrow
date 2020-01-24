
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const apiField = require("./app/api/field");
const apiFruit = require("./app/api/fruit");
const apiMeasurement = require("./app/api/measurement");
const apiMean = require("./app/api/mean");
const apiPlant = require("./app/api/plant");
const apiSector = require("./app/api/sector");
const apiSpecie = require("./app/api/specie");
const apiVariety = require("./app/api/variety");

const app = express();
app.use(bodyParser.json());
app.use(express.static("app/public"));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

apiField(app, db);
apiFruit(app, db);
apiMeasurement(app, db);
apiMean(app, db);
apiPlant(app, db);
apiSector(app, db);
apiSpecie(app, db);
apiVariety(app, db);

db.sequelize.sync().then(() => {
  app.listen(3002, () => console.log("App listening on port 3002!"));
});