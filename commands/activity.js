import axios from 'axios'
import * as cheerio from 'cheerio'

export default async (event) => {
  console.log('asdasd')
  try {
    const { data } = await axios.get('https://tmc.taipei/show/event/?show_category=&industry_category=')
    const $ = cheerio.load(data)
    let activityTitle = ''
    $('#wrapper .m-event-card__box-title').each(function () {
      activityTitle += $(this).text().trim() + '\n'
    })
    event.reply(activityTitle)
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤')
  }
}
