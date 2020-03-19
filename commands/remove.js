const editJsonFile = require("edit-json-file");

exports.execute = (Lust, message, params, success, error) => {
    if(message.author.id == '393550607090319360' || '287808356779819008') {
        let file = editJsonFile(`${__dirname}/points.json`);
        let user = message.mentions.users.first();
        let fileObj = file.toObject();
        let cur_Points = parseInt(fileObj[user.id]) || 0
        let points = params[1]
        let newPoints = cur_Points - parseInt(points);
        if(newPoints < 0){
            newPoints = 0
        }
        file.set(user.id, newPoints);
        message.channel.send(`${message.author} took ${points} points from ${user}.`);
        file.save();
    } else {
        message.channel.send("You can't use this command.")
    }
}