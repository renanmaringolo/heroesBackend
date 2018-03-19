//// my project heroes ////
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');

var Hero = require('./app/models/hero');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 8080;
var router = express.Router();

router.use(function(req, res, next) {
    console.log('What did u do?');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'My Heroes' });
});

router.route('/heroes')
    .post(function(req, res) {
        var hero = new Hero()
        hero.name = req.body.name
        hero.save(function(err) {
            if (err)
                res.send(err)
            res.json({ message: 'Hero Added!' });
        })
    })

    .get(function(req, res) {
        Hero.find(function(err, heroes) {
            if (err)
                res.send(err);
            res.json(heroes);
        })
    });




router.route('/heroes/:hero_id')

    .get(function(req, res) {
        Hero.findById(req.params.bear_id, function(err, hero) {
            if (err)
                res.send(err);
            res.json(hero);
        })
    })

    .put(function(req, res) {
        Hero.findById(req.params.hero_id, function(err, hero) {
            if (err)
                res.send(err);
            hero.name = req.body.name;
            hero.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Hero updated!' })
            })
        })
    })
    
    .delete(function(req, res) {
        Hero.remove({
            _id: req.params.hero_id
        }, function(err, hero) {
            if (err)
                res.send(err);
            res.json({ message: 'Hero deleted!!' });
        });
    });
    

app.use('/list', router);

app.listen(port);
console.log('Tour of Heroes ' + port);
