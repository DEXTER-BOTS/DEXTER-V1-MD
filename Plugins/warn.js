const {
	Function,
	setWarn,
	resetWarn
} = require('../lib/')
const config = require('../config')
async function isAdmin(i, n) {
	return (await i.filter((i => null !== i.admin)).map((i => i.id))).includes(n)
}
Function({
	pattern: 'warn ?(.*)',
	fromMe: true,
	desc: 'warn users in chat',
	type: 'group',
	onlyGroup: true
}, async (message, match) => {
	const user = message.mention[0] || message.reply_message.sender
	if (!user) return await message.reply('_Reply or Mention to a user_')
	const count = await setWarn(user, message.jid)
	if (count > config.WARN) {
		const groupMetadata = await message.client.groupMetadata(message.jid)
		const participants = await groupMetadata.participants
		const isimAdmin = await isAdmin(participants, message.client.user.jid)
		const isUserAdmin = await isAdmin(participants, user)
		if (!isimAdmin) return await message.reply("*I'm not an admin*")
		if (isUserAdmin) return await message.reply('*Given user is an admin.*')
		await message.client.sendMessage(message.jid, {
			text: `@${user.split('@')[0]}, *Kicked From The Group*,\n_Reached Max warning._`,
			mentions: [user]
		})
		await resetWarn(user, message.jid)
		return await message.client.groupParticipantsUpdate(message.jid, [user], 'remove')
	}
	var reasons = 'Reason';
	if (message.mention[0]) reasons = 'No Reason'
	if (message.reply_message) reasons = message.reply_message.mtype.replace('Message', '')
	if (message.reply_message.text) reasons = message.reply_message.text.length > 40 ? 'Replied message' : message.reply_message.text
	var reason = match ? match.replace(`@${user.split('@')[0]}`, '') : reasons
	await message.client.sendMessage(message.jid, {
		text: `*╭*⚠️WARNING⚠️ \n┣ *User :* @${user.split('@')[0]}\n┣ *Warn :* ${count}\n┣ *Reason :* ${reason}\n┣ *Remaining :* ${config.WARN - count}\n*╰*`,
		mentions: [user]
	})
})

Function({
	pattern: 'reset ?(.*)',
	fromMe: true,
	desc: 'warn users in chat',
	type: 'group',
	onlyGroup: true
}, async (message, match) => {
	if (match.startsWith('warn')) {
		const user = message.mention[0] || message.reply_message.sender
		if (!user) return await message.reply('_Reply or Mention to a user_')
		try {
			await resetWarn(user, message.jid)
		} catch {
			return await message.reply("_The user doesn't have warn yet_")
		}
		return await m.client.sendMessage(message.jid, {
			text: `*╭* RESET WARNING\n┣ *User :* @${user.split('@')[0]}\n┣ *Remaining :* ${config.WARN}\n*╰*`,
			mentions: [user]
		})
	}
});