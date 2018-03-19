var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var BASE_API_PATH = "/api/v1";
var dbFileName = __dirname + "/universities.json";


var app = express();
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
    
});


app.post(BASE_API_PATH + "/universities/:name", (req, res) => {
    // Forbidden
    console.log(Date()+" - POST /universities");

    res.sendStatus(405);
});

app.get(BASE_API_PATH + "/universities/:name", (req, res) => {
 
});


app.delete(BASE_API_PATH + "/universities/:name", (req, res) => {
  
});
app.delete(BASE_API_PATH + "/universities/:name", (req, res) => {
  
});

app.put(BASE_API_PATH + "/universities/:name", (req, res) => {
   
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});
