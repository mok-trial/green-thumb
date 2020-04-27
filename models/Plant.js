const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: String,
  notes: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;