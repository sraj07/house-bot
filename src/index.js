import dotenv from 'dotenv'
dotenv.config();

import {
    Client,
    GatewayIntentBits,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,

} from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ]
});

client.on('ready', async (c) => {
    console.log(`🎲 ${c.user.tag} is online! 🎲`)
})


//ACTIONS

client.on('messageCreate', async (message) => {

    if (message.author.bot)
        return;

    if (message.content.toUpperCase().includes('WAZA')) {
        await message.channel.send(`WAZAAAA ${message.author.username}!!!!`);
        await message.channel.send('https://tenor.com/view/waaaaazzuuup-gif-17349833848167564456')
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });
    }

    if (interaction.commandName === 'slots') {
        await interaction.reply({ content: `${Math.floor(Math.random() * 101)}` });
    }
})

client.login(process.env.DISCORD_TOKEN)