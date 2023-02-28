# flamecloud_assignment
- Telegram bot name - trello_board_bot
- [Click Here](https://t.me/trello_board_bot) to view the bot on Telegram.

## Presentation Link
https://drive.google.com/file/d/1VEZdLxznPCzcZDJLNhUq79hpc1Gzot4L/view?usp=sharing

## Introduction
This microservice has been made to create and manage Trello boards with the help of Trello.com's APIs and a Telegram bot. It can be used to make and delete boards, add and remove cards from boards.In order to utilize this bot, you need to have a Telegram account first and then search for trello_board_bot, adding it to your Telegram profile.

## Necessities
Before using this microservice, the following is needed:

1. A Trello account with an API key and token
2. A Telegram bot with an API token
3. Node.js be installed on your device

## This service supports commands sent to a Telegram bot for use with the Trello API to accomplish tasks. Here are the commands supported:
1. /createboard [board name] - Constructs a new board with the given name in Trello.
2. /deleteboard [board id]- Eliminates the Trello board.
3. /addcard [card name] to [board name] - Incorporates a card with the specified name to the Trello board.
4. /removecard [card name] to [board name] - Removes the card with the particular name from the Trello board.
5. /boards - Obtains a list of all Trello boards owned by the authenticated user.

# Error Handling
If a problem arises while trying to complete an action, the microservice will send out a notification to the Telegram chat with details about what went wrong and how to fix it. 

## Conclusion
This microservice offers a simple way of making and managing Trello boards by using a Telegram bot. By utilizing the instructions given in this guide, one can rapidly deploy the microservice and start efficiently regulating their Trello boards.

## To get this microservice up and running, do the following:
Clone the repository or download the code
Run npm install in the project directory to download the required dependencies
Create a .env file in the project directory and add your Trello API key and token, as well as your Telegram bot API token.
Launch the microservice by executing the npm start command within the project directory.
