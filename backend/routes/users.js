var express = require('express');
var router = express.Router();

const Person = require('../models/person');
const Restaurant = require('../models/restaurant');
const User = require('../models/user')
const utils = require('../lib/utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.post('/login', function(req, res, next){


  User.findOne({ username: req.body.username })
      .then((user) => {

          if (!user) {
              return res.status(401).json({ success: false, msg: "could not find user" });
          }
          
          const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
          
          if (isValid) {

              const tokenObject = utils.issueJWT(user, req.body.userType);

              res.cookie('token', tokenObject.token, { httpOnly: true });

              res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, userType: user.userType });

          } else {

              res.status(401).json({ success: false, msg: "you entered the wrong password" });

          }

      })
      .catch((err) => {
          next(err);
      });
});

router.post('/register-person', async (req, res, next) => {

  try {


  const saltHash = utils.genPassword(req.body.password);

  const newUser = new User({
      username: req.body.username,
      salt:saltHash.salt,
      hash:saltHash.hash,
      userType: 'Person'
  });

const newPerson = new Person({
  user: newUser._id,
  name: req.body.name,
  surname: req.body.surname,
  address: req.body.email,
  phone: req.body.phone,
  age: req.body.age,
  city:req.body.city,
})



  await newUser.save();
  await newPerson.save();


  
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.json({success: true});

} catch (error) {
    console.log(error)
  next(error)
}


});



router.post('/register-restaurant', async (req, res, next) => {

  try {


  const saltHash = utils.genPassword(req.body.password);

  const newUser = new User({
      username: req.body.username,
      salt:saltHash.salt,
      hash:saltHash.hash,
      userType: 'Restaurant'
  });

const newPerson = new Restaurant({
  user: newUser._id,
  name: req.body.name,
  address: req.body.email,
  city:req.body.city,
})



  await newUser.save();
  await newPerson.save();


  
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.json({success: true});

} catch (error) {
    console.log(error)
  next(error)
}


});


module.exports = router;
