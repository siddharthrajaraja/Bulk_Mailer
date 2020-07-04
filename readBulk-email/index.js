var express =require('express')
var dotenv=require('dotenv').config()
var app=new express()
var cors=require('cors')

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser=require('body-parser').json()

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors())

var {readFileToQueue}=require('./server/readFileToQueue');
app.post('/readFileToQueue',jsonParser,readFileToQueue);


app.listen(8501 || process.env.PORT,()=>{
    console.log(`Connected to READ-BULK MAIL SERVER  FOR RABBITMQ at ${process.env.PORT}  PORT`)
})

