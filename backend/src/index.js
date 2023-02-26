require("dotenv").config()
const Agent = require('socks5-https-client/lib/Agent')
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fetch = require('node-fetch');
const Trello = require('trello');
const TOKEN = process.env.BOT_API
const TRELLO_API = process.env.TRELLO_API
const TRELLO_TOKEN = process.env.TRELLO_TOKEN

const bot = new TelegramBot(TOKEN, {
    polling: true,
    request: {
        agentClass: Agent,
        agentOptions: {
            socksHost: process.env.PROXY_SOCKS5_HOST,
            socksPort: parseInt(process.env.PROXY_SOCKS5_PORT),
            // If authorization is needed:
            // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
            // socksPassword: process.env.PROXY_SOCKS5_PASSWORD
        }
    }
});
const trello = new Trello(TRELLO_API, TRELLO_TOKEN);


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to TrelloBot! Use /createboard to create a new Trello board.');
});

bot.onText(/\/createboard (.+)/, (msg, match) => {
    const boardName = match[1];
    trello.addBoard(boardName)
        .then((board) => bot.sendMessage(msg.chat.id, `Board created successfully! Board ID: ${board.id}`))
        .catch((err) =>
            bot.sendMessage(msg.chat.id, `Error: ${err.message}`))
});


bot.onText(/\/deleteboard (.+)/, (msg, match) => {
    const boardId = match[1];
    fetch(`https://api.trello.com/1/boards/${boardId}?key=${TRELLO_API}&token=${TRELLO_TOKEN}`, {
        method: 'DELETE'
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            bot.sendMessage(msg.chat.id, `Board deleted.`)
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
});


bot.onText(/\/addcard (.+) to (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const cardName = match[1];
    const listName = match[2];
    const boardName = match[2];

    try {

        const boards = await trello.getBoards('me');
        const board = boards.find(b => b.name === boardName);

        if (!board) {
            throw new Error(`Trello board ${boardName} not found`);
        }

        console.log('Found board:', board);

        if (!board.closed) {

            const lists = await trello.getListsOnBoard(board.id);
            const list = lists.find(l => l.name === "To Do");

            if (!list) {
                throw new Error(`Trello list "${listName}" not found on board "${board.name}"`);
            }

            console.log('Found list:', list);


            const card = await trello.addCard(cardName, null, list.id);

            bot.sendMessage(chatId, `Successfully added card "${cardName}" to Trello board "${board.name}"`);
        } else {
            throw new Error(`Trello board "${board.name}" is closed`);
        }
    } catch (err) {
        bot.sendMessage(chatId, `Error adding card to Trello board: ${err.message}`);
    }
});


bot.onText(/\/removecard (.+) to (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const cardName = match[1];
    const boardName = match[2];

    try {
        const boards = await trello.getBoards('me');
        const board = boards.find(b => b.name === boardName);

        if (!board) {
            throw new Error(`Trello board ${boardName} not found`);
        }
        console.log('Found board:', board);
        const cards = await trello.getCardsOnBoard(board.id);
        const card = cards.find(c => c.name === cardName);

        if (!card) {
            throw new Error(`Trello card "${cardName}" not found on board "${board.name}"`);
        }

        console.log('Found card:', card);

        await trello.deleteCard(card.id);
        bot.sendMessage(chatId, `Successfully removed card "${cardName}" from Trello board "${board.name}"`);
    } catch (err) {
        bot.sendMessage(chatId, `Error removing card from Trello board: ${err.message}`);
    }
});

bot.onText(/\/boards/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const boards = await trello.getBoards('me')
        if (!boards || boards.length === 0) {
            throw new Error('No Trello boards found');
        }
        const boardList = boards.map((board) => {
            return `- ${board.name} (${board.url})`;
        }).join('\n');
        bot.sendMessage(chatId, `Here are your Trello boards:\n${boardList}`);
    } catch (err) {
        bot.sendMessage(chatId, `Error getting Trello boards: ${err.message}`);
    }
});