const express=require('express');
var bodyParser = require("body-parser")
const routes = require('./controllers/routes');
const routes1=require('./controllers/routes1');
var mongoose = require("mongoose")
const path = require('path');

const foreach=require('foreach');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
//app.use(express.static('../root'));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.static('public/html'))
//app.use(express.static('public/images'))
//app.use(express.static('public/css'))
app.use('/css', express.static(path.resolve(__dirname, "public/assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "public/assets/images")))
app.use('/js', express.static(path.resolve(__dirname, "public/assets/js")))
app.get('/',(req,res) =>{
  console.log('request: ', req);
  res.sendFile(path.join(__dirname,'index.html'))
})
app.get('/vendor', routes);
app.post('/vendor', routes);
app.get('/benchsales',routes1);
app.post('/benchsales', routes1);

app.get('/login', routes);
app.post('/login', routes);
app.get('/success', routes);
app.get('/logout', routes);

app.get('/login', routes1);
app.post('/login', routes1);
app.get('/success', routes1);
app.get('/logout', routes1);
app.listen(8000,function(){
  console.log("__dirname: ");
  console.log(path.join(__dirname, 'views'));
  console.log("listing at 8000");
})
