const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  plantCollection: [{
    type: Schema.Types.ObjectId,
    ref: 'UserPlant'
  }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
