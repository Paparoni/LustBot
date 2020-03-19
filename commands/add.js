const editJsonFile = require("edit-json-file");

exports.execute = (Lust, message, params, success, error) => {
    if(message.author.id == '393550607090319360' || '287808356779819008') {
        let file = editJsonFile(`${__dirname}/points.json`);
        let user = message.mentions.users.first();
        let fileObj = file.toObject();
        let cur_Points = parseInt(fileObj[user.id]) || 0
        let points = params[1]
        let newPoints = parseInt(points) + cur_Points;
        file.set(user.id, newPoints);
        message.channel.send(`${message.author} gave ${user} ${points} points.`);
        file.save();
        let keys = Object.keys(fileObj);
        keys.sort(function(a, b) { return fileObj[b] - fileObj[a] });
        let LustGuild = message.guild;
        let fields = []
        for(let i = 0; i < keys.length; i++){
            Lust.users.fetch(keys[i]).then(user=>{
                let member = LustGuild.member(user);
                let displayName = member.displayName;
                fields.push({"name": displayName, "value": fileObj[keys[i]]})
                if (i == keys.length - 1){
                    let lEmbed = {
                        "title": `･𝐿𝑢𝑠𝑡･ Leaderboard`,
                        "description": "Mod points for Rust--I mean Lust server.",
                        "color": 9052048,

                        "fields": fields
                    }
                    message.channel.send({embed: lEmbed});
                }
            });
        }
    } else {
        message.channel.send("You can't use this command.")
    }
}