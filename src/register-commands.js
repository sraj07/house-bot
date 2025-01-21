//RUN TO REGISTER NEW COMMANDS AND UPDATE OLD ONES

import dotenv from 'dotenv'
dotenv.config();

import { REST, Routes } from 'discord.js';

const commands = [
    {
        name: 'ping',
        description: 'Pong!',
    },
    {
        name: 'slots',
        description: 'Play a Traditional 3 Reel slot machine!',
    },
    {
        name: 'roll',
        description: 'Roll a 6-sided die',
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async() => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();