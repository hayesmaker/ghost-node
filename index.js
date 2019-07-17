let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser')
let apiRoutes = require("./api/routes");
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);

  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return
    }

    const db = client.db("ghost-db")
    //const collection = db.collection("store-texts")
    console.log("db connection established");

    app.use(function(req, res, next) {
      res.locals.db = db;
      next();
    });

    app.use('/api', apiRoutes)
  });

});




