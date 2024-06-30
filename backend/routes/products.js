const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Products = require('../models/product');
const Restaurant = require('../models/restaurant');
const Person = require('../models/person');

const productRouter = express.Router();

productRouter.use(bodyParser.json());


productRouter.route('/')

.get(authenticate.verifyUser, async (req, res,  next) => {
    try{
        if(req.user.userType === 'Person') {
            const products = await Products.find({"purchased.purchasedBy": req.user._id});
            //const products = await Products.find({boughtBy: req.user._id})
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(products);
        } else {
            const products = await Products.find({"ownedBy.id": req.user._id}).populate('purchased.purchasedBy')
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(products);
        }
        

    } catch(err) 
    {
        next(err)
    }

})

.post(authenticate.verifyUser, authenticate.isRestaurant, async (req, res, next) => {
    try{
        

        const restaurant = await Restaurant.findOne({user: req.user._id});

        
        
        req.body.ownedBy = {
            id: req.user._id,
            name: restaurant.name,
            city: restaurant.city
        };
        
        const product = await Products.create(req.body);


        restaurant.products.push(product._id);
        
        await restaurant.save();

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(product);

    } catch(err) {
        console.log('here2')

        console.log(err)
        next(err)
    }
})


productRouter.route('/list')
.get(authenticate.verifyUser, async (req, res, next) => {
    try {
        const listedProducts = await Products.find({});
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(listedProducts);
    } catch(err) {
        next(err);
    }
})

productRouter.route('/:productId')

.get(authenticate.verifyUser, async (req, res,  next) => {
    try{
            const product = await Products.findById(req.params.productId);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(product);
        }
     catch(err) 
    {
        next(err)
    }
})

.post(authenticate.verifyUser, authenticate.isPerson, async (req, res, next) => { 
    try{

        const product = await Products.findById(req.params.productId);
        const person = await Person.findOne({user: req.user._id});
        if(product.stock > 0) 
        {
            const userCode = Math.floor(Math.random()*90000) + 10000; 
            const purchased = {
                purchasedBy:req.user._id,
                code: userCode,
                status: 'Purchased',
                comment: false
            }
           
            product.stock--;
            product.purchased.push(purchased)

            await product.save();

            person.products.push(product._id);
            await person.save();

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(userCode);
        }

    } catch(err) {
        next(err);
    }
})

.put(authenticate.verifyUser, authenticate.isRestaurant, async (req, res, next) => {
    try {

        const restaurant = await Restaurant.findOne({user: req.user._id});

        if(restaurant.products.includes(req.params.productId))
            {
                const product = await Products.findByIdAndUpdate(req.params.productId, {
                    $set: req.body
                });

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(product);
            }
        }catch(err) {
            next(err);
        }
})

.delete(authenticate.verifyUser, authenticate.isRestaurant, async (req, res, next) => {

    try {
        const restaurant = await Restaurant.findOne({user: req.user._id});
        if(restaurant.products.includes(req.params.productId))
            {
                const deleted = await Products.findByIdAndDelete(req.params.productId);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(deleted);
            }


    } catch(err) {
        next(err);
    }
})


productRouter.route('/:productId/deliver')
.post(authenticate.verifyUser, authenticate.isRestaurant, async(req, res, next) => {
    try{

        const restaurant = await Restaurant.findOne({user: req.user._id});
        if(restaurant.products.includes(req.params.productId))
            {
                const product = await Products.findById(req.params.productId);

                for(const i in product.purchased) {
                    if(req.body.code === product.purchased[i].code) {
                        product.purchased[i].status = 'Delivered';
                        await product.save();
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(product);
                        return;
                     }
                }
                
                res.statusCode = 403;
                res.setHeader("Content-Type", "application/json");
                res.json({message: 'Wrong Code'});    

            }
    } catch(err) {
        next(err);
    }
})




module.exports = productRouter;