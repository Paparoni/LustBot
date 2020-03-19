const editJsonFile = require("edit-json-file");

exports.execute = (Lust, message, params, success, error) => {
    let file = editJsonFile(`${__dirname}/points.json`);
    let fileObj = file.toObject();
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
}