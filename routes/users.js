var express = require('express');
var DefaultController = require('../controllers/DefaultController');
const controller = new DefaultController();

var router = express.Router();

router.get('/register', function (req, res, next) {
    controller.register(req, res, next);
});

router.post('/register', function (req, res, next) {
    controller.doRegister(req, res, next);
});

router.get('/login', function (req, res, next) {
    controller.login(req, res, next);
});

router.post('/login', function (req, res, next) {
    controller.doLogin(req, res, next);
});

router.get('/logout', function (req, res, next) {
    controller.logout(req, res, next);
});

module.exports = router;
