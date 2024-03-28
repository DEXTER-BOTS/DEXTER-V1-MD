const {
	Function,
	setCmd,
	delCmd,
	prepareCmd,
	getCmdList,
	isPublic
} = require("../lib/");
Function({
	pattern: 'setcmd ?(.*)',
	fromMe: true,
	desc: 'to set audio/image/video as a cmd',
	type: 'user'
}, async (m, text, client) => {
	if (!m.quoted) return await m.reply('_Reply to a image/video/audio/sticker_')
	if (!text) return await m.reply('_Example : setcmd ping_')
	if (!m.quoted.data.message[m.quoted.mtype].fileSha256) return await m.reply('_Failed_')
	const setcmd = await setCmd(m, text);
	if (!setcmd) return await m.reply('_Failed_')
	await m.reply('_Success_')
});

Function({
	pattern: 'delcmd ?(.*)',
	fromMe: true,
	desc: 'to delete audio/image/video cmd',
	type: 'user'
}, async (m, text, client) => {
	if (!m.quoted) return await m.reply('_Reply to a image/video/audio/sticker_')
	let hash = m.quoted.data.message[m.quoted.mtype].fileSha256.toString('base64')
	if (!hash) return await m.reply('_Failed_')
	const delcmd = await delCmd(m)
	if (!delcmd) return await m.reply('_Failed_')
	await m.reply('_Success_')
});

Function({
	pattern: 'listcmd ?(.*)',
	fromMe: true,
	desc: 'to get List cmd',
	type: 'user'
}, async (m) => {
	const cmd = await getCmdList()
	await m.reply(cmd)
});
Function({
	on: 'audio',
	fromMe: isPublic
}, async (message) => {
	await prepareCmd(message)
});

Function({
	on: 'sticker',
	fromMe: isPublic
}, async (message) => {
	await prepareCmd(message)
});

Function({
	on: 'video',
	fromMe: isPublic
}, async (message) => {
	await prepareCmd(message)
});

Function({
	on: 'image',
	fromMe: isPublic
}, async (message) => {
	await prepareCmd(message)
});