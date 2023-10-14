const Counter = require("../db/searchSchema.js");

module.exports = (bot) => {
  bot.onText(/\/stats/, async (msg) => {
    const { id: chatId } = msg.chat;
    const msgId = msg.message_id;
    const options = {
      parse_mode: "HTML",
      reply_to_message_id: msgId,
    };
    const SUDO_USER = parseInt(process.env.SUDO_USER);

    try {
      if (msg.from.id !== SUDO_USER) {
        return bot.sendMessage(
          chatId,
          "<b>You aren't authorized to run this command!.</b>",
          options
        );
      }
      const counts = await Counter.find({});
      bot.sendMessage(
        chatId,
        `<b>Total searches</b>: ${counts[0].count}`,
        options
      );
    } catch (error) {
      bot.sendMessage(chatId, `${error.message}`, options);
    }
  });
};
