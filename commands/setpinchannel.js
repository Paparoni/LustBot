const editJsonFile = require("edit-json-file");

exports.execute = (Lust, message, params, success, error) => {
    if(message.author.id == '393550607090319360' || '287808356779819008') {
        const channel = message.mentions.channels.first()
        let file = editJsonFile(`${__dirname}/pin.json`);
        file.set('channel', channel.id);
        file.save();
        message.channel.send(`${channel} is now the Pins channel.`);
    } else {
        message.channel.send("You can't use this command.")

    }

}