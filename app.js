// const fs = require('fs')
// const express = require('express')
// const got = require('got')
// const ytdl = require('ytdl-core')
import got from 'got';
import * as fs from 'fs';
import express from 'express';
import ytdl from 'ytdl-core';
const app = express();

const router = express.Router();

const url =
  'https://mewallpaper.com/thumbnail/nature/7413-snow-mountains-panorama-ice-view-download-hd-wallpaper.jpg';

const url2 =
  'https://cdn.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4';

const youtubeLink = 'https://www.youtube.com/watch?v=AwRAfxBub9M';

const writeStream = fs.createWriteStream('youtube.mp4');
const stream = got.stream(url2);
// stream.on('data', (chunk) => {
//   //console.log(`chunk`, chunk);
//   writeStream.write(chunk);
// });
// stream.on('downloadProgress', ({ transferred, total, percent }) => {
//   const percentage = Math.round(percent * 100);
//   console.log('test ', transferred, '/', total, '-', percentage);
// });
const getVideoInfo = () => {
  ytdl.getInfo(youtubeLink).then((response) => {
    console.log(`response`, response);
  });
};
router.get('/test', (req, res, next) => {
  res.header('Content-Disposition', 'attachment;filename=youtubevideo.mp4');
  const youtubeStream = ytdl(youtubeLink, {
    quality: '18',
    format: 'mp4',
  });
  youtubeStream.on('data', (chunk) => {
    writeStream.write(chunk);
  });

  youtubeStream.on('progress', (a, b, c) => {
    console.log(a, b, c);
  });

  youtubeStream.pipe(res);
});

//getVideoInfo();

app.use('/', router);

app.listen(4000, () => {
  console.log('testing');
});
