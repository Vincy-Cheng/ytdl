import * as fs from 'fs';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import readline from 'readline';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
import chalk from 'chalk';
(async function processLineByLine() {
    try {
        const file = readline.createInterface({
            input: fs.createReadStream('../songs.txt'),
            output: process.stdout,
            terminal: false,
        });
        file.on('line', (link) => {
            console.log(link);
            const stream = ytdl(link, {
                filter: 'audioonly',
            });
            ytdl
                .getInfo(link)
                .then((response) => {
                return response.player_response.videoDetails.title;
            })
                .then((title) => {
                const transTitle = title.replaceAll(/\\|\/|\:|\*|\?|\"|\<|\>|\|/g, ' ');
                ffmpeg.setFfmpegPath(ffmpegPath);
                ffmpeg.setFfprobePath(ffprobePath);
                ffmpeg(stream)
                    .audioBitrate(256)
                    .save(`download/m4a/${transTitle}.m4a`)
                    .on('end', () => {
                    console.log(chalk.green(`Done! Downloaded ${transTitle}`));
                })
                    .on('error', (e) => {
                    console.log(chalk.red(`Failed: ${transTitle}\nError:`));
                    console.log(e);
                });
            })
                .catch((e) => {
                console.log(e);
            });
        });
    }
    catch (err) {
        console.error(err);
    }
})();
