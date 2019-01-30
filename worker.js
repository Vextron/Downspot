const { spawn } = require('child_process');

const queue = require('./modules/queue');

queue.process('download', (job, done) => {

    console.log(job.data.video_url);
    
    const py = spawn('python', ['download.py', job.data.video_url, job.data.video_name]);
  
    py.stdout.on('data', data => {
  
      console.log(data.toString())
      
    })
  
    py.stderr.on('data', data => {
  
      console.log(data.toString());
      
    })
  
    py.on('exit', () => {
  
        done(null, "Downloaded");
    })
  
})