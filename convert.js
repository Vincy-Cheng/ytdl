// import { Injectable } from '@nestjs/common';
// import got from 'got';
// // import * as fs from 'fs';
// // import * as ytdl from 'ytdl-core';
// import * as ffmpeg from 'fluent-ffmpeg';
// import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
// import * as ffprobePath from '@ffprobe-installer/ffprobe';
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');
const { async } = require('rxjs');

(async function processLineByLine() {
    try {

        const file = readline.createInterface({
            input: fs.createReadStream('songs.txt'),
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
                    const transTitle = t.replaceAll(/\\|\/|\:|\*|\?|\"|\<|\>|\|/g)
                    console.log(transTitle)
                    ffmpeg.setFfmpegPath(ffmpegPath);
                    ffmpeg.setFfprobePath(ffprobePath);
                    ffmpeg(stream)
                        .audioBitrate(320)
                        .save(`download/m4a/${transTitle}.m4a`)
                        .on('end', () => {
                            console.log('Done! Downloaded');
                        }).on('error', (e) => {
                            console.log('error!!!!')
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
