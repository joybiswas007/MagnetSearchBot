const axios = require("axios");
const Counter = require("../db/searchSchema.js");

let search;
let userMessageId;

module.exports = (bot) => {
  bot.onText(/\/search/, (msg, match) => {
    const { id: chatId } = msg.chat;
    userMessageId = msg.message_id;
    search = msg.text.replace(match[0], "").trim();
    if (search.length === 0) {
      return bot.sendMessage(
        chatId,
        "<b>Search string can't be empty. Try again!</b>",
        {
          parse_mode: "HTML",
          reply_to_message_id: userMessageId,
        }
      );
    }
    try {
      const search_options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              { text: "MagnetDL", callback_data: "MagnetDL" },
              { text: "BitSearch", callback_data: "BitSearch" },
            ],
            [
              { text: "Knaben", callback_data: "Knaben" },
              { text: "The Pirate Bay", callback_data: "The Pirate Bay" },
            ],
            [
              { text: "TorLock", callback_data: "TorLock" },
              { text: "Zooqle", callback_data: "Zooqle" },
            ],
            [
              { text: "GloTorrents", callback_data: "GloTorrents" },
              { text: "LimeTorrents", callback_data: "LimeTorrents" },
            ],
            [
              { text: "KickassTorrents", callback_data: "KickassTorrents" },
              { text: "TorrentGalaxy", callback_data: "TorrentGalaxy" },
            ],
          ],
        }),
      };
      bot.sendMessage(chatId, "Choose search engine", search_options);
    } catch (error) {
      bot.sendMessage(chatId, `${error.message}`, {
        reply_to_message_id: userMessageId,
      });
    }
  });
  bot.on("callback_query", async (query) => {
    let url;
    const { id: chat_id } = query.message.chat;
    const message_id = query.message.message_id;
    try {
      const BASE_URL = process.env.URL;
      const search_engine = query.data;
      bot.editMessageText(
        `<em>Searching for ${search} on ${search_engine}</em>`,
        {
          chat_id,
          message_id,
          parse_mode: "HTML",
        }
      );
     if (search_engine === "MagnetDL") {
        url = `${BASE_URL}magnetdl`;
      } else if (search_engine === "BitSearch") {
        url = `${BASE_URL}bitsearch`;
      } else if (search_engine === "Knaben") {
        url = `${BASE_URL}knaben`;
      } else if (search_engine === "TorLock") {
        url = `${BASE_URL}torlock`;
      } else if (search_engine === "Zooqle") {
        url = `${BASE_URL}zooqle`;
      } else if (search_engine === "GloTorrents") {
        url = `${BASE_URL}glotorrents`;
      } else if (search_engine === "LimeTorrents") {
        url = `${BASE_URL}limetorrents`;
      } else if (search_engine === "The Pirate Bay") {
        url = `${BASE_URL}thepiratebay`;
      } else if (search_engine === "KickassTorrents") {
        url = `${BASE_URL}kickasstorrents`;
      } else if (search_engine === "TorrentGalaxy") {
        url = `${BASE_URL}torrentgalaxy`;
      }
      const response = await axios.post(
        url,
        {
          search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
          },
        }
      );
      const magnets = response.data
        .map(
          (magnet) => `
    **${magnet.Name}**
    - Size: ${magnet.Size}
    - Seeders: ${magnet.Seeders}
    - Leechers: ${magnet.Leechers}
    - Magnet: "${magnet.Magnet}"
    `
        )
        .join("\n");
      const paste = await axios.post(process.env.TELE_GRAPH_URL, {
        access_token: process.env.TELE_GRAPH_TOKEN,
        title: search,
        content: [{ tag: "p", children: [magnets] }],
        return_content: true,
      });
      bot.deleteMessage(chat_id, message_id);
      bot.sendMessage(chat_id, `${paste.data.result.url}`, {
        reply_to_message_id: userMessageId,
      });
      await Counter.updateOne({}, { $inc: { count: 1 } }, { upsert: true });
    } catch (error) {
      bot.sendMessage(chat_id, `${error.response.data.error}`, {
        reply_to_message_id: message_id,
      });
    }
  });
};
