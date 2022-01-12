const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statSchema = new Schema({
    game: { type: String, required: true },
    twoPoint: { type: Number, required: true },
    threePoint: { type: Number, required: true },
    freeThrow: { type: Number, required: true },
    rebound: { type: Number, required: true },
    assist: { type: Number, required: true },
    steal: { type: Number, required: true },
    mvp: { type: String, required: true },
    
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;