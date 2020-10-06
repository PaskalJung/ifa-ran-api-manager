var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const morgan = require('morgan');
var JSONFILE = require('./models/jsonFile.js');
var JSONMODEL = require('./models/jsonModel.js');
var app = express();
require('dotenv').config() // console.log(process.env)

setServer()

app.use(morgan('dev'));  
// app.use('/', morgan('dev'));

// app.use(function(req, res, next) {
//     console.log(req.url)
//     next()
// })
   

// prends en charge les requetes du type ("Content-type", "application/x-www-form-urlencoded")
app.use(bodyParser.urlencoded({
    extended: true
}))


// prends en charge les requetes du type ("Content-type", "application/json")
app.use(bodyParser.json());

// prends en charge un dossier public
app.use(express.static(__dirname + '/public'));

// Add headers to allow CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/*
 * HTML
 */


// GET send index.html
app.get('/', function(req, res) {
    return res.status(200).sendFile(__dirname + '/client/index.html')
});

// GET send jsonFile.html
app.get('/json-file', function(req, res) {
    return res.status(200).sendFile(__dirname + '/client/json-file.html')
});

// GET send database.html
app.get('/database', function(req, res) {
    return res.status(200).sendFile(__dirname + '/client/database.html')
});

// GET send 404.html
app.get('/404', function(req, res) {
    return res.status(200).status(404).sendFile(__dirname + '/client/404.html')
});

/*
 * API
 */

/*
 * Json file
 */

// GET list json file
app.get('/api/json-file/json', function(req, res) {
    console.log("JSONFILE", JSONFILE);

    // result sent
    return res.status(200).send(JSONFILE);
       
});

// GET index by _id in json file
app.get('/api/json-file/index/:id', function(req, res) {

    console.log("id: ", req.params.id);
    
    var result = JSONFILE.find( (plant) => plant._id == req.params.id)

    if(!result) {
        // result sent
        return res.status(500).json({error: 'plant id ' + req.params.id + ' not found - status 500'});
    }
    else {
        console.log("result: ", result);

        // result sent
        return res.status(200).json(result);
    }
});

// POST test json file
app.post('/api/json-file/post/test', function(req, res) {
    console.log("body", req.body);
    res.status(200).json(req.body);
});

// POST add in json file
app.post('/api/json-file/add', function(req, res) {

    console.log("body", req.body);

    JSONFILE.push(req.body)

    console.log("JSONFILE", JSONFILE);
    // result sent
    res.status(200).json(JSONFILE);
    
});

// PUT update by _id in json file
app.put('/api/json-file/update/:id', function(req, res) {

    console.log("id", req.params.id);
    console.log("body", req.body);

    var index = JSONFILE.findIndex( (plant) => plant._id == req.params.id);

    console.log("index", index);

    if(index == -1) {
        // result sent
        return res.status(404).json({error: 'plant id ' + req.params.id + ' not found - status 404'});
    }
    else {

        JSONFILE[index] = req.body;

        // result sent
        return res.status(200).json(JSONFILE);
    }
    
    
});

// DELETE delete by _id in json file
app.delete('/api/json-file/delete/:id', function(req, res) {
    
    console.log("id", req.params.id);
    
    var index = JSONFILE.findIndex( (plant) => plant._id == req.params.id);

    console.log("index", index);

    if(index == -1) {
        // result sent
        return res.status(401).json({error: 'plant id ' + req.params.id + ' not found - status 401'});
    }
    else {

        JSONFILE.splice(index, 1);

        // result sent
        res.status(200).json(JSONFILE);

    }
});



/*
 * DB
 */

// GET list database
app.get('/api/db/list', function(req, res) {
    
    JSONMODEL.find({}, function(err, collection) {
        if (err) {
            console.log("err", err);
            return res.status(404).json({error: 'plants not found - status 404'})
        } else {
            return res.status(200).json(collection);
        }
    }).sort({_id: 1});

});

// GET index by _id in database
app.get('/api/db/index/:id', function(req, res) {
    
    JSONMODEL.find({_id: req.params.id}, function(err, collection) {
        if (err) {
            console.log("err", err);
            return res.status(404).json({error: 'plant id ' + req.params.id + ' not found - status 404'})
        }

        if (collection.length == 0) {
            console.log("!collection", err);
            return res.status(404).json({error: 'plant id ' + req.params.id + ' not found - status 404'})
        }
         else {
            console.log("collection", collection);
            return res.status(200).json(collection);
        }
    });

});

// POST add in database
app.post('/api/db/add', function(req, res) {
    
    console.log("body", req.body);

    var search = JSONMODEL.find({_id: req.params.id})

    var plantToSave = new JSONMODEL(req.body);
    plantToSave.save(function(err, success){
        if(err){

            console.log(err);
            return res.status(200).json(err);
        }
        else{
            console.log(success);
            return res.status(200).json(success);

        }
    });
    
});

// PUT update by _id in database
app.put('/api/db/update/:id', function(req, res) {
    
    console.log("id", req.params.id);
    console.log("body", req.body);

    JSONMODEL.findByIdAndUpdate(req.params.id,req.body, { new: true }, function (err, updatedJsonFile) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: 'plant id ' + req.params.id + ' not found - status 500'})
      }
      else {
        console.log(updatedJsonFile);
        return res.status(200).send(updatedJsonFile);
      }
      
    });

});

// DELETE delete by _id in database
app.delete('/api/db/delete/:id', function(req, res) {

    console.log("id", req.params.id);

    JSONMODEL.findByIdAndRemove(req.params.id, function(err, response){
        if(err){
            console.log(err);
            return res.status(500).json({error: 'plant id ' + req.params.id + ' not found - status 500'})
        }
        else{
            if(response == null) {
                return res.status(404).json({error: 'plant id ' + req.params.id + ' not found - status 404'})
            }
            else {
                console.log(response);
                console.log("deleted");
                res.status(200).json({deleted_id:  req.params.id});
            }
            
        }
    });
});

// GET add collection in database
app.get('/api/db/collection/add', function(req, res) {
    
    console.log("JSONFILE", JSONFILE);

    JSONFILE.forEach( (newPlant, index) => {

        var plantToSave = new JSONMODEL(newPlant);

        plantToSave.save(function(err, success){
            if(err){
                return console.log(err);
            }
            else{
                console.log(success);
            }
        });

        if( index == JSONFILE.length ) {
            return res.status(200).json(success);
        }
    })

});


// FUNCTION
function setServer() {
  
    var promise = mongoose.connect(process.env.MONGO_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    promise.then(
      () => {
          console.log("");
          console.log('DATABASE is connected on this url: ' + process.env.MONGO_HOST);
          app.listen(process.env.SERVER_PORT, () => {
            console.log(" ");
            console.log("------- ");
            console.log('SERVER is listening on url: ' + process.env.ROOT_URL + ':' + process.env.SERVER_PORT);
            console.log(" ");
            console.log("------- ");
            console.log('SERVER ENV: ');
            console.log(' - ROOT_URL:' + process.env.ROOT_URL);
            console.log(' - SERVER_PORT:' + process.env.SERVER_PORT);
            
            
  
          });
          
          
      },
      err => {
          console.log('ERROR DATABASE: NOT CONNECTED on this url: ' + process.env.MONGO_HOST);
          // console.log(err);
      }
    )
    .catch(
        () => {
            console.log('ERROR DATABASE: NOT CONNECTED on this url: ' + process.env.MONGO_HOST);
        }
    )
}

