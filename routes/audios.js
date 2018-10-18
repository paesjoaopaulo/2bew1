var express = require('express');
var router = express.Router();

var fileupload = require('../lib/file').upload;

var AudiosController = require('../controllers/AudiosController');
const controller = new AudiosController();

router.get('/', (req, res, next) => controller.index(req, res, next));
router.get('/create', (req, res, next) => controller.create(req, res, next));
router.post('/', fileupload.single('audio'), (req, res, next) => controller.store(req, res, next));
router.get('/:id/show', (req, res, next) => controller.show(req, res, next));
router.get('/:id/edit', (req, res, next) => controller.edit(req, res, next));
router.put('/:id', (req, res, next) => controller.update(req, res, next));
router.delete('/:id', (req, res, next) => controller.destroy(req, res, next));

module.exports = router;
