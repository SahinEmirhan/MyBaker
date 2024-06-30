var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    
var CommentSchema = new Schema({
    name: String,
    surname: String,
    comment: String,
    star: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: {type: Schema.Types.ObjectId, ref: 'Product'}
});


module.exports = mongoose.model('Comment', CommentSchema);