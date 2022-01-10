const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;