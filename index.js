import 'dotenv/config'
import linebot from 'linebot'
import activity from './commands/activity.js'
import card from './commands/card.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  console.log(event)
  if (event.message.type === 'text' && event.message.text === '最近活動') {
    activity(event)
  } else if (event.message.type === 'text' && event.message.text === '最近活動卡片版') {
    card(event)
  }
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人起飛', process.env.PORT || 3000)
})
