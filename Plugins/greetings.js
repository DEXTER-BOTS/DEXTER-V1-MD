const {
	Function,
	getString,
	prefix
} = require('../lib/')
const sql = require('../lib/database/greetings')
const Lang = getString('greetings')
Function({
	pattern: 'welcome ?(.*)',
	fromMe: true,
	desc: 'it sets the welcome message',
	type: 'group'
}, async (m, text, client) => {
	if (!m.isGroup) return await m.reply('_This command only works in group chats_')
	const groupMetadata = await client.groupMetadata(m.chat)
	let isWelcome = await sql.getMessage(m.jid);
	let buttons = [{
			buttonId: prefix + 'welcome on',
			buttonText: {
				displayText: 'ON'
			},
			type: 1
		},
		{
			buttonId: prefix + 'welcome off',
			buttonText: {
				displayText: 'OFF'
			},
			type: 1
		},
		{
			buttonId: prefix + 'welcome get',
			buttonText: {
				displayText: 'GET'
			},
			type: 1
		}
	]
	let isCome = isWelcome.enabled ? true : false
	const buttonMessage = {
		text: 'Welcome Manager',
		footer: 'Group Name : ' + groupMetadata.subject + '\nGreetings status : ' + isCome,
		buttons: buttons,
		headerType: 1
	}

	if (!text) return await message.send('_Need input!_\n*Example: .welcome on/off/delete*\n*.welcome Hey &mention, Welcome to &gname*\n\n```For more information visit:```https://github.com/A-d-i-t-h-y-a-n/hermit-md/wiki/greetings')
	if (text === "on") {
		let msg = await sql.enableMessage(m.jid);
		if (!msg) return m.reply(Lang.NOT_SET_WELCOME)
		await sql.enableMessage(m.jid);
		await m.reply(`_Welcome ${text == 'on' ? 'Activated' : 'Deactivated'}_`)
	} else if (text === "off") {
		let msg = await sql.getMessage(m.jid);
		if (!msg) return m.reply(Lang.NOT_SET_WELCOME)
		await m.reply(`_Welcome ${text == 'on' ? 'Activated' : 'Deactivated'}_`)
		await sql.disableMessage(m.jid);
	} else if (text === "delete") {
		let msg = await sql.getMessage(m.jid);
		if (!msg) return m.reply(Lang.NOT_SET_WELCOME)
		await sql.deleteMessage(m.jid, 'welcome');
		await m.reply(Lang.WELCOME_DELETED);
	} else if (text === "get") {
		let msg = await sql.getMessage(m.jid);
		if (!msg) return m.reply(Lang.NOT_SET_WELCOME)
		const update = {}
		update.id = m.chat
		update.participants = [m.sender]
		update.action = 'add'
		await client.ev.emit('group-participants.update', update)
		m.reply(msg.message)
	} else {
		await sql.setMessage(m.jid, 'welcome', text);
		const update = {}
		update.id = m.chat
		update.participants = [m.sender]
		update.action = 'add'
		await client.ev.emit('group-participants.update', update)
		await m.reply('_Welcome Updated_')
	}
})

Function({
	pattern: 'goodbye ?(.*)',
	fromMe: true,
	desc: 'it sets the goodbye message',
	type: 'group'
}, async (m, text, client) => {
	if (!m.isGroup) return await m.reply('_This command only works in group chats_')
	const groupMetadata = await client.groupMetadata(m.chat)
	let isGoodbye = await sql.getMessage(m.jid, 'goodbye');
	let buttons = [{
			buttonId: prefix + 'goodbye on',
			buttonText: {
				displayText: 'ON'
			},
			type: 1
		},
		{
			buttonId: prefix + 'goodbye off',
			buttonText: {
				displayText: 'OFF'
			},
			type: 1
		},
		{
			buttonId: prefix + 'goodbye get',
			buttonText: {
				displayText: 'GET'
			},
			type: 1
		}
	]
	let isBye = isGoodbye.enabled ? true : false
	const buttonMessage = {
		text: 'Goodbye Manager',
		footer: 'Group Name : ' + groupMetadata.subject + '\nGreetings status : ' + isBye,
		buttons: buttons,
		headerType: 1
	}

	if (!text) return await message.send('_Need input!_\n*Example: .goodbye on/off/delete*\n*.goodbye Bye &mention*\n\n```For more information visit:```https://github.com/A-d-i-t-h-y-a-n/hermit-md/wiki/greetings')
	if (text === "on") {
		let msg = await sql.enableMessage(m.jid);
		if (!msg) return m.reply(Lang.NOT_SET_GOODBYE)
		await sql.enableMessage(m.jid, 'goodbye');
		await m.reply(`_goodbye ${text == 'on' ? 'Activated' : 'Deactivated'}_`)
	} else if (text === "off") {
		let msg = await sql.getMessage(m.jid, 'goodbye');
		if (!msg) return m.reply(Lang.NOT_SET_GOODBYE)
		await m.reply(`_goodbye ${text == 'on' ? 'Activated' : 'Deactivated'}_`)
		await sql.disableMessage(m.jid, 'goodbye');
	} else if (text === "delete") {
		let msg = await sql.getMessage(m.jid, 'goodbye');
		if (!msg) return m.reply(Lang.NOT_SET_GOODBYE)
		await sql.deleteMessage(m.jid, 'goodbye');
		await m.reply(Lang.goodbye_DELETED);
	} else if (text === "get") {
		let msg = await sql.getMessage(m.jid, 'goodbye');
		if (!msg) return m.reply(Lang.NOT_SET_GOODBYE)
		const update = {}
		update.id = m.chat
		update.participants = [m.sender]
		update.action = 'remove'
		await client.ev.emit('group-participants.update', update)
		m.reply(msg.message)
	} else {
		await sql.setMessage(m.jid, 'goodbye', text);
		const update = {}
		update.id = m.chat
		update.participants = [m.sender]
		update.action = 'remove'
		await client.ev.emit('group-participants.update', update)
		await m.reply('_Goodbye Updated_')
	}
})