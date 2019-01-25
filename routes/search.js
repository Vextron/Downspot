const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/getsongs', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
    const type = req.query.type;
    const to_search = req.query.to_search;
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);
  
    if(type === 'topsongs') {

      try {

        const top_songs = await loggedInSpotifyApi.getMyTopTracks();

        res.send(top_songs.body);

      } catch (error) {
        
        console.log(error);
      }
    }
  
    else if(type === 'playlists') {

      try {
        
        const playlists = await loggedInSpotifyApi.searchPlaylists(to_search);

        res.send(playlists.body.playlists);

      } catch (error) {

        console.log(error);        
      }
    }
  
    else if(type === 'songs') {

      try {
        
        const songs = await loggedInSpotifyApi.searchTracks(to_search);

        res.send(songs.body.tracks);

      } catch (error) {
        
        console.log(error);
      }
    }
  
    else if(type === 'albums') {

      try {
        
        const albums = await loggedInSpotifyApi.searchAlbums(to_search);

        res.send(albums.body.albums);

      } catch (error) {
        
        console.log(error);
      }
    }
  
    else if(type === 'artists') {

      try {

        const artists = await loggedInSpotifyApi.searchArtists(to_search);

        res.send(artists.body.artists);
        
      } catch (error) {
        
        console.log(error);
      }
    }
})

module.exports = router;