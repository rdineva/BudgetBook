// import * as express from 'express';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import budget from './routes/budget';
import user from './routes/user';
import { Request, Response } from 'express-serve-static-core';
import { IGetUserAuthInfoRequest } from './userRequest';
import root from './routes/root';

var express = require('express');
var Strategy = require('passport-local').Strategy;
var passport = require('passport');
var bodyParser = require('body-parser');

import cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/', root);
app.use('/users', user);
app.use('/budgets', budget);

// const user = express.Router({ mergeParams: true });

// const getuserController = (req: Request, res: Response, next: () => void): void => {
//   const { connection } = res.locals;
//   const userController = new UserController(connection);
//   res.locals.userController = userController;
//   next();
// };

// user.use(getConnection);
// user.use(getuserController);

// passport.use(new Strategy(
//   function(username, password, cb) {
//   app.userController.findByUsername(username);
//   ));

passport.use(new Strategy(
  function(username, password, cb) {
    app.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  app.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
  function(req: IGetUserAuthInfoRequest, res: Response) {
    res.render('home', { user: req.user });
  });

app.get('/register', 
  function(req: Request, res: Response) {
    console.log(req.body)
  }
  );

app.post('/register', 
  passport.authenticate('local', { failureRedirect: '/register' }),
  function(req: Request, res: Response) {
    console.log(req.body)
  });

app.get('/login',
  function(req: IGetUserAuthInfoRequest, res: Response){
    res.render('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req: IGetUserAuthInfoRequest, res: Response) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req: IGetUserAuthInfoRequest, res: Response){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req: IGetUserAuthInfoRequest, res: Response){
    res.render('profile', { user: req.user });
  });

// app.listen(3000);

createConnection().then(() => {
  console.log('database connection successful');
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});