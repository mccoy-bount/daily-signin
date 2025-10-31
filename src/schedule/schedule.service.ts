import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '../http/http.service'
import * as cheerio from 'cheerio';
// import { TaskService } from '../task/task.service';
// cheerio
@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name)

  constructor(
    private readonly httpService: HttpService
    // private readonly taskService: TaskService,
  ) {}

  // 每天上午8点执行 (可以根据环境变量配置)
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleDailyRequest() {
    this.logger.log('Starting daily scheduled request... checkInRequest')
    // const { statusCode, data } = await this.httpService.checkInRequest(
    //   'wordpress_sec_c6a1867717aa7bcf43222bce9924133b=aaa111%7C1763128342%7Cpep84LnsF3yyHYKqd67jzFmgPoSoYVcrLYGOtVHNyEu%7C511e73d88cd18a627e830696a2f2261c66a6e1ec5e1f7be0afa9e9d06fbb60f5; PHPSESSID=0o8popavpv3b4pfa57smn74vrc; Hm_lvt_c801a5410f40093ea649a71736d0ed2b=1761918721; HMACCOUNT=5DC7409849801C48; wordpress_logged_in_c6a1867717aa7bcf43222bce9924133b=aaa111%7C1763128342%7Cpep84LnsF3yyHYKqd67jzFmgPoSoYVcrLYGOtVHNyEu%7Ce76aa40ee79e6510e66007513f17b4263762a8b900ca82728322777726023f63; Hm_lpvt_c801a5410f40093ea649a71736d0ed2b=1761918744'
    // )
    // console.log(statusCode, data)
    const html = await this.httpService.getUserStatus(
        'wordpress_sec_c6a1867717aa7bcf43222bce9924133b=aaa111%7C1763128342%7Cpep84LnsF3yyHYKqd67jzFmgPoSoYVcrLYGOtVHNyEu%7C511e73d88cd18a627e830696a2f2261c66a6e1ec5e1f7be0afa9e9d06fbb60f5; PHPSESSID=0o8popavpv3b4pfa57smn74vrc; Hm_lvt_c801a5410f40093ea649a71736d0ed2b=1761918721; HMACCOUNT=5DC7409849801C48; wordpress_logged_in_c6a1867717aa7bcf43222bce9924133b=aaa111%7C1763128342%7Cpep84LnsF3yyHYKqd67jzFmgPoSoYVcrLYGOtVHNyEu%7Ce76aa40ee79e6510e66007513f17b4263762a8b900ca82728322777726023f63; Hm_lpvt_c801a5410f40093ea649a71736d0ed2b=1761918744'
    )
    const $ = cheerio.load(html as string);
    const money = $('.mb20 .em12').text()
    console.log(money)
  }

  // 手动触发请求的测试方法
  async triggerManualRequest(): Promise<any> {
    this.logger.log('Triggering manual request...')

    // const url = process.env.TARGET_URL;
    // const method = process.env.REQUEST_METHOD || 'POST';
    // const payload = process.env.REQUEST_PAYLOAD
    //     ? JSON.parse(process.env.REQUEST_PAYLOAD)
    //     : undefined;
    //
    // const result = await this.httpService.sendRequest(url, method, payload);
    //
    // // 记录任务执行结果
    // await this.taskService.createTaskLog(
    //     url,
    //     method,
    //     payload,
    //     result.data,
    //     result.statusCode,
    //     result.success ? 'success' : 'failed',
    //     result.error,
    // );
    //
    // return {
    //   success: result.success,
    //   statusCode: result.statusCode,
    //   data: result.data,
    //   error: result.error,
    // };
  }
}
