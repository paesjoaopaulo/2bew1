let Model = require('./Model')

module.exports = class User extends Model {
    constructor(data) {
        super(data);
        this.name = data.name;
        this.login = data.login;
        this.password = data.password;
        this._id = data._id;
        this.collection = 'users';
    }
    
    static find(query = {}, limit = 5) {
        return super.find(query, { name: 1 }, limit, 'users').then((result) => {
            return result.map((u) => new User(u))
        });
    }

};