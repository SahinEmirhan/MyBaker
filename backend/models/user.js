var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: String,
    hash: String,
    salt: String,
    userType: { type: String, enum: ['Restaurant', 'Person'] },
});


module.exports = mongoose.model('User', UserSchema);