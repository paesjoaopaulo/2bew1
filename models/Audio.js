let Model = require('./Model');

module.exports = class Audio extends Model {

    constructor(data) {
        super(data);
        this.titulo = data.titulo;
        this.descricao = data.descricao;
        this.path = data.path;
        this._id = data._id;
        this.collection = 'audios';
    }

    static find(query = {}, limit = 1000) {
        return super.find(query, {titulo: 1}, limit, 'audios').then((result) => {
            return result.map((a) => new Audio(a))
        });
    }
};