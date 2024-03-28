const {
	Function,
	setAntiFake,
	antiFakeList,
	prefix
} = require('../lib/')
const {
	getFake
} = require('../lib/database/antifake')
Function({
	pattern: 'antifake ?(.*)',
	fromMe: true,
	desc: 'set antifake',
	type: 'group'
}, async (m, match) => {
	if (!m.isGroup) return await m.reply('_This command only works in group chats_')
	const groupMetadata = await m.client.groupMetadata(m.chat)
	const isAntiFake = await getFake(m.jid)
	let buttons = [{
			buttonId: prefix + 'antifake on',
			buttonText: {
				displayText: 'ON'
			},
			type: 1
		},
		{
			buttonId: prefix + 'antifake off',
			buttonText: {
				displayText: 'OFF'
			},
			type: 1
		},
		{
			buttonId: prefix + 'antifake list',
			buttonText: {
				displayText: 'LIST'
			},
			type: 1
		}
	]
	let isantiFake = isAntiFake.enabled || false
	const buttonMessage = {
		text: 'Antifake Manager',
		footer: 'Group Name : ' + groupMetadata.subject + '\nAntiFake status : ' + isantiFake,
		buttons: buttons,
		headerType: 1
	}
	if (!match) return await m.send('_Need input!_\n*Example: antifake on/off*')
	if (match == 'list') {
		if (!isAntiFake) return await m.reply("_You don't set the Antifake yet.!_\n__To set:__ ```.antifake 1,44,972...```")
		return await m.reply(await antiFakeList(m.jid))
	}
	if (match == 'on' || match == 'off') {
		await setAntiFake(m.jid, match)
		return await m.reply(`_Antifake ${match == 'on' ? 'Activated' : 'Deactivated'}_`)
	}
	await setAntiFake(m.jid, match)
	return await m.reply('_Antifake Updated_')
})