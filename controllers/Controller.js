module.exports = class Controller {
    
    constructor(userLoggedIn){
        this.userLoggedIn = userLoggedIn;
    }

    checkAuth(req, res, next) {
        if (req.session && req.session.login && req.session.login != null) {
            return true;
        } else {
            res.redirect('/users/login');
            res.end();
        }
    }
    
};