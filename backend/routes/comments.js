const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Products = require('../models/product');
const Person = require('../models/person');
const Comment = require('../models/comments');

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());


commentRouter.route('/:productId')
.get(authenticate.verifyUser, async(req, res, next) => {

    try {
        const comments = await Comment.find({product: req.params.productId});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(comments);
    } catch(err) {
        next(err);
    }
    
})
.post(authenticate.verifyUser, authenticate.isPerson, async (req, res, next) => {
    try{

        const product = await Products.findById(req.params.productId);
        const person = await Person.findOne({user: req.user._id});



        for(const i in product.purchased) {
            if(product.purchased[i].purchasedBy.toString() === req.user._id.toString() && product.purchased[i].comment === false){

                product.purchased[i].comment = true;
                await product.save();
                req.body.user  = req.user._id;
                req.body.product = req.params.productId;
                req.body.name = person.name;
                req.body.surname = person.surname
                const comment = await Comment.create(req.body);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(comment);
                return;
            } 
        }

        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.json({message: 'not Found'});

    } catch(err) {
        next(err);
    }
})

module.exports = commentRouter;