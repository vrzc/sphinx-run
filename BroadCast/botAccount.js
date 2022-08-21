
const wait = require("node:timers/promises").setTimeout;
const events = require("events");
const emitter = new events.EventEmitter();
class botAccount {
    constructor(client, discord) {
        this.client = client;
        this.Discord = discord;
    }
    async broadcast({ownerId = [], prefix = "!", embedReply = "Made by Sphinx.", mention = false, type = "all" | "online"}) {
        if(!ownerId) {
            console.error("Owner ID is required.");
            return process.exit(1);
        }
        if(!Array.isArray(ownerId)) {
            console.error("Owner ID must be an array.");
            return process.exit(1);
        }
        if(!prefix) {
            console.error("No prefix was provided, defaulting to '!'.");
        }
        if(!type) {
            console.error("No type was provided, defaulting to 'All'.");
        }
        const row = new this.Discord.MessageActionRow().addComponents(
            new this.Discord.MessageButton()
            .setCustomId("yes")
            .setLabel("Send")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new this.Discord.MessageButton()
            .setCustomId("no")
            .setLabel("Cancel")
            .setStyle("DANGER")
        )
        this.client.on("messageCreate", async(message) => {
            if(!ownerId.includes(message.author.id)) return;
            const args = message.content.slice(prefix.length).trim().split(" ");
            if(message.content.startsWith(prefix + "help")) {
                const embed = new this.Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("BroadCast")
                    .setDescription("This is a bot that broadcasts a message to all users in a server.")
                    .addField("Usage", `${prefix}bc <message>`)
                    .addField("Example", `${prefix}bc Hello World!`)
                    .addField("Permissions", "You must have the 'Send Messages' permission to use this command.")
                    .setFooter("Made by Sphinx.");
                message.channel.send({ embeds: [embed]})
            };
            if(type && type === "all") {
                if(message.content.startsWith(prefix + "bc")) {
                    let words = args.splice(1).join(" ");
                    if(!words) return message.channel.send("No message was provided.");
                    const filter = (i) => 
                    (i.customId === row.components[0].customId && i.user.id === message.author.id) ||
                    (i.customId === row.components[1].customId && i.user.id === message.author.id);
                    let msg = await message.channel.send({ embeds: [
                        new this.Discord.MessageEmbed()
                        .setTitle("Are you sure you want to this send broadcast?")
                        .setDescription(embedReply)
                    ], components: [row]});
                    const collector = msg.createMessageComponentCollector({
                        filter,
                        time: 20000
                    });
                    collector.on("collect", async(i) => {
                        if(i.customId === row.components[0].customId) {
                            message.guild.members.cache.forEach(async(m) => {
                                await wait(5000);
                                m.send(mention ? `${words} \n \n ${m}` : words).then(() => {
                                    console.log(`Sent message to ${m.user.username}#${m.user.discriminator} ✅`);
                                }).catch(() => {
                                    console.log(`Failed to send message to ${m.user.username}#${m.user.discriminator} ❌`);
                                });
                                await wait(5000);
                            });
                            await i.deferUpdate();
    
                            await i.editReply({
                                content: "Done",
                                components: [],
                                embeds: []
                            })
                        }
                        if(i.customId === row.components[1].customId) {
                            await i.deferUpdate();
                            await i.editReply({
                                content: "Cancelled",
                                components: [],
                                embeds: []
                            })
                        }
                    })
                }
            }
            if(type && type === 'online') {
                if(message.content.startsWith(prefix + "bc")) {
                    let words = args.splice(1).join(" ");
                    if(!words) return message.channel.send("No message was provided.");
                    const filter = (i) => 
                    (i.customId === row.components[0].customId && i.user.id === message.author.id) ||
                    (i.customId === row.components[1].customId && i.user.id === message.author.id);
                    let msg = await message.channel.send({ embeds: [
                        new this.Discord.MessageEmbed()
                        .setTitle("Are you sure you want to this send broadcast?")
                        .setDescription(embedReply)
                    ], components: [row]});
                    const collector = msg.createMessageComponentCollector({
                        filter,
                        time: 20000
                    });
                    collector.on("collect", async(i) => {
                        if(i.customId === row.components[0].customId) {
                            message.guild.members.cache.forEach(async(m) => {
                                if(m.presence?.status !== 'offline') {
                                    await wait(5000);
                                    m.send(mention ? `${words} \n \n ${m}` : words).then(() => {
                                        console.log(`Sent message to ${m.user.username}#${m.user.discriminator} ✅`);
                                    }).catch(() => {
                                        console.log(`Failed to send message to ${m.user.username}#${m.user.discriminator} ❌`);
                                    });
                                    await wait(5000);
                                }
                            });
                            await i.deferUpdate();
    
                            await i.editReply({
                                content: "Done",
                                components: [],
                                embeds: []
                            })
                        }
                        if(i.customId === row.components[1].customId) {
                            await i.deferUpdate();
                            await i.editReply({
                                content: "Cancelled",
                                components: [],
                                embeds: []
                            })
                        }
                })
            }
         }
    });
    }
    
}




module.exports = {botAccount}