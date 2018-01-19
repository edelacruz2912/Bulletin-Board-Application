var express = require('express');
var bodyParser = require('body-parser');
// var session = require('cookie-session'); // Loads the piece of middleware for sessions
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

// app.use(session({secret: 'todotopsecret'}))

// systemFile
var fs = require('fs');
var dataFile = fs.readFileSync('userMsg.json');

var jsonData;



app.use(function(req, res, next){
    if (typeof(req.jsonData) == 'undefined') {
        req.jsonData = [];
        console.log(" jsonDatafromUse " + req.jsonData);
    }
    else
    {
    	console.log('here');
    	req.jsonData = jsonData;

    }
    next();
})
app.get("/",function(request,respond)
{
	var jsonData = JSON.parse(dataFile);
	respond.render("index.ejs",{jsonData:request.jsonData});

});



app.post("/post/add/",urlencodedParser,function(request,respond)
{	


	// if inputs are not empty then we can post 
	 if (request.body.username != '' && request.body.titleId != '' && request.body.msg != '') {
        // request.session.todolist.push(request.body.newtodo);
        console.log("userId " +request.body.username);
        // console.log("userId type of  " + typeof(request.body.username));
        console.log("titleid " +request.body.titleId);
        console.log("msgid" +request.body.msg);
        request.jsonData = JSON.parse(dataFile);

        var message = [];
        var post = 
        {
        	"username":request.body.username,
        	"title":request.body.titleId,
        	"msg":request.body.msg
        }

        request.jsonData.push(post);
        console.log("pushing element to array " + request.jsonData);
        var appendedInfo = JSON.stringify(request.jsonData);

        fs.writeFile('userMsg.json', appendedInfo, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
		});
    }
    respond.redirect('/');
	
});








//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}

