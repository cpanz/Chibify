'use strict';

const
  router = require('express')(),
  shortid = require('shortid');

const Link = require('../models/link');

function addHttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

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
  let hash = shortid.generate();
  
  let link = new Link({
    shortUrl: req.protocol + '://' + req.get('host') + '/' + hash,
    url: addHttp(req.body.url),
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