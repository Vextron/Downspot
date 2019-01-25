const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/songs', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    try {

        const save = await loggedInSpotifyApi.getMySavedTracks();
        res.send(save.body);
        
    } catch (error) {
        
        console.log(error);
    }
    
})

module.exports = router;