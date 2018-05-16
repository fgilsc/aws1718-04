'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var universities = require("./universities.js");
var BASE_API_PATH = "/api/v1";
var cors= require("cors");
var request = require('request').defaults({json: true});
var researchersResource = require('./researchersResource.js');


var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalAPIKey = require('passport-localapikey').Strategy;
var users = require('./users.js');

var port = (process.env.PORT || 16778);

var app = express();

// Universities API params
var baseAPIRes = "/api/v1";
var serverURLRes = "https://aws1718-02.herokuapp.com";


passport.use(new BasicStrategy(
    function(username, password, done) {
        users.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }
          return done(null, user);
        });
    }
));

passport.use(new LocalAPIKey(
    function(apikey, done) {
        users.findOne({ apikey: apikey }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user);
        });
    }
));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());

console.log("Starting API server...");


app.get(BASE_API_PATH + "/universities", 
    passport.authenticate(['basic','localapikey'], {session:false}), 
    (req, res) => {
    // Obtain all universities
    console.log(Date()+" - GET /universities");
    
     universities.allUniversities((err,universities)=>{
        res.send(universities);    
    });
});

app.post(BASE_API_PATH + "/universities", (req, res) => {
    console.log(Date()+" - POST /universities");
    var university = req.body;
    universities.add(university);
    res.sendStatus(201);

});

app.put(BASE_API_PATH + "/universities", (req, res) => {
    // Forbidden
    console.log(Date()+" - PUT /universities");

    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/universities", (req, res) => {
   // Remove all universities
   console.log(Date()+" - DELETE /universities");

   universities.removeAll((err,numRemoved)=>{
        console.log("universities removed:"+numRemoved);
        res.sendStatus(200);    
    });
});

app.get(BASE_API_PATH + "/universities/:name", (req, res) => {
  // Get a single university
    var name = req.params.name;
    console.log(Date()+" - GET /universities/"+name);

    universities.get(name,(err,universities)=>{
        if (universities.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.send(universities[0]);  
        }
    });
});


app.delete(BASE_API_PATH + "/universities/:name", (req, res) => {
  // Delete a single university
  var name = req.params.name;
  

  universities.remove(name,(err,numRemoved)=>{
     console.log("universities removed:"+numRemoved);
     res.sendStatus(200);    
  });

    console.log(Date()+" - DELETE /universities/"+name);
});

app.put(BASE_API_PATH + "/universities/:name", (req, res) => {
    var name = req.params.name;
    var updatedUniversity = req.body;

    
    if(name != updatedUniversity.name){
        res.sendStatus(409);
        return;
    }
    
    universities.update(name, updatedUniversity ,(err,numUpdates) => {
        console.log("universities updated:"+numUpdates);
        if (numUpdates === 0) {
            res.sendStatus(404);    
        } else {
            res.sendStatus(200);    
        }
        
    });

    console.log(Date()+" - PUT /universities/"+name);
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});





app.get(BASE_API_PATH + "/researchers", (req, response) => {
    console.log("GET /researchers"); 
    
    request.get(researchersResource("/researchers"), (error, resp, body) => {
        if (error) {
            console.log('error:'+error);
            response.sendStatus(500);
        } else {
            response.send(body);
        }
    });
});

universities.connectDb((err) => {
    if (err) {
        console.log("Could not connect with MongoDB");
        process.exit(1);
    }
     users.connectDb((err) => {
        if (err) {
            console.log("Could not connect with MongoDB users");
            process.exit(1);
        }
        app.listen(port, () => {
            console.log("Server with GUI up and running!!");
        });   
        
    });
});

// Researcher routes
app.get(BASE_API_PATH + "/researchers/:id", (req, res) => {
	console.log("GET /researchers/" + req.params.id);
	/*{
        "name": "Antonio Ruiz Cortes",
        "phone": "954556874",
        "mail": "aruiz@us.es",
        "ORCID": "0000-0001-9827-1834",
        "researcherID": "B-9056-2008",
        "website": "https://scholar.google.es/citations?user=Ka-FHBQAAAAJ&hl=en",
        "researchGroup": {
          "name": "ISA",
          "website": "http://www.isa.us.es"
        },
        "department": "LSI",
        "university": "US"
      }*/
      
      
	request.get(`${serverURLRes}${baseAPIRes}/researchers/${req.params.id}`, (err, resp, body) => {
		if (err) {
			console.log('Error: '+err);
			res.sendStatus(500);
		} else {
			// body.researchGroups = ["1", "2"];
			res.status(resp.statusCode).send(body);
		}
	});
});