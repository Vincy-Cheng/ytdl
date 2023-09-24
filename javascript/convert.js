const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

(async function processLineByLine() {
    try {

        const file = readline.createInterface({
            input: fs.createReadStream('../songs.txt'),
            output: process.stdout,
            terminal: false
        });
        file.on('line', (link) => {
            console.log(link)
            const stream = ytdl(link, {
                filter: 'audioonly',
            });
            const title = ytdl
                .getInfo(link)
                .then((response) => {
                    return response.player_response.videoDetails.title;
                })
                .then((t) => {
                    const transTitle = t.replaceAll(/\\|\/|\:|\*|\?|\"|\<|\>|\|/g,' ')
                    // console.log(transTitle)
                    ffmpeg.setFfmpegPath(ffmpegPath);
                    ffmpeg.setFfprobePath(ffprobePath);
                    ffmpeg(stream)
                        .audioBitrate(256)
                        .save(`downloads/m4a/${transTitle}.m4a`)
                        .on('end', () => {
                            console.log(`Done! Downloaded ${transTitle}`);
                        }).on('error', (e) => {
                            console.log(`Failed: ${transTitle}\nError:`)
                            console.log(e)
                        });
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    } catch (err) {
        console.error(err);
    }
})();
