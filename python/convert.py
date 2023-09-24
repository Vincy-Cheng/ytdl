from pytube import YouTube
import os
# run bash /Applications/Python*/Install\ Certificates.command 
# to resolve Mac OSX python ssl.SSLError

# windows 10
# run pip install certifi
# run /Applications/Python*/Install\ Certificates.command

# Read the songs.txt


# songs = open('../songs.txt', 'r')
# links = songs.readlines()



# for link in links:
#     print("song:{}".format(link.strip()))
#     Download(link)

yt = YouTube('http://youtube.com/watch?v=2lAe1cqCOXo')
stream = yt.streams
print(stream)


# from pytube import YouTube
