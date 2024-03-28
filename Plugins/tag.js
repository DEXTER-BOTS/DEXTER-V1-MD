const {
	Function,
	parseMention
} = require('../lib/')
Function({
	pattern: 'tag ?(.*)',
	fromMe: true,
	desc: 'tag participants in the group',
	type: 'group'
}, async (m, text, client) => {
	if (!m.isGroup) return await m.reply('_This command only works in group chats_')
	const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => {}) : ''
	const participants = m.isGroup ? await groupMetadata.participants : ''
	if (text == 'all') {
		let msg = ''
		let count = 1
		for (let participant of participants) {
			msg += `${count++} @${participant.id.split('@')[0]}\n`
		}
		return await m.client.sendMessage(m.chat, {
			text: msg,
			mentions: participants.map(a => a.id)
		})
	} else if (text == 'admin' || text == 'admins') {
		let admins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
		let msg = ''
		let count = 1
		for (let admin of admins) {
			msg += `${count++} @${admin.split('@')[0]}\n`
		}
		return await m.reply(msg, {
			mentions: parseMention(msg)
		})
	}
	if (text) return await m.send(text || m.reply_message.text, 'text', {
		mentions: participants.map(a => a.id)
	})
	if (!m.reply_message) return await m.reply('_Example : \ntag all\ntag admin\ntag text\nReply to a message_')
	await client.forwardMessage(m.chat, m.quoted_message, {
		contextInfo: {
			mentionedJid: participants.map(a => a.id)
		}
	})
})