from pytube import YouTube
import os
# run bash /Applications/Python*/Install\ Certificates.command 
# to resolve Mac OSX python ssl.SSLError

# windows 10
# run pip install certifi
# run /Applications/Python*/Install\ Certificates.command

# file1 = open('myfile.txt', 'r')
# Lines = file1.readlines()

url = "https://www.youtube.com/watch?v=ShP6KqZVQtM"
target_path = "./downloads"
print("Start converting")
yt = YouTube(url)
print('ytdl')
video = yt.streams.filter(only_audio=True).first()
print('convert to stream')
out_file = video.download(output_path=target_path)
print('out file')
base, ext = os.path.splitext(out_file)
new_file = base + '.m4a'
os.rename(out_file, new_file)

print("target path = " + (new_file))
print("Audio has been successfully downloaded.")
