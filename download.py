import sys
import os
import youtube_dl as ytdl

if not os.path.isdir('./downloads'):

    os.makedirs('./downloads')

download_options = {

    'format': 'bestaudio/best',
    'outtmpl' : './downloads/{0}.%(ext)s'.format(sys.argv[2]),
    'noncheckcertificate': True,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }]
}

with ytdl.YoutubeDL(download_options) as dl:
    
    url = sys.argv[1]

    dl.download([url])