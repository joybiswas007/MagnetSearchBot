require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//Import command
const start = require("./bot/commands/start.js");
const fetchMagnet = require("./bot/commands/fetchMagnets.js");
const stats = require("./bot/commands/stats.js");

//Use command
fetchMagnet(bot);
start(bot);
stats(bot);
