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
    console.log(`🎲 ${c.user.tag} is online! 🎲`);
})


//ACTIONS

client.on('messageCreate', async (message) => {

    if (message.author.bot)
        return;

    if (message.content.toUpperCase().includes('WAZA')) {
        await message.channel.send(`WAZAAAA ${message.author.username}!!!!`);
        await message.channel.send('https://tenor.com/view/waaaaazzuuup-gif-17349833848167564456');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });
    }

    if (interaction.commandName === 'slots') {
        let slots = '';
        
        const payoutTable = {
            //requirement: multiplier
            '7,7,7': 50,
            '3bar,3bar,3bar': 30,
            '2bar,2bar,2bar': 20,
            '1bar,1bar,1bar': 10,
            'cherries,cherries,cherries': 5,
        }
        
        let selection;
        for (let i=0; i<3; i++){
            selection = Math.floor(Math.random()*101);
            if (selection == 0)
                slots += 'gremlin,';
            else if (selection <= 8)
                slots += 'blank,'
            else if (selection <= 40)
                slots += 'cherries,';
            else if (selection <= 65)
                slots += '1bar,';
            else if (selection <= 85)
                slots += '2bar,';
            else if (selection <= 95)
                slots += '3bar,';
            else
                slots += '7,';
        }

        

        let slotsList = slots.split(',').slice(0, -1);
        console.log(slotsList);

        const toEmoji = {
            'cherries': ':cherries:',
            '1bar': ':one:',
            '2bar': ':two:',
            '3bar': ':three:',
            '7': '<:7_:1331302219018141706>',
            'gremlin': ':ogre:',
            'blank': ':no_entry_sign:'
        };

        let output = '';
        slotsList.forEach((sym) => {
            output += toEmoji[sym];
        });

        await interaction.reply({ content: `${output}` });
    }
})

client.login(process.env.DISCORD_TOKEN);