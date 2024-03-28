const {
	Function,
	Database
} = require('../lib/');
const antibot = new Database('antibot');

Function({
	pattern: 'antiword ?(.*)',
	fromMe: true,
	onlyGroup: true,
	desc: 'set antiword',
	type: 'group'
}, async (message, match) => {
  const bannedWordsDB = new Database('antiword');
  const chatData = bannedWordsDB.get(message.chat) || { word: ['fuck'], enabled: false };
  if (!match) return await message.send('*Need input!*\n_Example: antiword fek,myr..._\n_antiword on/off_');
  if (match === 'list') {
    if (!chatData.enabled) {
      return await message.reply("_You don't set the Antiword yet.!_\n__To set:__ ```.antiword fek,myr...```");
    }
    return await message.reply(chatData.word.join(','));
  }
  if (match === 'on' || match === 'off') {
    chatData.enabled = match === 'on';
    bannedWordsDB.set(message.chat, chatData);
    return await message.reply(`_Antiword ${match === 'on' ? 'Activated' : 'Deactivated'}_`);
  }
  const antiwords = match.split(',');
  chatData.word = antiwords;
  chatData.enabled = true;
  bannedWordsDB.set(message.chat, chatData);
  return await message.reply('_Antiword Updated_');
})

Function({
	pattern: 'antilink ?(.*)',
	fromMe: true,
	onlyGroup: true,
	desc: 'set antilink',
	type: 'group',
}, async (message, match, client) => {
  const dblink = new Database('antilink');
  const chatData = dblink.get(message.jid) || {
    allowed: 'gist.github.com',
    enabled: false,
    action: 'kick'
  };
  if (!match) return await message.reply('_Need input!_\n*Example:*\n.antilink on/off\n.antilink info\n.antilink google.com,github.com\n.antilink action kick/warn/delete');
  if (match == 'info') {
    const isAntiLink = chatData.enabled ? 'Enabled' : 'Disabled';
    return await message.send(`*Allowed Urls* : ${chatData.allowed}\n*Action* : ${chatData.action}\n*Status* : ${isAntiLink}`);
  }
  if (match == 'on' || match == 'off') {
    chatData.enabled = match == 'on';
    dblink.set(message.jid, chatData);
    return await message.reply(`_AntiLink ${match == 'on' ? 'Activated' : 'Deactivated'}_`);
  }
  if (match.includes('action')) {
    let action = match.match(/action[\/\\](?:d(?:elete|lt)|warn|null|kick)/g);
    if (action) {
      action = action[0].split(/[\/\\]/);
      chatData.action = action[1];
      dblink.set(message.jid, chatData);
      return await message.send(`_AntiLink action updated : *${['kick', 'warn', 'delete', 'dlt', 'null'].includes(action[1]) ? action[1] : 'false'}*_`);
    }
  }
  chatData.allowed = match;
  chatData.enabled = true;
  dblink.set(message.jid, chatData);
  return await message.reply('_AntiLink allowed urls Updated_');
})

Function({
  pattern: 'antibot ?(.*)',
  fromMe: true,
  onlyGroup: true,
  desc: 'set antibot',
  type: 'group'
}, async (message, match, client) => {
  if (!match || (match !== 'on' && match !== 'off')) return await message.reply('_Please provide a valid match option._ *Use either "on" or "off".*');
  if (match === 'on') {
    await antibot.set(message.chat, true);
    await message.send('_Antibot Activated_');
  } else if (match === 'off') {
    await antibot.delete(message.chat)
    await message.send('_Antibot Deactivated_');
  }
});