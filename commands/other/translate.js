const translate = require('translate-google')

module.exports = {
    name: 'translate',
    description: 'show an example of ping command',
    async execute(client, message, args) {
translate('I speak Chinese', {to: 'french'}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})
    }}