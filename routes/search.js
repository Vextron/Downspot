const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/getsongs', (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
    const type = req.query.type;
    const to_search = req.query.to_search;
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);
  
    if(type === 'topsongs') {
  
      loggedInSpotifyApi.getMyTopTracks().then(function(data) { res.send(data.body); }, function(err) {
    
          console.error(err);
      });
  
    }
  
    else if(type === 'playlists') {
  
      loggedInSpotifyApi.searchPlaylists(to_search).then(function(data) {
  
        console.log('Found playlists are', data.body);
        res.send(data.body.playlists);
    
      }, function(err) {
    
        console.log('Something went wrong!', err);
      });
    }
  
    else if(type === 'songs') {
  
      loggedInSpotifyApi.searchTracks(to_search).then( data => {
  
        console.log('Search by ', data.body);
  
        res.send(data.body.tracks);
  
      }, function(err) {
  
        console.log('Something went wrong!', err);
      })
    }
  
    else if(type === 'albums') {
  
      loggedInSpotifyApi.searchAlbums(to_search).then( data => {
  
        console.log('Search by ', data.body.albums);
  
        res.send(data.body.albums);
  
      }, function(err) {
  
        console.log('Something went wrong!', err);
      })
    }
  
    else if(type === 'artists') {
  
      loggedInSpotifyApi.searchArtists(to_search).then( data => {
  
        console.log('Search by ', data.body.artists);
  
        res.send(data.body.artists);
  
      }, function(err) {
  
        console.log('Something went wrong!', err);
      })
    }
})

module.exports = router;