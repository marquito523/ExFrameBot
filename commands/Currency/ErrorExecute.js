const cmd = require("../../Utils/Errors")

module.exports = {
    name: "entererror",
    async execute(client, message ,args){
        const Error = "Hello A new Error"
        cmd.execute(client, message, args, Error)
    }
}