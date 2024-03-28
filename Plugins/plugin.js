const {
	Function,
	getString,
	PluginDB,
	Plugin,
	removeCommand,
	getJson,
	Database,
	commands,
	PREFIX
} = require('../lib/');
const Config = require('../config');
const axios = require('axios');
const fs = require('fs');
const Lang = getString('_plugin');

Function({
	pattern: 'plugin ?(.*)',
	fromMe: true,
	desc: Lang.PLUGIN_DESC,
	type: 'user'
}, async (m, text) => {
	text = text || m.reply_message.text
	await Plugin(text, m)
});

Function({
	pattern: 'remove ?(.*)',
	fromMe: true,
	desc: 'Remove a specific plugin or all plugins',
	type: 'user'
}, async (message, match, client) => {
	if (!match) return await message.reply('*Need plugin name!*\n_Example :_\n.remove mforward\n.remove all');
	try {
		if (match.toLowerCase() === 'all') {
			const plugins = await PluginDB.PluginDB.findAll();
			for (const plugin of plugins) {
				const pluginName = plugin.dataValues.name;
				await removeCommand(pluginName);
				await plugin.destroy();
			}
			return await message.reply('_All plugins successfully deleted!_\n*Reboot the BOT*');
		}
		const plugin = await PluginDB.PluginDB.findAll({ where: { name: match } });
		if (plugin.length < 1) return await message.reply(`Plugin *${match}* not found.`);
		await removeCommand(plugin[0].dataValues.name);
		await plugin[0].destroy();
		delete require.cache[require.resolve(`./${match}.js`)];
		fs.unlinkSync(`./plugins/${match}.js`);
		await message.reply('_Plugin successfully deleted!_\n*Reboot the BOT*');
	} catch (error) {
		console.error(error);
		await message.reply('An error occurred while removing the plugin(s).\n*Error:' + error.message + '*');
	}
});


Function({
	pattern: 'cmdrm ?(.*)',
	fromMe: true,
	desc: 'delete a command',
	type: 'user'
}, async (message, match, client) => {
	const response = await removeCommand(match)
	if (response) {
		await message.send('_Deleted_')
	} else {
		await message.send('*Not found*')
	}
})

const toggle = new Database('toggle');
Function({
  pattern: 'toggle ?(.*)',
  fromMe: true,
  desc: 'To switch commands on/off',
  type: 'group'
}, async (message, match, client) => {
  if (!match) return await message.reply('*Need a cmd and action!*\n_Example: toggle ping off/on_');
  const [cmd, tog] = match.split(' ');
  if (!cmd) return await message.reply('*Need a cmd!*\n_Example: toggle ping off/on_');
  if (!tog || (tog !== 'on' && tog !== 'off')) return await message.reply('*Need an action!*\n_Example: toggle ping off/on_');
  if (cmd == 'toggle') return await message.reply("*I can't tog toggle*");
  const iscmd = commands.some(command => command.pattern !== undefined && command.pattern.test(PREFIX + cmd));
  if (!iscmd) return await message.reply('cmd *'+cmd+'* not found');
  await toggle.set(cmd, tog == 'off');
  return await message.reply(`_${cmd.charAt(0).toUpperCase() + cmd.slice(1)} ${tog == 'on' ? 'Activated' : 'Deactivated'}_`);
});