let Controller = require('./Controller');

let User = require('../models/User');

module.exports = class DefaultController extends Controller {

    login(req, res) {
        console.log(req.cookies.login)
        res.render('auth/login', {title: 'Entrar'});
    }

    doLogin(req, res) {
        let body = req.body;
        User.find({login: body.login, password: body.password}).then((user) => {
            if (user.length == 1) {
                req.session.login = user;
                res.redirect("/audios");
            } else {
                res.status(403);
                console.log("retornar mensagem de erro na view");
                res.render("auth/login", {error: "Credenciais inválidas", title: "Fazer login"});
            }
        })
    }

    register(req, res) {
        res.render('auth/register', {title: 'Registrar'});
    }

    doRegister(req, res) {
        let body = req.body;
        let user = new User(body).save().then((user) => {
            res.send(user);
            console.log(user);
        })
    }
};