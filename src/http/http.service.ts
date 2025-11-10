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

  async getYunTu8Nonce(loginCookie: string): Promise<{
    statusCode: number
    data: any
    success: boolean
  }> {
    try {
      const url = 'https://yuntu8.com/'
      const response = await axios.get(url, {
        headers: {
          Cookie: loginCookie,
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
  async checkInRequestByYunTu8(
    nonce: string,
    checkInCookie: string
  ): Promise<{
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
          Cookie: checkInCookie,
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
