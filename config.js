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
global.sudo = process.env.SUDO || "94761516805"
global.devs = '94761516805';
global.website = 'https://github.com/Sithuwa/SITHUWA-MD' //wa.me/+94000000000000
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://telegra.ph/file/15b1dd8aeaa47888d75d7.jpg'
module.exports = {
  sessionName: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUExZ3d3a010SThDNDdRR3VtNXZGYnIrN0tyY0phbUppOWEyekREU29uaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWpuQmlkbmJqUnB0NTY3bENocWp1cmpqaThoMDhkaXdCV0tOSXBtMUlWQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRkZya0haNnJTcEpLYlNGL0o3cHpNZE1FcDhMd3ovQUJDOEhEbmZlK1ZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWWWdtdHo2SFRLZzMxcytNN1BhYndGV0VuLzBrb1BXamd5dFp2ckF4SVZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LTGc0eFNVU04xWGlzbFNRaGI2eWVCd2VwQzV0bUk3T042MkRsbGp2RTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikd4ZWRqS0FYUTNFM1BxYzYzOEEyQXV0Z3QxV0UxdWd6dXpwNkFZM2xzak09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVLMFFFWFNhZGdWVXpaQ1lKWmxvMWZKeUw3Z1ZPMWJPOEdYSGNUVnJIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnJ2TXh4WSt4VmFjekJjZzZobVVmcWlGNFlTVVZocEtiSkNIRkhCVFUwbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklpZWZHMytibkVUWkgxcGVETU51SERic0gwSjVlYTBnV01TT0pzMnNyUDVXZXBsWEdldWdEc2dveGlRajJoSTNxa3VMdGZkM0hwQ2U4cWVIZWpmWWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiIxcXlYUkVXeXR3b2VCOFNKdVpsTHNNWlpmU0ZDcUlMU3JNV0kzZ0oxT2YwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzIxNDQ4MzczQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQyMEI2RjNGQTNCODZFNDUzQ0E2REU2Q0NCQUYyQ0YyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjA5NDYxNTl9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzIxNDQ4MzczQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg2MkU3MkE5QUQ0MjNFREIxMDYwREEwM0MzREJGN0YwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjA5NDYxNjB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFoQnNwQjBxUUplc2s4TUpfTnVNYmciLCJwaG9uZUlkIjoiMTY1NDE5NGYtMDdjMy00MmVmLTk5YTgtMjhhYzMzZWU0OWM2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlgrbHJ4ZFk4eWc0SnhFMFNDWmxwcFErcmpiMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5Z3djWk4xODFaOWFGYmpRb0xxb2c5a1krd289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlNFNVRXM0YiLCJtZSI6eyJpZCI6Ijk0NzIxNDQ4MzczOjEwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ052LzN5Z1E0WnZPdEFZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZmTWc1dkpjcVh4WHE3Z3FYQ3pneXlsY0pnRjBPSGZqazk2RkY0SHNoMU09IiwiYWNjb3VudFNpZ25hdHVyZSI6InNZWFRTZk1MUEtIeXhTQlVPWmxHVnU0RjJJTmxxUk4zczhiRlVZOGpjNnpabHYvWitzbFM3S0ZKMC9Id3hwdXNvTXo3VkozQ2FGV0JKVEZvUjNmZEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJTSzlsOWdxTGR5ckhjQWVCdHo1Y0xaeE0wYi80dWFZYUhiU1lLcHNwQmo5RlpFV25vSzN4amJWMWZFNjhHVmppSzNKUDVrMWhjOU1qUXpjK3pObEhqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzIxNDQ4MzczOjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVueklPYnlYS2w4VjZ1NEtsd3M0TXNwWENZQmREaDM0NVBlaFJlQjdJZFQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA5NDYxNTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR3RwIn0=",      //Put Your Session Id Here
  author:  process.env.PACK_AUTHER ||  'SITHUWA BOT',
  packname:  process.env.PACK_NAME || 'MADE BY SITHUM KALHARA',
  
  botname:   process.env.BOT_NAME === undefined ? "SITHUWA-MD" : process.env.BOT_NAME,
  ownername: process.env.OWNER_NAME === undefined ? 'sithumkalhara' : process.env.OWNER_NAME,  
  auto_read_status :  process.env.AUTO_READ_STATUS === undefined ? false : process.env.AUTO_READ_STATUS,
  autoreaction:  process.env.AUTO_REACTION  === undefined ? false : process.env.AUTO_REACTION ,
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
  WORKTYPE: process.env.WORKTYPE === undefined ? 'public' : process.env.WORKTYPE
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
 
