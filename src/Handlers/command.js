async function loadCommands(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading("Commands", "Status");
    const path = require('path');

    let commandsArray = [];
    await client.commands.clear();

    const eventsDir = path.join(__dirname, '..', 'Commands');

    const commandsFolder = fs.readdirSync(eventsDir);
    //const commandsFolder = fs.readdirSync('./Commands');
    for (folder of commandsFolder) {
        const commandFiles = fs.readdirSync(`${eventsDir}/${folder}`).filter((file) => file.endsWith(".js"));
        //const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {

            const commandFile = require(`${eventsDir}/${folder}/${file}`);
            //const commandFile = require(`../Commands/${folder}/${file}`);
            const properties = { folder, ...commandFile };
            client.commands.set(commandFile.data.name, properties);

            /*
            commandsArray.push(commandFile.data.toJSON());
            table.addRow(file, 'Loaded');
            continue;
            */
            if (commandFile.data.name) {
                commandsArray.push(commandFile.data.toJSON());
                table.addRow(file, "Loaded");
            } else {
                table.addRow(file, "Not loaded");
                continue;
            }
        }
    }
    client.application.commands.set(commandsArray);
    return console.log(table.toString(), "\nLoaded");
}

module.exports = { loadCommands };