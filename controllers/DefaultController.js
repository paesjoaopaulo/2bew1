let Controller = require('./Controller');

let User = require('../models/User');

module.exports = class DefaultController extends Controller {

    login(req, res, next) {
        res.render('auth/login', {title: 'Entrar'});
    }

    doLogin(req, res, next) {
        let body = req.body;
        User.find({login: body.login, password: body.password}).then((user) => {
            if (user.length == 1) {
                req.session.login = user;
                res.redirect("/audios");
                res.end();
            } else {
                res.status(403);
                res.render("auth/login", {error: "Credenciais inválidas", title: "Fazer login"});
            }
        })
    }

    register(req, res, next) {
        res.render('auth/register', {title: 'Registrar'});
    }

    doRegister(req, res, next) {
        let body = req.body;
        
        let errors = [];
        if (body.name.length < 3) {
            errors['name'] = 'Nome inválido'
        }

        if (body.password != body.password_confirm) {
            errors['password'] = 'As senhas não são iguais'
        }

        let userWithSameMail = User.find({login: body.login}).then((user) => {
            res.render('auth/register', {error: "Já existe um usuário com o mesmo login.", title: "Registrar"});
        })

        let user = new User(body).save().then((user) => {
            res.send(user);
        })
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/users/login')
        res.end();
    }
};