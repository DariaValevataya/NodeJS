const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cron = require('node-cron');
const jokes = require('./jokes.json');
const facts = require('./facts.json');
const cats = require('./cats.json');

const token = '6531690474:AAHkRtR2mqK0cQXBNpMOult1nkTQIn-baWM';
const weatherApiToken = 'b41371753af43401abf6cdb86835b644';

const bot = new TelegramBot(token, { polling: true });

let subscribers = [];

// random fact
async function sendRandomFact(chatId) {
    try {
        const index = Math.floor(Math.random() * facts.length);
        const fact = facts[index];
        bot.sendMessage(chatId, fact);
    } catch (error) {
        bot.sendMessage(chatId, 'Не удалось получить факт');
    }
}

// /subscribe
bot.onText(/\/subscribe/, (msg) => {
    const chatId = msg.chat.id;
    if (!subscribers.includes(chatId)) {
        subscribers.push(chatId);
        bot.sendMessage(chatId, 'Вы подписались на рассылку случайного факта');
        sendRandomFact(chatId);
    } else {
        bot.sendMessage(chatId, 'Вы уже подписаны на рассылку');
    }
    console.log('Подписчики: [ ', subscribers, ' ]');
});

// /unsubscribe
bot.onText(/\/unsubscribe/, (msg) => {
    const chatId = msg.chat.id;
    if (subscribers.includes(chatId)) {
        subscribers = subscribers.filter(id => id !== chatId);
        bot.sendMessage(chatId, 'Вы отписались от рассылки');
    } else {
        bot.sendMessage(chatId, 'Вы не подписаны на рассылку');
    }
    console.log('Подписчики: [ ', subscribers, ' ]');
});

// use node-cron
if (subscribers.length > 0) {
    cron.schedule('* * 10 * * *', () => {
        subscribers.forEach(chatId => {
            sendRandomFact(chatId);
        });
    });
}

// /joke
bot.onText(/\/joke/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const index = Math.floor(Math.random() * jokes.length);
        const joke = jokes[index];
        bot.sendMessage(chatId, joke);
    } catch (error) {
        bot.sendMessage(chatId, 'Не удалось получить шутку');
    }
});

// /cat 
bot.onText(/\/cat/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const index = Math.floor(Math.random() * cats.length);
        const catImage = cats[index];
        bot.sendPhoto(chatId, catImage);
    } catch (error) {
        bot.sendMessage(chatId, 'Не удалось получить изображение котика');
    }
});

// stikers
const stickerResponses = {
    'hello': 'CAACAgIAAxkBAAEFtCVmU4KqEG9Z8hCFaZURjXg9kyJ_dgACvB0AAgLfWEvZx0BKbPI9rDUE',
    'thanks': 'CAACAgIAAxkBAAEFtB1mU4KV0XpGZVNECSrGEogUJ0RpqAACiBgAAq__WEviym-2--qL_jUE',
    'music': 'CAACAgIAAxkBAAEFtBVmU4Ip20LRVdkQVmbJasW9xDkvhgACvBQAAre4WUubBaVUObWI2jUE',
    'kiss': 'CAACAgIAAxkBAAEFtC1mU4MWfL19WFe51ouJsIQzORmnDQAC2BIAAhS7OUi0ifTH5oLybTUE',
    'kitty': 'CAACAgIAAxkBAAEFtDdmU4N0YP5y5O5JV-9yejrc0pP6HgAC7AADWWGVHY_B5tawM0F6NQQ',
};
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    try {
        const keys = Object.keys(stickerResponses);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == msg.text.toLowerCase()) {
                const sticker = stickerResponses[keys[i]];
                bot.sendSticker(chatId, sticker);
                return;
            }
        }
    }
    catch (error) {
        bot.sendMessage(chatId, 'Не удалось получить отправить стикер');
    }
});

// /weather
bot.onText(/\/weather (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const city = match[1];
    console.log(city)
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiToken}`;
        const response = await axios.get(url);
        const { main, wind } = response.data;
        const weatherInfo = `Информация о погоде в городе ${city}:\nТемпература: ${Math.round(main.temp - 273)}°C\nВлажность воздуха: ${main.humidity}%\nСкорость ветра: ${wind.speed}м/с`;
        bot.sendMessage(chatId, weatherInfo);
    } catch (error) {
        bot.sendMessage(chatId, 'Не удалось получить информацию о погоде');
    }
});

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Вы написали: ' + msg.text);
});
