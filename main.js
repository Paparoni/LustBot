const Discord = require("discord.js");
const Lust = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const PREFIX = '+';
const editJsonFile = require("edit-json-file");

Lust.login('')
Lust.on('ready', () => {
    Lust.user.setActivity('･𝐿𝑢𝑠𝑡･', { type: 'WATCHING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
    console.log('Lust bot online...')
})
Lust.on('message', message => {
    var isCommand = (message.content.toLowerCase().charAt(0) == PREFIX) ? true : false

    if (isCommand) {
        // Sort the arguments into an array for easy access & get the command into a single variable
        var params = message.content.slice(PREFIX.length).trim().split(/ +/g),
            command = message.content.split(PREFIX).pop().split(' ').shift().toLowerCase();

        // Remove the command from the argument array
        params.splice(params.indexOf(command), 1);

        // Run the command asynchronously using a Promise
        var runCommand = new Promise(function(success, error) {
            var commandScript = require('./commands/' + command + '.js');
            commandScript.execute(Lust, message, params, success, error, Discord);
        });

        runCommand.then(function(success) {}, function(error) {
            console.log("Command error: " + error);
        });

    } else {
        return;
    }
})

Lust.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
    if(reaction.emoji.name == '⭐' && reaction.count < 2){
        let file = editJsonFile(`${__dirname}/commands/pin.json`);
        let Pchannel = file.toObject();
        let user = reaction.message.author;
        let LustGuild = reaction.message.guild;
        let member = LustGuild.member(user);
        let displayName = member.displayName || user.username
        console.log(reaction.message.content)
        Lust.channels.fetch(Pchannel.channel).then(chan =>{
            //let attachmentLink = reaction.message.attachments.size > 0 ? reaction.message.attachments.first().url : "";
            //console.log(attachmentLink)
            //console.log(attachmentFile)

            let rEmbed = {
                    "title": `･𝐿𝑢𝑠𝑡･ \n ${displayName}`,
                    "description": '*'+reaction.message.content+'*',
                    "color": 9052048,
                    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${reaction.message.author.id}/${reaction.message.author.avatar}.png`
                    },

                    "image": {
                        "url": reaction.message.attachments.size > 0 ? reaction.message.attachments.first().url : ""
                    },
                    "author": {
                        "name": reaction.message.author.displayName,
                        "icon_url": `https://cdn.discordapp.com/avatars/${reaction.message.author.id}/${reaction.message.author.avatar}.png`
                    }


            }

            chan.send({embed: rEmbed})
        })


    };

});
