import * as fs from 'fs';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import readline from 'readline';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
import chalk from 'chalk';

(async function processLineByLine() {
  try {
    // Read the songs list
    const file = readline.createInterface({
      input: fs.createReadStream('../songs.txt'),
      output: process.stdout,
      terminal: false,
    });

    // Get each link
    file.on('line', (link: string) => {
      console.log(link);
      const stream = ytdl(link, {
        filter: 'audioonly',
      });

      // Download the youtube video by ytdl
      ytdl
        .getInfo(link)
        .then((response) => {
          return response.player_response.videoDetails.title;
        })
        .then((title: string) => {
          // Replace all invalid characters in the title
          const transTitle = title.replaceAll(
            /\\|\/|\:|\*|\?|\"|\<|\>|\|/g,
            ' ',
          );

          ffmpeg.setFfmpegPath(ffmpegPath);
          ffmpeg.setFfprobePath(ffprobePath);

          // Save the files
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
        .catch((e: Error) => {
          console.log(e);
        });
    });
  } catch (err) {
    console.error(err);
  }
})();
