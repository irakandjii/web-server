'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;
// oh well
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
const myPort = 3000;

const fs = require('fs');
const express = require("express");
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');

// The static directory in the base directory for the application (See NPM documentation for express)
hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


// the order that app.use is executed is imporant
// this is my middleware
// 1) always log a request
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `Log: ${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n' , (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// 2) If this app.use is active, it gets executed, loads the screen and because there is no next() function it locks up the site
//app.use((req, res, next) => {
//    res.render('maintenance.hbs', {pageTitle: 'Maintenance Page'});
//});

// 3) app.use sets the static address for the web site and executes by loading the / (root) directory get

app.use(express.static(__dirname + '/public'));

//            Request, Stores a ton of data about the rquest coming in from get
//            |    Respond, Has a lot of methods to choose from to respond to the request
//            |    |  
app.get('/', (req, res) => {            // This is presented when user requests the route directory /  in this case it loads home.hbs
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my very first Home Page! I am so happy with it!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        myMessage: 'Welcome to the about page.'
    });
});

//app.get('/learning', (req, res) => {
//    res.send('About Page');
//});
app.get('/work', (req, res) => {
    res.render('work.hbs', {
        pageTitle: 'Working page',
        workMessage: 'Welcome to the work page.'
    });
});

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help page',
        workMessage: 'Welcome to the help page.'
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


app.listen(myPort, () => {
    console.log(`Your server is up on localhost: ${myPort} `)
});