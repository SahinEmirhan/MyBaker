var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    
var RestaurantSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    address: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


module.exports = mongoose.model('Restaurant', RestaurantSchema);