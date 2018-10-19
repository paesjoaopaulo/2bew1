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
        if (body.login.length < 3) {
            errors['login'] = 'Login inválido'
        }
        if (body.password.length < 3) {
            errors['password'] = 'Senha curta'
        } else if (body.password != body.password_confirm) {
            errors['password'] = 'As senhas não são iguais'
        }
        User.find({login: body.login}).then((user) => {
            if (typeof user != 'undefined' && user.length > 0 || user._id) {
                errors['login'] = 'Já existe um usuário com esse login';
            }
        }).then(() => {
            if (Object.keys(errors).length == 0) {
                new User(body).save().then((user) => {
                    req.session.login = user;
                    res.redirect('/');
                })
            }
        });
        console.log(errors);
        res.render('auth/register', {errors, title: "Registrar"});
    }

    logout(req, res, next) {
        this.checkAuth(req, res, next);
        req.session.destroy();
        res.redirect('/users/login');

    }
};