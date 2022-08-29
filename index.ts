import TelegramBot from 'node-telegram-bot-api'
import * as settings from './settings.json' 

const token = settings.token
const bot = new TelegramBot(token, {polling: true})
const adminId = settings.adminId

bot.on('message', (msg: any) => {
    const chatId = msg.from.id
    const userId = msg.from.username

    if(msg.text=='/start'){
        const startedMessage = "Привет! Это бот-аггрегатор новостей. Пришли мне новость и, возможно, мы ее опубликуем. Возможно :)"
        bot.sendMessage(chatId, startedMessage)
        return
    } 

    if('text' in msg || 'caption' in msg){
        const isMessageWithPicture = 'caption' in msg
        let text = null
        let photo = null

        if(isMessageWithPicture){
            text = msg.caption;
            photo = [{
                type: "photo",
                media: msg.photo[0].file_id
            }]
        } else {
            text = msg.text
        }

        if(adminId != chatId){
            text = `Поступила новость от пользователя @${userId}: \n` + text
            bot.sendMessage(adminId, text)
    
            if(!!photo) {
                bot.sendMediaGroup(adminId, photo)
            }    
        }

        bot.sendMessage(chatId, "Спасибо за новость! Отправим ее на модерацию :)")

    } else {
        bot.sendMessage(chatId, "Пришли, пожалуйста, также и описание к новости. Просто с картинками мы не работаем :)")
        return
    }
})

bot.on("polling_error", console.error)