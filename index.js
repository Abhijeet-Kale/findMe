var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

var mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'findme'
});

connection.connect(function(err){
	if(err){
		console.log('Error connecting db');
		return;
	}
	console.log('Connection successful');
});


app.listen(3000,function(){
	console.log('Node server running @ 127.0.0.1:3000');
});

app.use('/node_modules', express.static(__dirname + '/node_module'));
app.use('/style', express.static(__dirname + '/style'));

app.get('/', function(req,res){
	res.sendFile('findMe.html', {'root':__dirname + '/template'});
	
});

app.get('/template/login.html', function(req,res){
	res.sendFile('login.html', {'root':__dirname + '/template'});
	console.log('Now here');
});

app.get('/template/register.html', function(req,res){
	res.sendFile('register.html', {'root':__dirname + '/template'});
	console.log('Now here');
});

app.post('/', function(req,res){
	var postData = {
		fname: req.body.fnameJ,
		lname: req.body.lnameJ,
		email: req.body.emailJ,
		password: req.body.passwordJ,
		gender: req.body.genderJ
	}
	console.log(req.body.genderJ);
		connection.query('INSERT INTO details SET ?', postData, function(err, res){
		if(err) throw err;
		console.log('Last insert ID:', res.insertId);
	});
	//console.log('Inside post');	
	res.sendFile('/findme/template/findMe.html');
});