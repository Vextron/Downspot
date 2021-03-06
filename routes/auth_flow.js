const express = require('express');
const router = express.Router();

const spotifyApi = require('../modules/spotify');
// NOTE: Production only
/* const scopes = ["user-top-read", "user-library-read", "playlist-read-private", "user-read-recently-played"];
const showDialog = process.env.SHOWDIALOG; */

const { scopes, showDialog } = require('../tokens.json');

router.get('/login', (req, res) => {

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);

    console.log(authorizeURL)
    res.send({res : authorizeURL});
})

router.get('/token', (req, res) => {

  const authorizationCode = req.query.code;
  
  spotifyApi.authorizationCodeGrant(authorizationCode).then( (data) => {

    res.send({res:`/access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`})

  }, function(err) {

    console.error('Something went wrong when retrieving the access token!', err.message);
  });
})

module.exports = router;