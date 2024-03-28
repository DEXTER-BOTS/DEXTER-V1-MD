const {Function,isPublic,getUrl} = require("../lib/");
Function({pattern: 'ss ?(.*)', fromMe: isPublic, desc: 'Take website screenshot', type: 'download'}, async (message, match) => {
match = getUrl(match || message.reply_message.text)
if (!match) return await message.send('_Need a Url_\n*Example : ss https://h-e-r-m-i-t-web.herokuapp.com/deployment*')
await message.client.sendFromUrl(message.jid, `https://h-e-r-m-i-t-web.herokuapp.com/api/ssweb?url=${match}`)
})
Function({pattern: 'fullss ?(.*)', fromMe: isPublic, desc: 'Take website Full screenshot', type: 'download'}, async (message, match) => {
match = getUrl(match || message.reply_message.text)
if (!match) return await message.send('_Need a Url_\n*Example : fullss https://h-e-r-m-i-t-web.herokuapp.com/deployment*')
await message.client.sendFromUrl(message.jid, `https://shot.screenshotapi.net/screenshot?&url=${match}&full_page=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&destroy_screenshot=true&dark_mode=true&wait_for_event=networkidle`)
})