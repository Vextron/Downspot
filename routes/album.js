const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/albums', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    try {

        const save = await loggedInSpotifyApi.getMySavedAlbums({limit: 20});

        res.send(save.body);

    } catch (error) {
        
        console.log(error);
    }
})

router.get('/album/:id', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();

    const id = req.params.id;

    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    try {

        const tracks = await loggedInSpotifyApi.getAlbum(id);

        res.send(tracks.body);
        
    } catch (error) {
        
        console.log(error);
    }

})

module.exports = router;