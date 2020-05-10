let express = require('express');

let router = express.Router();

let burger = require('../models/burger.js');

router.get('/', function(req, res){
    burger.selectAll(function(data){
        let hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', function(req, res){
    burger.insertOne([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        res.json({ id: result.insertId});
    });
});

router.put('/api/burgers/:id', function(req, res){
    let condition = 'id = ' + req.params.id;

    console.log('condition ' + condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(results){
        if (results.changedRows == 0){
            return res.status(404).end();
        }else {
            res.status(200).end();
        }
    });
});

module.exports = router;