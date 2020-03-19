const editJsonFile = require("edit-json-file");

exports.execute = (Lust, message, params, success, error) => {
    let file = editJsonFile(`${__dirname}/pin.json`);
    let Pchannel = file.toObject();
    console.log(Pchannel.channel);


}