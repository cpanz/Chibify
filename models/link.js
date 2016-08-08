const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const linkSchema = new Schema({
  url: String,
  shortUrl: String,
  createdAt: Date
});

module.exports = mongoose.model('Link', linkSchema)