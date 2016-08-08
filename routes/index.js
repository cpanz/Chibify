'use strict';

const router = require('express')();

const
  Link = require('../models/link'),
  generateHash = require('../hash');

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';


router.get('/', (req, res) => {
  res.sendFile('index');
});

router.get('/:hash', (req, res) => {
  let query = {'shortUrl': baseUrl + '/' + req.params.hash};
  Link.findOne(query, (err, result) => {
    if (err) throw err;
    else if (result) {
      console.log(result);
      res.redirect(result.url);
    } else {
      res.sendFile('404');
    }
  });
});

router.post('/new', (req, res) => {
  let hash = generateHash();

  let link = new Link({
    shortUrl: baseUrl + '/' + hash,
    url: req.body.url,
    createdAt: new Date()
  });

  link.save((err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });

});

module.exports = router;