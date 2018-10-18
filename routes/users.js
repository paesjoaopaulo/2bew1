var express = require('express');
var DefaultController = require('../controllers/DefaultController');
const controller = new DefaultController();

var router = express.Router();

router.get('/register', function (req, res, next) {
    controller.register(req, res);
});

router.post('/register', function (req, res, next) {
    controller.doRegister(req, res);
});

router.get('/login', function (req, res, next) {
    controller.login(req, res);
});

router.post('/login', function (req, res, next) {
    controller.doLogin(req, res);
});

module.exports = router;
