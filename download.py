import sys
import youtube_dl as ytdl

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