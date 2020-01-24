const express = require('express');
const bodyParser = require('body-parser');

const db = require("./models");
const appApi = require('./api.js');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '59aWvUB7JeEHDncgEYYkLmZj0xBIWN1W1tKsA3yIUjHDDjoRDT5fyoy4uJyRKbOVgcVvuOOdzi9dAr3PIZkmxb0zGtv4JME2v3ME6xuOnQ4sBQV9vXh53Gwidjfcywl';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

const app = express();
// initialize passport with express
app.use(passport.initialize());

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// initialize api configs
appApi(db, app, passport, jwtOptions)

// create table with user model
db.sequelize.sync()
  .then(() => {
    // start app
    app.listen(3000, function () {
      console.log('Express is running on port 3000 and 3002');
    });
  })
  .catch(err => console.log(err, 'oooh, did you enter wrong database credentials?'));

