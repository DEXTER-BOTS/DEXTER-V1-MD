const {
	Function,
	prefix,
	setSchedule,
	getSchedule,
	getAllSchedule,
	addSchedule
} = require('../lib/')

const {
	AUTOMUTE_MSG,
	AUTOUNMUTE_MSG
} = require('../config')

const isBotAdmins = async (message) => {
	const groupMetadata = await message.client.groupMetadata(message.chat)
	const participants = await groupMetadata.participants
	const groupAdmins = await participants.filter(v => v.admin !== null).map(v => v.id)
	return groupAdmins.includes(message.user_id)
}

Function({
	pattern: 'automute ?(.*)',
	fromMe: true,
	desc: 'auto group mute scheduler',
	type: 'group'
}, async (message, match, client) => {
	if (!message.isGroup) return await message.reply('_This command only works in group chats_')
	const isbotAdmin = await isBotAdmins(message)
	if (!isbotAdmin) return await message.reply("I'm not an admin")
	const groupMetadata = await message.client.groupMetadata(message.jid)
	const isMute = await getSchedule(message.jid, 'mute')
	const msg = message.reply_message.text || AUTOMUTE_MSG
	if (!match) {
		let istrue = isMute?.enabled ? true : false
		const buttonMessage = {
			text: 'AutoMute Manager',
			footer: 'Group Name : ' + groupMetadata.subject + '\nAutoMute status : ' + istrue,
			buttons: [{
				buttonId: prefix + 'automute on',
				buttonText: {
					displayText: 'ON'
				},
				type: 1
			}, {
				buttonId: prefix + 'automute off',
				buttonText: {
					displayText: 'OFF'
				},
				type: 1
			}, {
				buttonId: prefix + 'automute get',
				buttonText: {
					displayText: 'GET'
				},
				type: 1
			}],
			headerType: 1
		}
		await message.client.sendMessage(message.jid, buttonMessage)
		return;
	}
	if (match == 'get') {
		const schedule = await getSchedule(message.jid, 'mute')
		if (!schedule) return await message.send('_AutoMute is Not Scheduled in this chat_')
		const {
			time,
			enabled
		} = schedule
		const _time = time.toUpperCase().match(/[^A-Za-z]/gm).join('')
		const meridiem = time.toUpperCase().match(/[A-Z]/gm).join('')
		return await message.send(`*Time :* ${_time}${meridiem}\n*Status :* ${enabled ? 'on' : 'off'}\nMessage : ${schedule.message}`)
	}
	if (match == 'on' || match == 'off') {
		if (!isMute) return await message.send('_AutoMute is Not Scheduled in this chat_')
		const schedule = await getSchedule(message.jid, 'mute')
		if (!schedule && !schedule.time) return await message.send('_AutoMute is Not Scheduled in this chat_')
		if (match == 'off') {
			schedule.time = 'off'
		}
		const isScheduled = await addSchedule(message.jid, schedule.time, 'mute', schedule.subject, schedule.message, client)
		if (!isScheduled) return await message.send('_AutoMute Already ' + (match == 'on' ? 'Enabled' : 'Disabled') + '_')
		await setSchedule(message.jid, isMute.time, 'mute', schedule.subject, schedule.message, match == 'on')
		return await message.send(`_AutoMute ${match == 'on' ? 'Enabled' : 'Disabled'}._`)
	}
	if (!match.includes(':') || !match.toUpperCase().includes('AM') && !match.toUpperCase().includes('PM')) {
		return await message.reply('_Wrong Format!_\n*Example : automute 6:00 AM || automute 12:00 PM*')
	}
	await setSchedule(message.jid, match, 'mute', groupMetadata.subject, msg, true)
	await addSchedule(message.jid, match, 'mute', groupMetadata.subject, msg, client)
	const time12h = match.toUpperCase()
	const _time = time12h.match(/[^A-Za-z]/gm).join('')
	const meridiem = time12h.match(/[A-Z]/gm).join('')
	return await message.send(`_Group will Mute at ${_time} ${meridiem}_`)
})
Function({
	pattern: 'autounmute ?(.*)',
	fromMe: true,
	desc: 'auto group unmute scheduler',
	type: 'group'
}, async (message, match, client) => {
	if (!message.isGroup) return await message.reply('_This command only works in group chats_')
	const isbotAdmin = await isBotAdmins(message)
	if (!isbotAdmin) return await message.reply("I'm not an admin")
	const groupMetadata = await message.client.groupMetadata(message.jid)
	const isMute = await getSchedule(message.jid, 'unmute')
	const msg = message.reply_message.text || AUTOUNMUTE_MSG
	if (!match) {
		let istrue = isMute?.enabled ? true : false
		const buttonMessage = {
			text: 'Autounmute Manager',
			footer: 'Group Name : ' + groupMetadata.subject + '\nAutoMute status : ' + istrue,
			buttons: [{
				buttonId: prefix + 'autounmute on',
				buttonText: {
					displayText: 'ON'
				},
				type: 1
			}, {
				buttonId: prefix + 'autounmute off',
				buttonText: {
					displayText: 'OFF'
				},
				type: 1
			}, {
				buttonId: prefix + 'autounmute get',
				buttonText: {
					displayText: 'GET'
				},
				type: 1
			}],
			headerType: 1
		}
		await message.client.sendMessage(message.jid, buttonMessage)
		return;
	}
	if (match == 'get') {
		const schedule = await getSchedule(message.jid, 'unmute')
		if (!schedule) return await message.send('_Autounmute is Not Scheduled in this chat_')
		const {
			time,
			enabled
		} = schedule
		const _time = time.toUpperCase().match(/[^A-Za-z]/gm).join('')
		const meridiem = time.toUpperCase().match(/[A-Z]/gm).join('')
		return await message.send(`*Time :* ${_time}${meridiem}\n*Status :* ${enabled ? 'on' : 'off'}\nMessage : ${schedule.message}`)
	}
	if (match == 'on' || match == 'off') {
		if (!isMute) return await message.send('_Autounmute is Not Scheduled in this chat_')
		const schedule = await getSchedule(message.jid, 'unmute')
		if (!schedule && !schedule.time) return await message.send('_Autounmute is Not Scheduled in this chat_')
		if (match == 'off') {
			schedule.time = 'off'
		}
		const isScheduled = await addSchedule(message.jid, schedule.time, 'unmute', schedule.subject, schedule.message, client)
		if (!isScheduled) return await message.send('_AutounMute Already ' + (match == 'on' ? 'Enabled' : 'Disabled') + '_')
		await setSchedule(message.jid, isMute.time, 'unmute', schedule.subject, schedule.message, match == 'on')
		return await message.send(`_Autounmute ${match == 'on' ? 'Enabled' : 'Disabled'}._`)
	}
	if (!match.includes(':') || !match.toUpperCase().includes('AM') && !match.toUpperCase().includes('PM')) {
		return await message.reply('_Wrong Format!_\n*Example : autounmute 6:00 AM || autounmute 12:00 PM*')
	}
	await setSchedule(message.jid, match, 'unmute', groupMetadata.subject, msg, true)
	await addSchedule(message.jid, match, 'unmute', groupMetadata.subject, msg, client)
	const time12h = match.toUpperCase()
	const _time = time12h.match(/[^A-Za-z]/gm).join('')
	const meridiem = time12h.match(/[A-Z]/gm).join('')
	return await message.send(`_Group will unmute at ${_time} ${meridiem}_`)
})

Function({
	pattern: 'getmute ?(.*)',
	fromMe: true,
	desc: 'get all groups mute and unmute schedules',
	type: 'group'
}, async (message, match, client) => {
	const schedules = await getAllSchedule()
	var msg = ' '
	schedules.map(async (schedule, index) => {
		const {
			mute,
			unmute
		} = JSON.parse(schedule.dataValues.content)
		const mutetime = mute.time || ''
		const unmutetime = unmute.time || ''
		const _mutetime = mutetime.toUpperCase().match(/[^A-Za-z]/gm).join('') || 'null'
		const mutemeridiem = mutetime.toUpperCase().match(/[A-Z]/gm).join('') || 'null'
		const _unmutetime = unmutetime.toUpperCase().match(/[^A-Za-z]/gm).join('') || 'null'
		const unmutemeridiem = unmutetime.toUpperCase().match(/[A-Z]/gm).join('') || 'null'
		msg += `*${index + 1}. Group:* ${mute.groupName || 'null'}
*Mute*: ${_mutetime || 'null'}${mutemeridiem || 'null'}
*Unmute*: ${_unmutetime || 'null'}${unmutemeridiem || 'null'}
*Status*: ${mute.enabled || 'null'}\n\n`
	})
	await message.send(msg.trim())
})