const express = require('express');

const http = require('http');
const path = require('path');

const client_id = '2696b73e8f7345c586c2f104a77ed233';
const client_secret = '2ff75a3163184fa2b6cbef67a11bf41f';
const redirect_uri = 'http://localhost:4200/';

const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

app.get('/login', (req, res) => {

    var scopes = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + client_id + 
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' + encodeURIComponent(redirect_uri));
})

const server = http.createServer(app);

server.listen(port, () => console.log("Running on port " + port))

const spotifyApi = new SpotifyWebApi(
    {
        
    }
);
