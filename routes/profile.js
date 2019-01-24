const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/profile', (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);
  
    loggedInSpotifyApi.getMe().then( data => {
  
      console.log('Some information about the authenticated user', data.body);
  
      res.send(data.body)
  
    }).catch( err => {
  
      console.log('Something went wrong!', err);
  
    });
})

router.get('/top', (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    const id = req.query.id;
  
    let response = {};
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);
    
    loggedInSpotifyApi.getMyTopTracks({limit: 5}).then( data => {
  
      response['top_tracks'] = data.body;
      
      loggedInSpotifyApi.getMyTopArtists({limit: 4}).then( data => {
  
        response['top_artists'] = data.body;
  
        loggedInSpotifyApi.getUserPlaylists(id, {limit: 6}).then( data => {
  
          response['playlists'] = data.body;
          res.send(response);
  
        }).catch( err => {
  
          console.log('Something went wrong!', err);
  
        })
  
      }).catch( err => {
    
        console.log('Something went wrong!', err);
        
      })
  
    }).catch( err => {
  
      console.log('Something went wrong!', err);
      
    })
})

module.exports = router;