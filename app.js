let express = require('express');
let app = express();
let Request = require("request");
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./stream');
let path = require('path');
let favicon = require('serve-favicon');

//Specify the asset to be use
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/main/assets', express.static(path.join(__dirname, 'main_page/assets')));
app.use('/dash/assets', express.static(path.join(__dirname, 'dashboard/assets')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main_page/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/dashboard/auth-login.html')
})

app.get('/register', (req, res) => {

    res.sendFile(__dirname + '/dashboard/auth-register.html')
})

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard/index.html')
})

app.get('/userSignIn', (req, res) => {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://medappghanaapi.herokuapp.com/users/authenticate",
        "body": JSON.stringify({
            "email": req.query.email,
            "password": req.query.password
        })
    }, (error, response, body) => {
        var msg = JSON.parse(body)
        if (error) {
            return console.dir(error);
        } else if (msg['message'] == 'email or password is incorrect') {
            return console.dir(msg['message'])
        }
        res.redirect('/dashboard')
    });
})

app.get('/userRegister', (req, res) => {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://medappghanaapi.herokuapp.com/users/register",
        "body": JSON.stringify({
            "firstName": req.query.frist_name,
            "lastName": req.query.last_name,
            "username": req.query.frist_name,
            "email": req.query.email,
            "password": req.query.password
        })
    }, (error, response, body) => {
        var val = JSON.parse(body)
        if (error) {
            return console.dir(error)

        }
        else if ('message' in val) {
            res.sendStatus(404);
        }
        res.redirect('/dashboard')
    });
})
app.get('/confrenceapp', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/dashboard/profile.html')
});

app.get('/search-doctor', (req, res) => {
    res.sendFile(__dirname + '/dashboard/search-doctor.html')
})

io.of('/stream').on('connection', stream);

server.listen(process.env.PORT || 3030);
