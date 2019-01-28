const express = require('express');
const compression = require('compression')

const auth_flow = require('./routes/auth_flow');
const download = require('./routes/download');
const profile = require('./routes/profile');
const search = require('./routes/search');
const artists = require('./routes/artists');
const album = require('./routes/album');
const playlist = require('./routes/playlist');
const songs = require('./routes/songs');

const app = express();

app.use(compression());

const port = (process.env.PORT || 8080);

app.use('', express.static(__dirname + '/dist'));

app.use('/', auth_flow);
app.use('/', download);
app.use('/', profile);
app.use('/', search);
app.use('/', artists);
app.use('/', album);
app.use('/', playlist);
app.use('/', songs);

app.get('/*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.listen(port, () => console.log("Running on port " + port))