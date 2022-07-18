import { Injectable } from '@nestjs/common';
import got from 'got';
import * as fs from 'fs';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as ffprobePath from '@ffprobe-installer/ffprobe';

@Injectable()
export class AppService {
  getHello(): string {
    //this.convertFile();
    return 'Hello World!';
  }
  async convert(link: string) {
    // const output_dir = path.join(__dirname);

    const stream = ytdl(link, {
      filter: 'audioonly',
    });
    const title = await ytdl
      .getInfo(link)
      .then((response) => {
        // console.log(`response`, response);
        //console.log(response);
        return response.player_response.videoDetails.title;
      })
      .catch((e) => {
        console.log(e);
      });
    //console.log(res);
    ffmpeg.setFfmpegPath(ffmpegPath.path);
    ffmpeg.setFfprobePath(ffprobePath.path);
    ffmpeg(stream)
      .audioBitrate(320)
      .save(`download/mp3/${title}.mp3`)
      .on('end', () => {
        console.log('Done! Downloaded');
      });

    return title;
  }

  async convertFile(link: string) {
    const url =
      'https://mewallpaper.com/thumbnail/nature/7413-snow-mountains-panorama-ice-view-download-hd-wallpaper.jpg';
    const writeStream = fs.createWriteStream('youtube.mp4');

    const url2 =
      'https://cdn.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4';

    const stream = got.stream(url2);
    // stream.on('data', (chunk) => {
    //   //console.log(`chunk`, chunk);
    //   writeStream.write(chunk);
    // });

    // stream.on('downloadProgress', ({ transferred, total, percent }) => {
    //   const percentage = Math.round(percent * 100);
    //   console.log('test ', transferred, '/', total, '-', percentage);
    // });
    // const youtubeLink = 'https://www.youtube.com/watch?v=AwRAfxBub9M';
    const youtubeLink = link;
    await this.getVideoInfo(link);
    // console.log(ytdl);

    const youtubeStream = ytdl(youtubeLink, {
      quality: '18',
    });
    youtubeStream.on('data', (chunk) => {
      writeStream.write(chunk);
      //console.log(chunk);
    });
    // youtubeStream.on('progress', (a, b, c) => {
    //   console.log(a, b, c);
    // });
    console.log('end');
  }
  async getVideoInfo(link: string) {
    const youtubeLink = link;
    let res;
    ytdl
      .getInfo(youtubeLink)
      .then((response) => {
        // console.log(`response`, response);
        //console.log(response);
        return response;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async transfer(link: string) {
    // const output_dir = path.join(__dirname);

    const stream = ytdl(link, {
      filter: 'audioonly',
    });
    const title = await ytdl
      .getInfo(link)
      .then((response) => {
        // console.log(`response`, response);
        //console.log(response);
        return response.player_response.videoDetails.title;
      })
      .catch((e) => {
        console.log(e);
      });
    //console.log(res);
    ffmpeg.setFfmpegPath(ffmpegPath.path);
    ffmpeg.setFfprobePath(ffprobePath.path);
    ffmpeg(stream)
      .audioBitrate(320)
      .save(`download/m4a/${title}.m4a`)
      .on('end', () => {
        console.log('Done! Downloaded');
      });

    return title;
  }
}
