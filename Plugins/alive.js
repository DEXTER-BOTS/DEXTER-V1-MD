const {
	Function,
	isPublic,
	sendAlive,
	runtime,
	chatBot,
	isChatBot,
	chatbot
} = require("../lib/");
const config = require('../config')

Function({
	pattern: 'ping ?(.*)',
	fromMe: isPublic,
	desc: 'Bot response in second.',
	type: 'info'
}, async (message, match, client) => {
	var start = new Date().getTime();
	var msg = await message.reply('*Pinging...*');
	var end = new Date().getTime();
	var responseTime = end - start;
	await msg.edit(`*Pong!*\nLatency: ${responseTime}ms`);
});

Function({
	pattern: 'alive ?(.*)',
	fromMe: isPublic,
	desc: 'Does bot work?',
	type: 'info'
}, async (message, match, client) => {
	await sendAlive(client, message, match);
});

Function({
	pattern: 'jid',
	fromMe: isPublic,
	desc: 'to get remoteJid',
	type: 'whatsapp'
}, async (message) => {
	await message.reply(message.mentionedJid[0] ? message.mentionedJid[0] : message.quoted ? message.quoted.sender : message.chat)
});

Function({
	pattern: 'runtime',
	fromMe: isPublic,
	desc: 'get bots runtime',
	type: 'info'
}, async (message, match, client) => {
	await message.send(await runtime(process.uptime()));
});

Function({
	pattern: 'chatbot ?(.*)',
	fromMe: true,
	desc: 'set chat bot',
	type: 'misc'
}, async (message, match) => {
	await chatBot(message, match)
});

Function({
	on: 'text',
	fromMe: false
}, async (message, match) => {
	if (!await isChatBot(message)) return
	if (!message.reply_message) return
	if (!message.reply_message.data.key.fromMe) return
	await message.reply(await chatbot(message))
})