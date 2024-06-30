var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    
var PersonSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    surname: String,
    address: String,
    phone: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


module.exports = mongoose.model('Person', PersonSchema);