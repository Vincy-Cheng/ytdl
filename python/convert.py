from pytube import YouTube
import os
# run bash /Applications/Python*/Install\ Certificates.command 
# to resolve Mac OSX python ssl.SSLError

# windows 10
# run pip install certifi
# run /Applications/Python*/Install\ Certificates.command
url = "https://www.youtube.com/watch?v=ShP6KqZVQtM"
target_path = "./downloads"
print("Start converting")
yt = YouTube(url)

video = yt.streams.filter(only_audio=True).first()

out_file = video.download(output_path=target_path)

base, ext = os.path.splitext(out_file)
new_file = base + '.mp3'
os.rename(out_file, new_file)

print("target path = " + (new_file))
print("mp3 has been successfully downloaded.")
