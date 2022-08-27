import TelegramBot from 'node-telegram-bot-api';
import * as settings from './settings.json' 

const token = settings.token;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg: any) => {
    // TODO: 
})

bot.on("polling_error", console.error);