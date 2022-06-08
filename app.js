const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
dotenv.config();
const app=express();

// Connecting the database
// require('./config/db')()

// Setting body-parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Adding static files path
const staticPath=path.join(__dirname,'public');
app.use(express.static('public'));

// Setting view engine
app.set('view engine','ejs');


app.use('/',require('./routes'))

PORT= process.env.PORT || 5100;

app.listen(PORT,(err)=>{
    console.log(`Server running at ${PORT}`);
})