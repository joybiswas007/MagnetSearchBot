require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//Import command
const fetchMagnet = require("./bot/commands/fetchMagnets.js");

//Use command
fetchMagnet(bot);
