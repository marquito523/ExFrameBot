const muteModel = require('../Models/mute')
const mongodb = require("mongoose")
const { DB_PASSWORD, DB_NAME } = require("../../config.json")
const {MARQPASS, MARQNAME} = require('../../config.json')
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}


const { defaultprefix } = require("../../config.json")

module.exports = {
    execute(client){

        mongodb.connect(`mongodb+srv://MarqBot:${MARQPASS}@cluster0.njkac.mongodb.net/${MARQNAME}?retryWrites=true&w=majority`, dbOptions).then(console.log("Conncetion Succes!"))
        //mongodb.connect(`mongodb+srv://marquito523:${DB_PASSWORD}@cluster0.qmekk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, dbOptions).then(console.log('------------------------ \n \n Connection To MongoDB Succeeded.'))
         console.log(`\n \n ------------------------ \n \n --${client.user.username} Is Currently Running-- \n \n ------------------------ \n \n ${client.user.username} is ready to serve all the server.  \n \n ------------------------ \n \n Commands are all seted up! \n \n ------------------------ \n \n Using MongoDB | Using Discord Player | Using Discord.js \n \n ------------------------`);
          setInterval(() => {
              const statuses = [`${defaultprefix}help||${client.guilds.cache.size} guilds, not bad`, `${defaultprefix}help to start!`, `${defaultprefix}help|| ${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)} users O.o`, `${defaultprefix}help|| Hey guys, have a great day!`];
              const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
              client.user.setActivity(randomStatus, {
                  type: 'WATCHING',
              });
          }, 60000);
          setInterval(async () => {
              for(const guild of client.guilds.cache) {
                  const muteArray = await muteModel.find({
                      guildID: guild[0],
                  })
                  for(const muteDoc of muteArray) {
                      if(Date.now() >= Number(muteDoc.length)) {
                          const guild = client.guilds.cache.get(muteDoc.guildID);
                          const member = guild ? guild.members.cache.get(muteDoc.memberID) : null;
                          const muteRole = guild ? guild.roles.cache.find(r => r.name == 'Muted') : null;
                          if(member) {
                              await member.roles.remove(muteRole ? muteRole.id : '').catch(e => console.log(e))
                              for(const role of muteDoc.memberRoles) {
                                  await member.roles.add(role).catch(e => console.log(e));
                              }
                          }
                          await muteDoc.deleteOne().catch(e => console.log(e));
                      }
                  }
              }
          }, 60000)
    }
}