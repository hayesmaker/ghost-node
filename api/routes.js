let router = require('express').Router();


router.get('/', function (req, res) {
  res.json({
    status: 'API is Working',
    message: 'Welcome to Hayesmaker ghost api'
  });
});

router.get('/last-text', function(req, res) {
  let db = res.locals.db;
  let collection = db.collection("store-texts");

  collection.find().toArray((err, items) => {
    console.log(items);
    res.json({
      status: '/last-text API is Working!',
      data: items[items.length - 1]
    })
  })


});

router.get('/stored-texts', function (req, res) {
  let db = res.locals.db;
  let collection = db.collection("store-texts");
  collection.find().toArray((err, items) => {
    console.log(items);
    res.json({
      status: '/stored-texts API is Working!',
      data: items
    })
  })
});

router.post('/some-text', function (req, res) {
  let db = res.locals.db;
  let collection = db.collection("store-texts");
  let customText = req.body.someText;
  collection.insert({
    "text": customText
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }
    else {
      console.log("Added Texr", req.body.someText);
      collection.find().toArray((err, items) => {
        console.log(items);
        res.json({
          status: '/some-text API is Working',
          message: customText + " was added to the `store-texts` collection",
          data: items,
          lastText: items[items.length-1]
        })
      })
    }
  });
});


module.exports = router;
