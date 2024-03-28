const {
	Function,
	isPublic,
	getString
} = require("../lib/");
const Config = require('../config');
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const stream = require('stream');
const {
	promisify
} = require('util');
const pipeline = promisify(stream.pipeline);
const Lang = getString('removebg');
Function({
	pattern: 'rmbg ?(.*)',
	fromMe: true,
	desc: Lang.REMOVEBG_DESC
}, async (m, text, client) => {
	if (!m.reply_message) return await m.reply(Lang.NEED_PHOTO);
	if (!/image/.test(m.mine)) return await m.reply(Lang.NEED_PHOTO);
	if (Config.RBG_API_KEY === false) return await m.reply(Lang.NO_API_KEY);
	var load = await m.reply(Lang.RBGING);
	var location = await m.reply_message.downloadAndSaveMedia();
	var form = new FormData();
	form.append('image_file', fs.createReadStream(location));
	form.append('size', 'auto');
	var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
		body: form,
		headers: {
			'X-Api-Key': Config.RBG_API_KEY
		}
	});
	await pipeline(rbg, fs.createWriteStream('rbg.png'));
	await client.sendMessage(m.jid, {
		image: fs.readFileSync('rbg.png')
	});
	await client.sendMessage(m.jid, {
		delete: load.key
	});
});