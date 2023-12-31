import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class WakeUpService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(WakeUpService.name);

  @Cron('0 */5 * * * *')
  async handleCron() {
    const request = this.httpService
      .get(process.env.MY_URL!, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      })
      .pipe(map((res) => res.status));

    this.logger.debug('wake up');
    const responseStatus = await lastValueFrom(request);
    this.logger.debug(`status - ${responseStatus}`);
  }
}
