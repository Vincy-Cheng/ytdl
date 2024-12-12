import * as fs from 'fs';
// import ytdl from 'ytdl-core';
// Temporary fix 403 error in ytdl-core
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import readline from 'readline';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
import chalk from 'chalk';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function processLineByLine(format) {
    try {
        // Read the songs list
        const file = readline.createInterface({
            input: fs.createReadStream('../songs.txt'),
            output: process.stdout,
            terminal: false,
        });
        // Get each link
        file.on('line', (link) => {
            console.log(`Target: ${link}`);
            const stream = ytdl(link.trim(), {
                filter: 'audioonly',
            });
            // Download the youtube video by ytdl
            ytdl
                .getInfo(link)
                .then((response) => {
                return response.player_response.videoDetails.title;
            })
                .then((title) => {
                // Replace all invalid characters in the title
                const transTitle = title.replaceAll(/\\|\/|\:|\*|\?|\"|\<|\>|\|/g, ' ');
                ffmpeg.setFfmpegPath(ffmpegPath);
                ffmpeg.setFfprobePath(ffprobePath);
                // Check the existence of directories
                if (!fs.existsSync('download')) {
                    fs.mkdirSync('download');
                }
                if (!fs.existsSync(`download/${format}`)) {
                    fs.mkdirSync(`download/${format}`);
                }
                // Save the files
                ffmpeg(stream)
                    .audioBitrate(256)
                    .save(`download/${format}/${transTitle}.${format}`)
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
}
rl.question('Please enter audio format:', async function (answer) {
    const format = answer.trim();
    if (format !== 'mp3' && format !== 'm4a') {
        throw new Error(chalk.yellow(`${format} is not available`));
    }
    await processLineByLine(format);
    rl.close();
});
