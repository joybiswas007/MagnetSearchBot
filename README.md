# Magnet Search Bot
A Telegram bot created for searching magnet links from various public torrent trackers.

## Available commands
All commands requires search string.
```
/search "search query" 

```

## Requirements
First clone the repo: 

Navigate to the cloned directory: 

Install dependencies: ``` npm install ```

Create a `.env` file inside the directory and fill in all the details.

Example `.env` file:
```
BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ // Grab your telegram bot token from BotFather
URL=http://localhost:10000/torrents/api/v1/
TELE_GRAPH_URL=https://api.telegra.ph/createPage
TELE_GRAPH_TOKEN=YOURTOKENHERE // Visit https://telegra.ph/api and grab your token
MONGODB_URI=EnterYourMongoDBUrlHere
```

## Usage
To run the bot, use the following command: ``` npm run dev ```
