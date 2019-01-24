const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/playlists', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    const playlists = await loggedInSpotifyApi.getUserPlaylists();

    res.send(playlists.body);
})

router.get('/playlist/:id', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
    const id = req.params.id;

    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    const playlist =  await loggedInSpotifyApi.getPlaylist(id);

    res.send(playlist.body);
})

module.exports = router;