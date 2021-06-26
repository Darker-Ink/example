const chalk = require('chalk')
global.Discord = require('discord.js')
global.discord = require('discord.js')
const fs = require("fs");
require("dotenv").config();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const event_handler = require('./event');
//Command Handler
function getDirectories() {
    return fs.readdirSync("./commands").filter(function subFolders(file) {
        return fs.statSync("./commands/" + file).isDirectory();
    });
}
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
    const folderFiles = fs
        .readdirSync("./commands/" + folder)
        .filter((file) => file.endsWith(".js"));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}
for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(`./commands/${file[0]}/${file[1]}`);
    } else {
        command = require(`./commands/${file}`);
    }
    client.commands.set(command.name, command);
    console.log(chalk.yellow(`[COMMAND] `) + chalk.green('Command Loaded: ' + command.name))
}

event_handler.performEvents(client); //Event Handler
const eventsfolder = './events/';

fs.readdir(eventsfolder, (err, files) => {
    files.forEach(file => {
        const events = file
            .replace('.js', " ")
        console.log(chalk.magenta('[EVENTS] ') + chalk.green(events));
    });
});
client.login(process.env.token)