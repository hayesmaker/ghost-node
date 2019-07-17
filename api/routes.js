let router = require('express').Router();


router.get('/', function (req, res) {
  res.json({
    status: 'API is Working',
    message: 'Welcome to Hayesmaker ghost api'
  });
});

router.post('/some-text', function (req, res) {

  var db = res.locals.db;
  const collection = db.collection("store-texts")

  // Get our form values. These rely on the "name" attributes
  var customText = req.body.customText;

  // Submit to the DB
  collection.insert({
    "text": customText
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      //res.redirect("userlist");

      res.json({
        status: 'API is Working',
        message: 'Some Text was saved: ' + customText
      });

    }
  });
});


module.exports = router;
