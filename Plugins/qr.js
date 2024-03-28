const {
	Function,
	isPublic
} = require("../lib/");
const jimp = require('jimp')
const QRReader = require('qrcode-reader')
Function({
	pattern: 'qr ?(.*)',
	fromMe: isPublic,
	desc: 'qr code reader',
	type: 'misc'
}, async (message, match, client) => {
	if (!message.reply_message) return await message.reply("_Reply to a qr image_")
	if (!message.reply_message.image) return await message.reply("_Reply to a qr image_")
	const {
		bitmap
	} = await jimp.read(await message.reply_message.downloadAndSaveMedia())
	const qr = new QRReader()
	qr.callback = (err, value) =>
		message.reply(err ?? value.result)
	qr.decode(bitmap)
})
Function({
	pattern: 'gqr ?(.*)',
	fromMe: isPublic,
	desc: 'text to qr code',
	type: 'misc'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return await message.reply("_eg .gqr Hermit_")
	await message.client.sendFromUrl(message.chat, `${apiUrl}qrcode?text=${encodeURI(match)}`)
});