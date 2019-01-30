const express = require('express');
const fs = require('fs');
const router = express.Router();

const youtube = require('../modules/youtube');

const queue = require('../modules/queue');

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
  
    const video_url = `http://www.youtube.com/watch?v=${video_id}`
  
    const job = queue.create('download', {

      video_name: video_name,
      video_url: video_url

    }).removeOnComplete(true).save( err => {

      if ( err ) {

        next(err);
        return;
      }

      job.on('complete', result => {

        const name = `./downloads/${video_name}.mp3`;

        res.download(name, video_name, (err) => {

          if ( err ) throw err;

        })

      })

      job.on('failed', () => {

        const failedError = new Error('failed');
        next(failedError);

      });
    })
  })

module.exports = router;
  