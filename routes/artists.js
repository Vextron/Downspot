const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/artists', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    try {
        
        const data = await loggedInSpotifyApi.getMyTopArtists();

        res.send(data.body);

    } catch (error) {

        console.log(error);
    }
})

router.get('/artist/:id', async (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    const id = req.params.id;

    try {

        const artists = await loggedInSpotifyApi.getArtist(id);
        const artist_albuns = await loggedInSpotifyApi.getArtistAlbums(id);
        const artist_top_tracks = await loggedInSpotifyApi.getArtistTopTracks(id, 'GB');
        const related_artists = await loggedInSpotifyApi.getArtistRelatedArtists(id);

        const response = {

            artist: artists.body,
            artist_albuns: artist_albuns.body,
            artist_top_tracks: artist_top_tracks.body,
            related_artists: related_artists.body

        }

        res.send(response);
        
    } catch (error) {
        
        console.log(error);
    }
})

module.exports = router;