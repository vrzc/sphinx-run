<center><img align="center" src="https://discord.c99.nl/widget/theme-3/500367748724031492.png"/></center>


# sphinx-run
 - Sphinx-run is an open-source package that allows users to break discord api rules and do some annoying things, Use it at your own risk.

 # How to use.
 Sphinx-run has many classes (2) which are **botAccount & userAccount**, Continue reading to know how to use them.

 # Using **botAccount** Class
 ```js
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [YourIntents]});
const {botAccount} = require("sphinx-run");
new botAccount(client, Discord).broadcast({
    ownerId: ['YourId'], // Your Id, The bot will only work with it.
    prefix: '!', // Bot Prefix
    mention: true, // Allows the bot to ping the user in the dms.
    type: 'online' // Sends to online only!
});
client.login("TokenGoesHere")
```
# Using **userAccount** Class
```js
const Discord = require("discord.js-selfbot-v13"); //npm i discord.js-selfbot-v13
const client = new Discord.Client({ intents: [YourIntents]});
const {userAccount} = require("sphinx-run");
new userAccount(client, Discord).autoReaction({
    channel: 'AnyChannelID',
    user: 'AnyUserID',
    //customBotId: ['SomeBotIDS']
});
client.login("YourToken");
```
[-] Auto Leveling
```js
const Discord = require("discord.js-selfbot-v13"); //npm i discord.js-selfbot-v13
const client = new Discord.Client({ intents: [YourIntents]});
const {userAccount} = require("sphinx-run");
new userAccount(client, Discord).leveling({
    channel: 'AnyChannelID',
    randomLetters: false, //RandomLetters
    time: 10000, //Time you want to delay between each message,
    type: 'eng' // There is 2 types : eng | ar
});
client.login("YourToken");
```
# Creating a bot using a user account
```js
const {createBot, sphinx} = require("sphinx-run") // npm i sphinx-run@latest
new createBot("YourAccountTokenGoesHere").create("BotName");
sphinx.on("GetBotToken", token => {
    console.log(token)
});
```

# Contacts 
- For Support Contact : **Sphinx#8609** || **sphinx@oldsphinx.ml**

# Thanks
- Special thanks to **Skyfall#5367** for editing the tutorial video.
<img src="https://discord.c99.nl/widget/theme-3/1005949759325999104.png">