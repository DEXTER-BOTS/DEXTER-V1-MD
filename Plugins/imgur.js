const {
	Function,
	Imgur,
	isPublic,
	Vector
} = require("../lib/");
const ffmpeg = require('fluent-ffmpeg');
Function({
	pattern: 'url ?(.*)',
	fromMe: isPublic,
	desc: 'upload files to imgur.com',
	type: 'media'
}, async (m, text, client) => {
	if (!m.reply_message) return m.reply("_Reply to a video/image/audio!_")
	if (/image/.test(m.mine)) {
		const media = await m.reply_message.downloadAndSaveMedia()
		const res = await Imgur(media)
		await m.reply(res.link)
	} else if (/video/.test(m.mine)) {
		const media = await m.reply_message.downloadAndSaveMedia()
		const res = await Imgur(media)
		await m.reply(res.link)
	} else if (/audio/.test(m.mine)) {
		try {
			const media = await m.reply_message.downloadAndSaveMedia()
			ffmpeg(media)
				.outputOptions(["-y", "-filter_complex", "[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]", "-map", "[vid]", "-map 0:a"])
				.save('output.mp4')
				.on('end', async () => {
					var res = await Imgur('output.mp4');
					await m.reply(res.link)
				})
		} catch (e) {
			await m.reply(e.message)
		}
	} else {
		return m.reply("_Reply to a video/image/audio!_")
	}
})