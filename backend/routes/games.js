var express = require('express');
var router = express.Router();
const util = require('../helpers/util');
const gameController = require('../controllers/gameController');
const passport = require('passport');

/* GET users listing. */

router.get('/', gameController.getAllGame)
router.get('/:id', gameController.getOneGame)
router.post('/', gameController.insertGame)
router.put('/:id', gameController.updateGame)
router.delete('/:id', gameController.deleteGame)



module.exports = router;
