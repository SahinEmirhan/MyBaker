var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    
var ProductSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    stock: Number,
    ownedBy: { 
        id: {type: Schema.Types.ObjectId, ref: 'User'},
        name: String,
        city: String
     },

    purchased: [
        {
            purchasedBy:{ type: Schema.Types.ObjectId, ref: 'User'},
            code: Number,
            status: { type: String, enum: ['Purchased', 'Delivered'] },
            comment: Boolean
        }
    ],
    fileName: String
});


module.exports = mongoose.model('Product', ProductSchema);