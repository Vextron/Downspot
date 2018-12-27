const express = require('express');

const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const SpotifyWebApi = require('spotify-web-api-node');
const YouTube = require('simple-youtube-api');

const youtube = new YouTube(process.env.YTAPI);

const scopes = ['user-top-read'];
const showDialog = true;

const credentials = {
  clientId : process.env.CLIENTID,
  clientSecret : process.env.CLIENTSECRET,
  redirectUri : 'https://downspot.herokuapp.com/check'
}

var spotifyApi = new SpotifyWebApi(credentials);

const app = express();

const port = (process.env.PORT || 8080);

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

app.get('/login', (req, res) => {

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);

    console.log(authorizeURL)
    res.send({res : authorizeURL});
})

app.get('/token', (req, res) => {

  const authorizationCode = req.query.code;
  
  spotifyApi.authorizationCodeGrant(authorizationCode).then(function(data) {

    console.log(data)
    res.send({res:`/access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`})

  }, function(err) {

    console.log('Something went wrong when retrieving the access token!', err.message);
  });
})

app.get('/getsongs', (req, res) => {

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

app.get('/profile', (req, res) => {

  const loggedInSpotifyApi = new SpotifyWebApi();

  loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

  loggedInSpotifyApi.getMe().then( data => {

    console.log('Some information about the authenticated user', data.body);

    res.send(data.body)

  }).catch( err => {

    console.log('Something went wrong!', err);

  });
})

app.get('/top', (req, res) => {

  const loggedInSpotifyApi = new SpotifyWebApi();

  let response = {};

  loggedInSpotifyApi.setAccessToken(req.headers['authorization'].split(' ')[1]);

  loggedInSpotifyApi.getMyTopTracks().then( data => {

    console.log("Your top tracks ;)", data.body);

    response['top_tracks'] = data.body;
    
    loggedInSpotifyApi.getMyTopArtists().then( data => {

      console.log("Your top artists", data.body);

      response['top_artists'] = data.body;

      res.send(response);

    }).catch( err => {
  
      console.log('Something went wrong!', err);
      
    })

  }).catch( err => {

    console.log('Something went wrong!', err);
    
  })

  
})

app.get('/download_options', (req, res) => {

  const name = req.query.name;
  const artist = req.query.artist;

  youtube.searchVideos(`${name} ${artist}`, 5).then( results => {

    res.send(results);
  })
})

app.get('/download', (req, res) => {

  const video_id = req.query.video_id;
  const video_name = req.query.name;
  
  const video_url = `http://www.youtube.com/watch?v=${video_id}`

  const py = spawn('python', ['./download.py', video_url, video_name]);

  py.stdout.on('data', data => {

    console.log(data.toString())
    
  })

  py.stderr.on('data', data => {

    console.log(data.toString());
    
  })

  py.on('exit', () => {

    const name = `./downloads/${video_name}.mp3`;

    let file = fs.createReadStream(name);

    file.on('end', () => {

      fs.unlink(name, () => {

        console.log("Done");
        
      })
    })

    file.pipe(res);
  })

})

app.listen(port, () => console.log("Running on port " + port))
