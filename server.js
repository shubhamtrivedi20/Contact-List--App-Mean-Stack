var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('contactsdb', ['contactList']);
var port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Hey !! I am now up an running');
});

app.get('/contactpath', function(req, res) {
	console.log("I received a Get request");
	db.contactList.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactpath', function(req, res) {
	console.log(req.body);
	db.contactList.insert(req.body, function(err, docs) {
		res.json(docs);
	});
});

app.delete('/contactpath/:id', function(req, res) {
	var id = req.params.id;
	console.log("Removing contact with "+id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
		res.json(docs);
	});
});

app.get('/contactpath/:id', function(req, res) {
	var id = req.params.id;
	console.log("Editing contact with "+id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contactpath/:id', function(req, res) {
	var id = req.params.id;
	console.log("Updating contact with "+id);
	
	db.contactList.findAndModify(
		{
			query: {_id: mongojs.ObjectId(id)}, 
			update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
			new: true
		}, 
		function(err, doc) {
			res.json(doc);
		});
});

app.listen(port);
console.log('Server is running on port '+port);