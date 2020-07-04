//require all parts of program
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//make a variable named app to use express
const app = express();

//Mount all middleware that was installed
app.use(morgan('dev'));
app.use(cors());

//import playstore.js
const apps = require('./playstore.js');

//create endpoint
app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

    //require sort to be either by Rating or App
    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of Rating or App');
        };
    };

    //require genres to be from specified list of genres
    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card.');
        };
    };

    let results = apps.map(app => {
        return app;
    });

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    res.json(results);
});

//Listen on PORT 8000
app.listen(8000, () => {
    console.log('Server started on PORT 8000')
});