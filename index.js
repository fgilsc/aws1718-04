var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var path = require('path');

var BASE_API_PATH = "/api/v1";
var dbFileName = __dirname + "/universities.json";

var port = (process.env.PORT || 16778);

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

console.log("Starting API server...");
var initialUniversities = [

    { "name": "E.T.S Ingeniería Informática", 
      "address": "Avda. Reina Mercedes, s/n",
      "city":"Sevilla",
      "ZipCode":41012,
      "phone":954556816,
      "fax":954552759,
      "mail":"secretaria@eii.us.es",
      "web":"http://www.informatica.us.es/" 
    },
    { "name": "E.T.S Arquitectura", 
      "address": "Avda. Reina Mercedes, s/n",
      "city":"Sevilla",
      "ZipCode":41012,
      "phone":954556500,
      "fax":954556534,
      "mail":"malala@us.es",
      "web":"http://www.arquitectura.us.es/" 
    }
];

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

db.find({},(err,universities)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }else{
        if(universities.length == 0){
            console.log("Empty DB, initializaing data...");
            db.insert(initialUniversities);
        }else{
            console.log("Loaded DB with "+universities.length+" universities.");
        }
           
    }
});

app.get(BASE_API_PATH + "/universities", (req, res) => {
    // Obtain all contacts
    console.log(Date()+" - GET /universities");
    
    db.find({},(err,universities)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            res.send(universities.map((university)=>{
                delete university._id;
                return university;
            }));
        }
    });
});

app.post(BASE_API_PATH + "/universities", (req, res) => {
    console.log(Date()+" - POST /universities");
    var university = req.body;
    db.insert(university);
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

   db.remove({});
   
   res.sendStatus(200); 
});


app.post(BASE_API_PATH + "/universities/:name", (req, res) => {
    // Forbidden
    console.log(Date()+" - POST /universities");

    res.sendStatus(405);
});

app.get(BASE_API_PATH + "/universities/:name", (req, res) => {
  // Get a single university
    var name = req.params.name;
    console.log(Date()+" - GET /universities/"+name);

    db.find({"name": name},(err,universities)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(universities.length>1){
                console.warn("Incosistent DB: duplicated name");
            }
            res.send(universities.map((university)=>{
                delete university._id;
                return university;
            })[0]);
        }
    });
});


app.delete(BASE_API_PATH + "/universities/:name", (req, res) => {
  // Delete a single university
  var name = req.params.name;
  console.log(Date()+" - DELETE /universities/"+name);

  db.remove({"name": name},{},(err,numRemoved)=>{
      if(err){
          console.error("Error accesing DB");
          res.sendStatus(500);
      }else{
          if(numRemoved>1){
              console.warn("Incosistent DB: duplicated name");
          }else if(numRemoved == 0) {
              res.sendStatus(404);
          } else {
              res.sendStatus(200);
          }
      }
  });
});

app.put(BASE_API_PATH + "/universities/:name", (req, res) => {
    var name = req.params.name;
    var updatedUniversity = req.body;
    console.log(Date()+" - PUT /universities/"+name);
    
    if(name != updatedUniversity.name){
        res.sendStatus(409);
        return;
    }
    
        db.update({"name": name},updatedUniversity,(err,numUpdated)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numUpdated>1){
                console.warn("Incosistent DB: duplicated name");
            }else if(numUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.listen(port, () => {
    console.log("Server with GUI up and running!!");
});