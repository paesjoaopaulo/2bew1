let Controller = require('./Controller');
var Audio = require('../models/Audio');

module.exports = class AudiosController extends Controller {

    /**
     * Lista todos os áudios cadastrados
     * @param req
     * @param res
     */
    index(req, res, next) {
        let params = req.query;
        let filter = {};
        if (typeof params.query != 'undefined') {
            filter =
                {
                    $or: [
                        {titulo: new RegExp(params.query, "i")},
                        {descricao: new RegExp(params.query, "i")}
                    ]
                }
        }
        Audio.find(filter).then((audios) => {
            res.render('audios/index', {title: 'Todos os áudios', audios, params});
        });
    }

    create(req, res, next) {
        res.render('audios/create', {title: 'New audio'});
    }

    store(req, res, next) {
        let body = req.body;
        let audio = new Audio({
            titulo: body.titulo,
            descricao: body.descricao,
            path: req.file.filename
        }).save().then((audio) => {
            res.send(audio);
        });
    }

    /* Daqui pra baixo não foi preciso implementar no projeto 1 */
    show(req, res, next) {
        Audio.find({id: req.params.id}).then((audio) => {
            res.send("audios/show", {audio});
        })
    }

    edit(req, res, next) {
        Audio.find({id: req.params.id}).then((audio) => {
            res.send("audios/edit", {audio});
        })
    }

    update(req, res, next) {
        Audio.find().then((audio) => {
            res.send(audio);
            console.log(audio);
        });
    }

    destroy(req, res, next) {
        Audio.find({id: req.params.id}).then((audio) => {
            audio.delete();
        })
    }
};