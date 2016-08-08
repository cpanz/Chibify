'use strict';

const 
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express();

// ROUTES
const routes = require('./routes/index');

// MODELS
const Link = require('./models/link');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Mongodb configuration
const options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};

try {
  var config = require('./env.json');
} 
catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
        console.log("CANNOT LOAD env.json");
    }
}

const mongoUri = process.env.MONGODB_URI || config.MONGODB_URI;
mongoose.connect(mongoUri, options);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port 3000');
});

