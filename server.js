// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Stat = require('./models/stats.js')
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




const statsSeed = require('./models/statsSeed.js')


app.get('/', (req, res) => {
    res.redirect('/stats');
});

app.get('/stats/seed', (req, res) => {
    Stat.deleteMany({}, (err, foundStats) => {});
    Stat.create(statsSeed, (err, data) => {
        res.redirect('/stats');

    })
});


// INDEX
app.get('/stats', (req, res) => {
    Stat.find({}, (err, foundStats) => {
        res.render('index.ejs', {
           stat: foundStats
        });
    });
});
// NEW
app.get('/stats/new', (req, res) => {
    res.render('new.ejs');
});
// UPDATE
app.put('/stats/:id/', (req, res) => {
    Stat.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err, updateStat) => {
        res.redirect(`/stats/${req.params.id}`)
        }
    )
});
// CREATE
app.post('/stats', (req, res) => {
    console.log(req.body)
    Stat.create(req.body, (err, createdStat) => {
        res.redirect('/stats');
       
    });
});

// EDIT
app.get('/stats/:id/edit', (req, res) => {
    Stat.findById(req.params.id, (err, foundStats) => {
        res.render('edit.ejs', {
            stat: foundStats
        });
    });
});

// SHOW
app.get('/stats/:id', (req, res) => {
    Stat.findById(req.params.id, (err, foundStats) => {
        console.log(foundStats)
        res.render('show.ejs', {
            stat: foundStats
        });
    });
});








const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));