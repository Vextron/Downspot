const express = require('express');
const path = require('path');

const auth_flow = require('./routes/auth_flow');
const download = require('./routes/download');
const profile = require('./routes/profile');
const search = require('./routes/search');
const artists = require('./routes/artists');

const app = express();

const port = (process.env.PORT || 8080);

app.use(express.static(__dirname + '/dist'));

app.use('/', auth_flow);
app.use('/', download);
app.use('/', profile);
app.use('/', search);
app.use('/', artists);

app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

app.listen(port, () => console.log("Running on port " + port))