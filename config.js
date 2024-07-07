const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER || '94761516805'  // Make SURE its Not Be Empty, Else Bot Stoped And Errors,
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://SithumKalhara:97531@cluster0.iva7dbo.mongodb.net/?retryWrites=true&w=majority"
global.port= process.env.PORT || 5000
global.email = 'Sithumkalhara271@gmail.com'
global.github = 'https://github.com/Sithuwa/SITHUWA-MD'
global.location = 'Sri Lanka'
global.gurl = 'https://instagram.com' // add your username
global.sudo = process.env.SUDO || "2347061811606"
global.devs = '2347061811606';
global.website = 'https://github.com/Sithuwa/SITHUWA-MD' //wa.me/+94000000000000
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://telegra.ph/file/15b1dd8aeaa47888d75d7.jpg'
module.exports = {
  sessionName: process.env.SESSION_ID || "",      //eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0x5VGhBdzIvSFZkeGZtN2plODUxeXdaWFBsOXQrSlhWZW9qTkI0RjUwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEtEMkdoTWN1anpVOGcvb0QwMHgrTmZ0YWdySjgxYU1IQmtGaDFlT1RtMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTDlYbHBvR2kvbkVoeUpFSi9BdnpNZ3c0M2w1UlE1d0p0dzAwbGtjMDFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyTjZ3YWtuYnVmNklzYUxpaXdEdFcxWEdyTS9HL05UYkdwcDYrbUFqbFdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFET1o2QVQrNXBXbE4wZVhwSm12eWI3Nm9TTlpsN1NoTGhjdHd4MW1WRU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iktla3c2K2N3aitEakdsdnY4WjRLNXhrVVV2czFaemNtTm14QysrWWxya0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENJMEtvb0tUT1pFV0krSjhWOGxWdGpQWXJOa0I2dUxadXh5bVZmRU5Fbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3V2dWhqeC90QnZNNnBXbkJreHI1UENES0t2Z3J2RmFxUWZwaWd1ZmVTOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFRdEVOcGxtTHgwRHBZOEpxTXhDcHp5SUhLYyszM1FFdEx6azBwNFh2c2pwVHpqYXh0U0lhYzl3dnd6M01pOFZCMkk1MElQaVZyeklaZ0k0YXdrUWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiIwOEIzNFViM3dhZFVWUlZ6VGZPR1dLQVZIZmN1VnJEOUw0MnhmbXRWRVdjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJUHVrTkI5eVE4YXVSMzVPRWk0VHlBIiwicGhvbmVJZCI6ImY4ZDQwOWRiLTRmOWEtNDY5NC05NmJhLWQ5MjM4NDllYWY1OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzdlVUVkpwc29DbGpNTitNaG9WNUthRWNiWUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWsrUlJvN3lVb2swNlYxU3FFUUkvcWttUHpjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVRN1dGS1ZEIiwibWUiOnsiaWQiOiIyMzQ3MDYxODExNjA2OjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QhPCdkIvwnZCI8J2QjPCdkJIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kyOG5iSUVFTDNpcWJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZlQWtMdWtJbGJMTXBEVHphZnZPTWpWenB5VmxXa2YvL0JkT25qM1liUU09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkZPUVZuTy9kRmpJTGtlcDdRU3VsZkE0ZStsSUFwTU1aMDhKaGtiaXdIRk9uK0hlZ1g4cDMvVFBnM2hBYURmWm55bmpRd1ZVWWt1VXZzRDZSVlZ2akFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJON1hJQjNFb0ZLUkxWM2tBK3JMaXhNRkJnYWJrRDlqYjBQM0JvcFZxMCt2QktTT2c0cXp5QWd1VWF2elRPVlY5STZSSTBTVWg1WWtuQmdhZ2tiQ1Rndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNjE4MTE2MDY6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiM2dKQzdwQ0pXeXpLUTA4Mm43empJMWM2Y2xaVnBILy93WFRwNDkyRzBEIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMzQ5MDAzfQ==
  author:  process.env.PACK_AUTHER ||  'Smile-bot',
  packname:  process.env.PACK_NAME || 'Smiley🐞',
  
  botname:   process.env.BOT_NAME === undefined ? "SMILE-MD" : process.env.BOT_NAME,
  ownername: process.env.OWNER_NAME === undefined ? 'Smile🔥' : process.env.OWNER_NAME,  
  auto_read_status :  process.env.AUTO_READ_STATUS === undefined ? true : process.env.AUTO_READ_STATUS,
  autoreaction:  process.env.AUTO_REACTION  === undefined ? true : process.env.AUTO_REACTION ,
  antibadword :  process.env.ANTI_BAD_WORD === undefined ? 'nbwoed' : process.env.ANTI_BAD_WORD,
  alwaysonline:  process.env.ALWAYS_ONLINE === undefined ? false : process.env.ALWAYS_ONLINE,
  antifake : process.env.FAKE_COUNTRY_CODE === undefined ? '234' : process.env.FAKE_COUNTRY_CODE,
  readmessage:  process.env.READ_MESSAGE === undefined ? false : process.env.READ_MESSAGE,
  auto_status_saver: process.env.AUTO_STATUS_SAVER === undefined ? false : process.env.AUTO_STATUS_SAVER,
  HANDLERS:  process.env.PREFIX === undefined ? '.' : process.env.PREFIX,
  warncount : process.env.WARN_COUNT === undefined ? 3 : process.env.WARN_COUNT,
  disablepm:  process.env.DISABLE_PM === undefined ? false : process.env.DISABLE_PM,
  levelupmessage:  process.env.LEVEL_UP_MESSAGE === undefined ? false : process.env.LEVEL_UP_MESSAGE,
  antilink:  process.env.ANTILINK_VALUES === undefined ? 'chat.whatsapp.com' : process.env.ANTILINK_VALUES,
  antilinkaction: process.env.ANTILINK_ACTION === undefined ? 'remove' : process.env.ANTILINK_ACTION,
  BRANCH: 'main', 
  ALIVE_MESSAGE:  process.env.ALIVE_MESSAGE === undefined ? '' : process.env.ALIVE_MESSAGE,
  autobio:  process.env.AUTO_BIO === undefined ? false : process.env.AUTO_BIO,
  caption :process.env.CAPTION || "\t*•ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱɪᴛʜᴜᴡᴀ-ᴍᴅ•* ",   //*『sᴜʙsᴄʀɪʙᴇ • ʙʟᴀᴅᴇ ᴛᴇᴄʜ』*\n youtube.com/@blade444"),	
  OPENAI_API_KEY:  process.env.OPENAI_API_KEY === undefined ? false : process.env.OPENAI_API_KEY,
  heroku:  process.env.heroku === undefined ? false : process.env.heroku,
  HEROKU: {
    HEROKU: process.env.HEROKU ||false,
    API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,
    APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME
},
  VERSION: process.env.VERSION === undefined ? 'v.0.0.3' : process.env.VERSION,
  LANG: process.env.THEME|| 'sithuwa-md',
  WORKTYPE: process.env.WORKTYPE === undefined ? 'private' : process.env.WORKTYPE
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
 
