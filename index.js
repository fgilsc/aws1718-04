var express = require("express");
var bodyParser = require("body-parser");

var BASE_API_PATH = "/api/v1";
var dbFileName = __dirname + "/contacts.json";


var app = express();
app.use(bodyParser.json());

var initialContacts = [
    { "name": "peter", "phone": 12345 },
    { "name": "john", "phone": 6789 }
    /*
    
    Direccion	Avda. Reina Mercedes, s/n
    Localidad	Sevilla
    CP	41012
    Telefono	95.455.65.00/02/04
    Fax	95.455.65.34
    Email	malala@us.es
    http	http://www.arquitectura.us.es/

    */
];


app.get(BASE_API_PATH + "/universities", (req, res) => {
   
});

app.post(BASE_API_PATH + "/universities", (req, res) => {
  
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
