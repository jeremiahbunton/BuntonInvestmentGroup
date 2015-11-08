var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET New User page */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add new user'});
});

/* GET Hello World page */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', {title: 'Hello, World!'});
});

/* GET User Info page */
router.get('/userinfo', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

router.get('/')

router.post('/adduser', function(req, res) {
  var db = req.db;
  
  var username = req.body.username;
  var useremail = req.body.useremail;
  
  var collection = db.get('usercollection');
  
  collection.insert({
    "username" : username,
    "useremail" : useremail
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database");
    }
    else {
      res.redirect("/userinfo");
    }
  });
});





module.exports = router;
