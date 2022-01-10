// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Player = require('./models/players.js')
const methodOverride = require('method-override');
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
    );


const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
// MIDDLEWARE
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));


const playersSeed = require('./models/playersSeed.js')

app.get('/', (req, res) => {
    res.redirect('/players');
});

app.get('/players/seed', (req, res) => {
    Player.deleteMany({}, (err, allPlayers) => {});
    Player.create(playersSeed, (err, data) => {
        res.redirect('/players');

    })
});


// INDEX
app.get('/players', (req, res) => {
    Player.find({}, (err, allPlayers) => {
        res.render('index.ejs', {
            player: allPlayers
        });
    });
});
// NEW
app.get('/players/new', (req, res) => {
    res.render('new.ejs');
});
// UPDATE
app.put('/players/:id/', (req, res) => {
    Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err, updatePlayer) => {
        res.redirect(`/players/${req.params.id}`)
        }
    )
});
// CREATE
app.post('/players', (req, res) => {
    Player.create(req.body, (err, createdPlayer) => {
        res.redirect('/players');
    });
});

// EDIT
app.get('/players/:id/eit', (req, res) => {
    Player.findById(req.params.id, (err, allPlayers) => {
        res.render('edit.ejs', {
            player: allPlayers
        });
    });
});

// SHOW
app.get('/players/:id', (req, res) => {
    Player.findById(req.params.id, (err, allPlayers) => {
        res.render('show.ejs', {
            player: allPlayers
        });
    });
});








const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));