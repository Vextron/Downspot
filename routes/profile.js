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

router.get('/top', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    const id = req.query.id;
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    try {

      const top_tracks = await loggedInSpotifyApi.getMyRecentlyPlayedTracks({limit: 10});
      const top_artists = await loggedInSpotifyApi.getMyTopArtists({limit: 6});
      const playlists = await loggedInSpotifyApi.getUserPlaylists(id, {limit: 6});

      const response = {

        top_tracks: top_tracks.body,
        top_artists: top_artists.body,
        playlists: playlists.body
        
      }

      res.send(response);
      
    } catch (error) {
      
      console.log(error);
    }

})

module.exports = router;