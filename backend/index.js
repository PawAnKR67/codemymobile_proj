const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin :["http://localhost:8081","http://localhost:4200"]
};

app.use(cors(corsOptions));

//parse requessts of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

const db= require("./app/models");

db.sequelize.sync();

// const config = require('./config/');

// require('./config/express')(app);

app.get('/',(req,res)=>{
    res.json({message : "Welcome to express apis"});
});

// app.get('/friends/:id',(req,res) => {

// });
// app.get('/fof/:id',(req,res) => {

// });

require('./app/routes/user.routes')(app);

app.use(express.static('public'));

//set port listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});