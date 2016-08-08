'use strict';

const router = require('express')();

const
  Link = require('../models/link'),
  generateHash = require('../hash');

router.get('/', (req, res) => {
  console.log(req.get('host'));
  res.render('index');
});

router.get('/:hash', (req, res) => {
  let query = {'shortUrl': req.protocol + '://' + req.get('host') + '/' + req.params.hash};
  Link.findOne(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else if (result) {
      console.log(result);
      res.redirect(result.url);
    } else {
      res.render('404');
    }
  });
});

router.post('/new', (req, res) => {
  let hash = generateHash();

  let link = new Link({
    shortUrl: req.protocol + '://' + req.get('host') + '/' + hash,
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