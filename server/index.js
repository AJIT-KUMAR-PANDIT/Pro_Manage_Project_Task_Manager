const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());


const mongoose  = require("mongoose");

const dotenv = require("dotenv").config();

const port = process.env.PORT; 
const MONGODB_URL = process.env.MONGODB_URL;



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./src/routes/routes');

// health Api
app.get('/', (req, res) => {
    res.json({ 
        message: 'Api is Healthy',
        status: 200
    });
});



app.use('/api', routes);



//server on port 5000
app.listen(port,()=>{

    mongoose.connect(MONGODB_URL)
    .then(console.log(`Server is running on port ${port}`))
    .catch(err => console.error(err))
  
  });