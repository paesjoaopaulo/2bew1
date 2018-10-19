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
        if (body.login.length < 5) {
            errors['login'] = 'Login inválido'
        }
        if (body.password.length < 5) {
            errors['password'] = 'Senha curta'
        } else if (body.password != body.password_confirm) {
            errors['password'] = 'As senhas não são iguais'
        }

        let userWithSameMail = User.find({login: body.login}).then((user) => {
            if (user.length > 0) {
                errors['login'] = 'Já existe um usuário com esse login';
                res.render('auth/register', {errors, title: "Registrar"});

            }
        });

        if (errors) {
            let user = new User(body).save().then((user) => {
                req.session.login = user;
                res.redirect('/audios');

            })
        }

        res.render('auth/register', {errors, title: "Registrar"});
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/users/login');

    }
};