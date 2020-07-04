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
app.use(cors());

var {dashboard}=require('./server/dashboard')
var {uploads}=require('./Multer/uploadFile')
var {pingToRMQ}=require('./server/pingToRMQ')
app.get('/',dashboard)
app.post('/uploads',uploads.array('emailList',1),pingToRMQ)

app.listen(8500 || process.env.PORT,()=>{
    console.log(`Connected to Web-Server at ${process.env.PORT}  PORT`)
})

