let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./stream');
let path = require('path');
let favicon = require('serve-favicon');

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


app.get('/confrenceapp', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.of('/stream').on('connection', stream);

server.listen(process.env.PORT || 3030);
