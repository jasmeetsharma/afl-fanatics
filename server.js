//importing modules

var express = require('express');
var cors = require('cors');
var path = require('path');

//instantiating express

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname,'dist/public')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/public/index.html'));
});

app.get('/',(req,res)=>{
    res.send('some changes');
})

//adding middleware cors
app.use(cors());
// starting server

app.listen(PORT,()=>{
    console.log("The server has been started at port: "+PORT);
});

