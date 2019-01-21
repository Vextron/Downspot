const express = require('express');
const fs = require('fs');
const router = express.Router();

const { spawn } = require('child_process');
const youtube = require('../modules/youtube');

router.get('/download_options', (req, res) => {

    const name = req.query.name;
    const artist = req.query.artist;
  
    youtube.searchVideos(`${name} ${artist}`, 5).then( results => {
  
      res.send(results);
    })
  })
  
router.get('/download', (req, res) => {
  
    const video_id = req.query.video_id;
    const video_name = req.query.name;
  
    console.log(video_name);
    
    const video_url = `http://www.youtube.com/watch?v=${video_id}`
  
    const py = spawn('python', ['download.py', video_url, video_name]);
  
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

module.exports = router;
  