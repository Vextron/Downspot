const express = require('express');
const router = express.Router();

const spotifyApi = require('../modules/spotify');
const scopes = process.env.SCOPES;// || require('../tokens.json');
console.log(scopes);

const showDialog = process.env.SHOWDIALOG;// || require('../tokens.json');

router.get('/login', (req, res) => {

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);

    console.log(authorizeURL)
    res.send({res : authorizeURL});
})

router.get('/token', (req, res) => {

  const authorizationCode = req.query.code;
  
  spotifyApi.authorizationCodeGrant(authorizationCode).then( (data) => {

    console.log(data);
    res.send({res:`/access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`})

  }, function(err) {

    console.log('Something went wrong when retrieving the access token!', err.message);
  });
})

module.exports = router;