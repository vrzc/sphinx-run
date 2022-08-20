//CopyRights Claimed for Sphinx Year 2022
/**
 * @Author Sphinx
 * @Description UserAccountFile , Maintaines all user realted codes.
 */
const {codeBlock} =  require("@discordjs/builders");
const axios = require('axios');
const wait = require("node:timers/promises").setTimeout;
 class userAccount {
    constructor(client, discord) {
        this.client = client;
        this.Discord = discord;
    }
    autoReaction({channel, user, token, sessionid = '636e16489c6fd773fbb37bdb212ecf3a'}) {
        this.client.on("messageCreate", async (message) => {
            if (message.author.id === "294882584201003009") {
              if (!message.embeds[0]) return;
              if (message.content.startsWith("Congratulations")) return;
              //check if the embed is a giveaway embed
              if(!message.embeds[0]?.description?.includes('Ends')) return;
              let mainChannel = await this.client.channels.fetch(channel);
              let mainUser = await this.client.users.fetch(user);
              await wait(2000);
              axios.post('https://discord.com/api/v9/interactions', {
                application_id: '294882584201003009',
                channel_id: message.channel.id,
                data: {
                  component_type: 2,
                  custom_id: 'enter-giveaway',
                },
                guild_id: message.guild.id,
                message_flags: 0,
                message_id: message.id,
                type: 3,
                session_id: sessionid //unknown (Changeable)
              }, { headers: { Authorization: token, 'Content-Type': 'application/json' } }).then(async(res) => {
                mainChannel.send(`New Giveaway ${mainUser}`);
                await mainChannel.send({
                  content: codeBlock(
                    "md",
                    `New Giveaway At: \n **${message.url}** \n\n Giveaway Created At: \n ${
                      new Date(message.createdAt).getHours()
                    }:${new Date(message.createdAt).getMinutes()}:${new Date(message.createdAt).getSeconds()} \n\n Giveaway Ends At : \n ${new Date(message.embeds[0].timestamp).getHours()}:${new Date(message.embeds[0].timestamp).getMinutes()}:${new Date(message.embeds[0].timestamp).getSeconds()}`
                  ),
                });
              })


            }

          });
    }
    leveling({
        channel,
        randomLetters = false,
        time = 15000,
        type = 'eng'
    }) {
        if (!channel) {
            console.error(new Error("No channel id were specified!"));
            return process.exit(1);
          }
          
          if(type === 'eng') {
            function makeid(length) {
              var result = "";
              var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              var charactersLength = characters.length;
              for (var i = 0; i < length; i++) {
                result += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                );
              }
              return result;
            }
            const Discord = this.Discord;
            const client = this.client;
            let arrayOfMostUsedWords = require("../languages.json").eng;
            client.on("ready", async() => {
              console.log("Leveling class is ready!");
              let mainChannel = await client.channels.fetch(channel);
              let random = Math.floor(Math.random() * 15);
              if (random === 0) return;
              setInterval(async () => {
                let randomString = Math.floor(Math.random() * arrayOfMostUsedWords.length);
                await mainChannel.send(
                  randomLetters ? makeid(random) : arrayOfMostUsedWords[randomString]
                );
              }, time);
            });
        }
        if(type === 'ar') {
            function makeid(length) {
              var result = "";
              var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              var charactersLength = characters.length;
              for (var i = 0; i < length; i++) {
                result += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                );
              }
              return result;
            }
            const Discord = this.Discord;
            const client = this.client;
            let arrayOfMostUsedWords = require("../lanuages.json").eng;
            client.on("ready", async() => {
              console.log("Leveling class is ready!");
              let mainChannel = await client.channels.fetch(channel);
              let random = Math.floor(Math.random() * 15);
              if (random === 0) return;
              setInterval(async () => {
                let randomString = Math.floor(Math.random() * arrayOfMostUsedWords.length);
                await mainChannel.send(
                  randomLetters ? makeid(random) : arrayOfMostUsedWords[randomString]
                );
              }, time);
            });
        }
    }
    
}

module.exports = {userAccount};
