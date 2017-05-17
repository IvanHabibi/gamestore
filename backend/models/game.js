var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    name: String,
    price: String,
    stock: Number,
    platform: String,
    type: String,
    img: String
});

var Game = mongoose.model('games', gameSchema);

module.exports = Game;
