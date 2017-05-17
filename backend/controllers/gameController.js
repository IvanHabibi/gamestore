var method = {}
var Game = require("../models/game");
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

method.getAllGame = (req, res, next) => {
  Game.find(function(err, games) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(games);
    }
  });
}

method.insertGame = (req, res, next) => {
  var game = new Game({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    platform: req.body.platform,
    type: req.body.type,
    img: req.body.img
  });
  game.save(function(err, createdGame) {
    if (err) {
      res.send(err);
    }
    res.send(createdGame);
  });
}

method.updateGame = (req, res, next) => {
  Game.findById(req.params.id, function(err, game) {
    // Handle any possible database errors
    if (err) {
      res.status(500).send(err);
    } else {

      game.name=req.body.name || game.name
      game.price=req.body.price || game.price
      game.stock=req.body.stock || game.stock
      game.platform=req.body.platform || game.platform
      game.type=req.body.type || game.type
      game.img=req.body.img || game.img

      Game.save(function(err, game) {
        if (err) {
          res.status(500).send(err)
        }
        res.send(game);
      });
    }
  });
}

method.deleteGame = (req, res, next) => {
  Game.findByIdAndRemove(req.params.id, function(err, game) {
    var response = {
      message: "game successfully deleted",
      id: game._id
    };
    res.send(response);
  });
}


method.getOneGame = (req, res, next) => {
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      res.send(err)
    }
    res.send(game)
  })
}





module.exports = method;
