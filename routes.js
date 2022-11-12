const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');





router.get("/", homeController.getHome);
router.get("/register", homeController.getRegisterPage);
router.get('/login', homeController.getLogin);
router.get('/logout', homeController.logOut);
router.get("/book-list", connectEnsureLogin.ensureLoggedIn(), bookController.getBookList);
router.get("/books", connectEnsureLogin.ensureLoggedIn(), bookController.getBook);
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), homeController.getDashboard);
router.post("/books", connectEnsureLogin.ensureLoggedIn(), bookController.postBook);
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
  }),homeController.postLogin);
router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/dashboard',
    }),homeController.postLogin);


router.post('/register',homeController.postUser);

module.exports = router;
