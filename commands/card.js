import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/card.js'

export default async (event) => {
  try {
    // 下面那行是深層複製
    const { data } = await axios.get('https://tmc.taipei/show/event/?show_category=&industry_category=')
    const $ = cheerio.load(data)
    const arr = []
    $('#wrapper .m-event-card').each(function (i) {
      if (i >= 12) return false
      const bubble = JSON.parse(JSON.stringify(template))
      bubble.hero.url = $(this).find('.m-event-card__img').attr('data-bg')
      console.log($(this).find('.m-event-card__img').attr('data-bg'))
      bubble.body.contents[0].text = $(this).find('.m-event-card__box-title').text().trim()
      console.log($(this).find('.m-event-card__box-title').text().trim())
      bubble.body.contents[1].contents[0].contents[1].text = $(this).find('.m-event-card__box-bottom-date').text().trim()
      arr.push(bubble)
    })
    await event.reply({
      type: 'flex',
      altText: '北流活動',
      contents: {
        type: 'carousel',
        contents: arr
      }
    })
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤')
  }
}
