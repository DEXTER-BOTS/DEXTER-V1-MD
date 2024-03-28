const translate = require("translate-google-api")
const {Function,isPublic} = require('../lib/');
const config = require('../config')
Function({pattern: 'trt ?(.*)', fromMe: isPublic, desc: 'Google transalte', type: 'search'}, async (m, text, client) => {
if (!m.quoted.text) return await m.reply('_Reply to a text message_\n*Example : trt ml"')
const [to, from] = text.split(' ')
try {
const translated = await translate(m.quoted.text, {tld: "co.in", to: to || config.LANG, from: from})
await m.reply(translated?.join())
} catch (e) {
return await m.reply('_' + e.message + '_')
}
})