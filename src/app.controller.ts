import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }
  @Post('youtube')
  getFile(@Body() body) {
    return this.appService.convert(body.youtubelink);
  }

  @Post('m4a')
  transfer(@Body() body) {
    return this.appService.transfer(body.youtubelink);
  }
}
