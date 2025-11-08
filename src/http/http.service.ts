import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class HttpService {
  /**
   *
   * @param cookie
   */
  async getUserStatus(cookie: string): Promise<{
    statusCode: number
    data: any
    success: boolean
    error?: string
  }> {
    try {
      const url = 'https://xxzhiku.com/wp-admin/admin-ajax.php'
      const response = await axios.request({
        url,
        params: {
          action: 'checkin_details_modal',
        },
        data: {
          action: 'checkin_details_modal',
        },
        method: 'GET',
        responseType: 'document',
        headers: {
          Cookie: cookie,
          'sec-ch-ua-platform': '"macOS"',
          Referer: 'https://xxzhiku.com/user/balance',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-ch-ua': '"Not?A_Brand";v="99", "Chromium";v="130"',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 QuarkPC/4.6.2.572',
          Accept: 'application/json, text/javascript, */*; q=0.01',
        },
      })
      return {
        statusCode: response.status,
        data: response.data,
        success: true,
      }
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        data: null,
        success: false,
        error: error.message,
      }
    }
  }

  /**
   *
   * @param cookie
   */
  async checkInRequest(cookie: string): Promise<{
    statusCode: number
    data: any
    success: boolean
    error?: string
  }> {
    try {
      const url = 'https://xxzhiku.com/wp-admin/admin-ajax.php'
      const response = await axios.request({
        url,
        params: {
          action: 'user_checkin',
        },
        data: {
          action: 'user_checkin',
        },
        headers: {
          Cookie: cookie,
          'sec-ch-ua-platform': '"macOS"',
          Referer: 'https://xxzhiku.com/user/balance',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-ch-ua': '"Not?A_Brand";v="99", "Chromium";v="130"',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 QuarkPC/4.6.2.572',
          Accept: 'application/json, text/javascript, */*; q=0.01',
        },
      })
      return {
        statusCode: response.status,
        data: response.data,
        success: true,
      }
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        data: null,
        success: false,
        error: error.message,
      }
    }
  }

  async getYunTu8Nonce(): Promise<{
    statusCode: number
    data: any
    success: boolean
  }> {
    try {
      const url = 'https://yuntu8.com/'
      const response = await axios.get(url, {
        headers: {
          Cookie:
            'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1763718872%7Cu2mjAkk5nq3EnTMJpavAolUk9qmrPjDhd9k7urBMkta%7C681d194b82c2981e526f1b23ffc3dd775f4ae15f00cda2b535d0d2705c2579a2',
        },
      })
      return {
        statusCode: response.status,
        data: response.data,
        success: true,
      }
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        data: null,
        success: false,
      }
    }
  }

  /**
   * @description 云图8签到
   */
  async checkInRequestByYunTu8(nonce:string): Promise<{
    statusCode: number
    data: any
    success: boolean
    error?: string
  }> {
    try {
      const url = 'https://yuntu8.com/wp-admin/admin-ajax.php'
      const response = await axios.request({
        url,
        params: {
          action: 'zb_user_qiandao',
          nonce,
        },
        data: {
          action: 'zb_user_qiandao',
          nonce,
        },
        headers: {
          Cookie:
            'wordpress_25764722f416041464b0663713e06ba5=McCoy2024%7C1763718872%7CLfzOH9s4hD7hp9b0Ql9ORqnZRzLGgxnIVc7EsLq30wH%7Cf10b3a015da23eab165e26fbebd5b6ad6820abbc2be635c38afe98909c9109a5; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2024%7C1763718872%7Cu2mjAkk5nq3EnTMJpavAolUk9qmrPjDhd9k7urBMkta%7C6c5ca8cbbf14add1283694ec4dce4eddbc3cde686d8c9f6f99cb1f1a29b0dfca; _zb_site_notify_auto=1; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762507925; HMACCOUNT=ADA5B0828E7A3A17; _ga=GA1.1.1512938126.1762507925; __itrace_wid=ef940ea8-cf88-44de-1abf-019d7e9fb9c3; wordpress_test_cookie=WP%20Cookie%20check; _zb_mail_captcha_code=YmUrcmFNNzVqOEE9; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1763718872%7Cu2mjAkk5nq3EnTMJpavAolUk9qmrPjDhd9k7urBMkta%7C681d194b82c2981e526f1b23ffc3dd775f4ae15f00cda2b535d0d2705c2579a2; _ga_6G783YG1DZ=GS2.1.s1762507924$o1$g1$t1762509275$j60$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762509276',
          'sec-ch-ua-platform': '"macOS"',
          Referer: 'https://yuntu8.com/user/profile/',
          origin: 'https://yuntu8.com',
          priority: 'u=1, i',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-ch-ua': '"Not?A_Brand";v="99", "Chromium";v="130"',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 QuarkPC/4.6.2.572',
          Accept: 'application/json, text/javascript, */*; q=0.01',
        },
      })
      return {
        statusCode: response.status,
        data: response.data,
        success: true,
      }
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        data: null,
        success: false,
        error: error.message,
      }
    }
  }
}
