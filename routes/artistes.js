var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/export', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});
/*
 * POST an artist.
 */
router.post('/', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        var info = { type: "artist" };
        var artist = { href: "https://api.monsite.com/artistes/" + Math.round(Math.random()*99999) + 1, name: req.body.nom, nb_album: req.body.nb_album };
        var json = JSON.stringify({ 
          info: info, 
          artist: artist
        });
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(json);
        /*res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );*/
    });
})
/*
 * GET an artist 
 */
router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.findOne({'_id' : req.params.id}, function (err, doc) {
      if(err) return done(err);
      var json = JSON.stringify({ 
        artist: doc
      });
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      var ecart = new Date().getTime() - global.timeBegin.getTime();
      res.send(json + " Ecart : " + ecart);

    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: 'artist supprimé' } : { msg:'error: ' + err });
    });
});

/*
 * GET all artist.
 */
router.get('/', function(resq, res) {

var json = JSON.stringify({
 "href": "https://api.monsite.com/recherche/artistes?q=U2", 
 "info": {
    "num_results": 3,
    "limit": 100,
    "offset": 0,
    "query": "U2",
    "type": "artist",
    "page": 1
  },
  "artists": [
    {
      "href": "https://api.monsite.com/artistes/15",
      "name": "U2",
      "genres" : [ "rock", "indie pop" ],
      "nb_album" : 13,
      "popularity": "0.76"
    },
    {
      "href": "https://api.monsite.com/artistes/1922",
      "name": "U2kushi",
      "genres" : [ "electro" ],
      "nb_album" : 1,
      "popularity": "0.12"
    },
    {
      "href": "https://api.monsite.com/artistes/623",
      "name": "U2R",
      "genres" : [ "new wave" ],
      "nb_album" : 1,
      "popularity": "0.41"
    },
  ]
});
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
});



module.exports = router;
