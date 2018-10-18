let Controller = require('./Controller');
var Audio = require('../models/Audio');

module.exports = class AudiosController extends Controller {

    /**
     * Lista todos os áudios cadastrados
     * @param req
     * @param res
     */
    index(req, res, next) {
        this.checkAuth(req, res);

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
        this.checkAuth(req, res, next);
        console.log(req.cookies);
        res.render('audios/create', {title: 'New audio'});
    }

    store(req, res, next) {
        this.checkAuth(req, res, next);

        let body = req.body;
        let errors = [];

        let titulo = body.titulo;
        let descricao = body.descricao;
        let file = req.file;
        let path = "";

        if (file == undefined) {
            errors['audio'] = 'Obrigatório o envio do arquivo'
        } else {
            path = req.file.filename;
        }

        if (titulo == null || titulo.length < 3) {
            errors['titulo'] = 'Título inválido'
        }

        if (descricao == null || descricao.length < 6) {
            errors['descricao'] = 'Descrição inválida'
        }

        if (file && file.extension != 'mp3') {
            errors['descricao'] = 'Descrição inválida'
        }

        console.log(errors)

        if (errors != []) {
            res.render('auth/register', {title: 'Novo áudio', errors})
            next()
        }

        let audio = new Audio({titulo, descricao, path})
            .save()
            .then((audio) => {
                if (audio) {
                    res.redirect('/audios');
                }
            });
    }

    /* Daqui pra baixo não foi preciso implementar no projeto 1 */
    show(req, res, next) {
        Audio.find({id: req.params.id}).then((audio) => {
            res.send("audios/show", {audio});
        })
    }

    edit(req, res, next) {
        this.checkAuth(req, res, next);
        Audio.find({id: req.params.id}).then((audio) => {
            res.send("audios/edit", {audio});
        })
    }

    update(req, res, next) {
        this.checkAuth(req, res, next);
        Audio.find().then((audio) => {
            res.send(audio);
            console.log(audio);
        });
    }

    destroy(req, res, next) {
        this.checkAuth(req, res, next);
        Audio.find({id: req.params.id}).then((audio) => {
            audio.delete();
        })
    }
};