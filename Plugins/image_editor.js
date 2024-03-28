const {
	Function
} = require('../lib/');
/* const {
	createCanvas,
	loadImage
} = require('canvas')

Function({
	pattern: 'circle',
	fromMe: true,
	desc: 'crop image in circle',
	type: 'editor'
}, async (message, match) => {
	if (!message.reply_message) return message.reply("_Reply to a image!_")
	if (!message.reply_message.image) return message.reply("_Reply to a image!_")
	const media = await message.reply_message.download()
	const img = await loadImage(media);
	const canvas = createCanvas(img.width, img.height);
	const ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	ctx.globalCompositeOperation = "destination-in";
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
	await message.client.sendMessage(message.jid, {
		image: new Buffer.from(canvas.toDataURL().replace('data:image/png;base64,', ''), 'base64')
	})
}) */