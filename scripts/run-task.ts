import { createScriptApp } from './script-config'
import { ScheduleService } from '../src/schedule/schedule.service'

async function runManualTask() {
  const app = await createScriptApp()
  const scheduleService = app.get(ScheduleService)

  try {
    // {
    //   name: 'McCoy2024',
    //     loginCookie:
    //   'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C172e5564e0d3bde3ff2bd0ffdede0ef707759895ef4c8957285551692e315873',
    //     checkInCookie:
    //   'wordpress_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CrkITg8utxZw2w3a1i3M1mo2PM6LC5seVPN9PAFLflYO%7Cc1a35268bd2bbca7d8fa21087acb53f4a8d4e375a6796d542d4953d80e21bf72; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C116cdd46fb24e8d01ac09beedd2254bcf2f3ba04a37d9299012f5b5a2d1f6ddf; _zb_site_notify_auto=1; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1763986046; HMACCOUNT=D9E505BA8CF67ED1; _ga=GA1.1.1878281386.1763986047; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2024%7C1765195775%7CUFqeXIUBpTpI7iMSi40QfNY56XOI6QzUFqL5GZPrkXO%7C172e5564e0d3bde3ff2bd0ffdede0ef707759895ef4c8957285551692e315873; _ga_6G783YG1DZ=GS2.1.s1763986046$o1$g1$t1763986178$j13$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1763986178',
    // },
    // {
    //   name: 'McCoy2025',
    //     loginCookie:
    //   'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd',
    //     checkInCookie:
    //   'wordpress_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CNjuQuzGLvSZLe1LUAdTctyq5nXJl23ozCe9IArEAEf5%7C562ed4bd3fee981eded031dd43dec63c8c5340fd76f71c8f27f7ba19991fc67a; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7C76d777e39bd66f27c958c1b4f6f9e88d561efc1972ae5585d54d05c7bae80956; _zb_site_notify_auto=1; _ga=GA1.1.1257548809.1762782430; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762782430; HMACCOUNT=EBAB582E1712AB2A; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd; _ga_6G783YG1DZ=GS2.1.s1762782430$o1$g1$t1762782474$j16$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762782475',
    // },
    const user = {
      name: 'McCoy2025',
      // password: '',
      loginCookie:
        'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1766588985%7ChYRSGKgPanOnSiX57EmsYoIko8TVpQvfRTpMofX5bPj%7Cf22db33db36a50bd1bc23014e20307f0b6bbbc8b64abbd31275e11e7aff23640',
      checkInCookie:
        'wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1766588985%7ChYRSGKgPanOnSiX57EmsYoIko8TVpQvfRTpMofX5bPj%7Cf22db33db36a50bd1bc23014e20307f0b6bbbc8b64abbd31275e11e7aff23640; wordpress_sec_25764722f416041464b0663713e06ba5=McCoy2025%7C1763992066%7CN835iGy7ZUuOa4dhQOwwSuYZGm7pRYHpzcp6JBFEihs%7C76d777e39bd66f27c958c1b4f6f9e88d561efc1972ae5585d54d05c7bae80956; _zb_site_notify_auto=1; _ga=GA1.1.1257548809.1762782430; Hm_lvt_4a64de5406dfce7063c1933c7c30eadf=1762782430; HMACCOUNT=EBAB582E1712AB2A; wordpress_logged_in_25764722f416041464b0663713e06ba5=McCoy2025%7C1765199717%7Cm5EmPBXrINAAAtW1o3mzdWsJhtGqnf72LGhrCbJ1po9%7Cf9dc169fffb505353b3574450fd0dbb1866e529d917d5eb6a8e1cf1ddf8aa6fd; _ga_6G783YG1DZ=GS2.1.s1762782430$o1$g1$t1762782474$j16$l0$h0; Hm_lpvt_4a64de5406dfce7063c1933c7c30eadf=1762782475',
    }

    // const result = await scheduleService.updateUserAndCheckin(user)
    // const result = await scheduleService.addUserAndCheckin(user)
    const result = await scheduleService.executeTaskByYunTu8(user)
    console.log('✅ 任务完成:', result)
  } catch (error) {
    console.error('❌ 执行失败:', error)
    process.exit(1)
  } finally {
    await app.close()
    console.log('🔚 应用已关闭')
  }
}

runManualTask()