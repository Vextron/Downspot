const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/artists', (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    loggedInSpotifyApi.getMyTopArtists().then( data => {
        console.log(data.body);
        
        res.send(data.body);

    }).catch( err => {

        console.log(err);
    })
})

router.get('/artist/:id', (req, res) => {

    const loggedInSpotifyApi = new SpotifyWebApi();
  
    loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

    const id = req.params.id;

    let response = {}

    loggedInSpotifyApi.getArtist(id).then( data => {

        response['artist'] = data.body

        loggedInSpotifyApi.getArtistAlbums(id).then( data => {

            response['artist_albuns'] = data.body;
    
            loggedInSpotifyApi.getArtistTopTracks(id, 'GB').then( data => {
    
                response['artist_top_tracks'] = data.body;
    
                loggedInSpotifyApi.getArtistRelatedArtists(id).then( data => {
    
                    response['related_artists'] = data.body;
    
                    res.send(response);
    
                }).catch( err => {
    
                    console.log(err);
                })
    
            }).catch( err => {
    
                console.log(err);
            })
    
        }).catch( err => {
    
            console.log(err);
        })
        
    }).catch( err => {

        console.log(err);
    })
})

module.exports = router;