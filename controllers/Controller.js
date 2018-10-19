module.exports = class Controller {

    checkAuth(req, res, next) {
        if (req.session && req.session.login && req.session.login != null) {
            return true;
        } else {
            res.redirect('/users/login');
        }
    }
    
};