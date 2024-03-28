const simpleGit = require('simple-git');
const git = simpleGit();
const got = require('got');
const Config = require('../config');
const {
	Function,
	updatecheck,
	updatestart,
	formatTime,
	addCommand,
	getString,
	prefix
} = require('../lib/');
const Heroku = require('heroku-client');
if (!Config.HEROKU.API_KEY) {
require('../lib/config_var')
}
if (Config.HEROKU.API_KEY && Config.HEROKU.APP_NAME) {
const heroku = new Heroku({
	token: Config.HEROKU.API_KEY
})
let baseURI = '/apps/' + Config.HEROKU.APP_NAME
const Lang = getString('heroku')

Function({
	pattern: 'restart ?(.*)',
	fromMe: true,
	desc: 'Restart the bot',
	type: 'heroku'
}, async (m, client) => {
	await m.send('_Restarting_')
	await heroku.delete(baseURI + '/dynos').catch(async (error) => {
		await m.send(`HEROKU : ${error.body.message}`)
	});
});

Function({
	pattern: 'shutdown ?(.*)',
	fromMe: true,
	type: 'heroku'
}, async (m, client) => {
	await heroku.get(baseURI + '/formation').then(async (formation) => {
		forID = formation[0].id;
		await m.send('_Shutting down.._')
		await heroku.patch(baseURI + '/formation/' + forID, {
			body: {
				quantity: 0
			}
		});
	}).catch(async (err) => {
		await m.send(error.message)
	});
});

Function({
	pattern: 'setvar ?(.*)',
	fromMe: true,
	desc: 'Set heroku config var',
	type: 'heroku'
}, async (m, text, client) => {
	if (text === '') return await m.send('```Either Key or Value is missing```')
	if ((varKey = text.split(':')[0]) && (varValue = text.replace(text.split(':')[0] + ":", ""))) {
		await heroku.patch(baseURI + '/config-vars', {
			body: {
				[varKey.toUpperCase()]: varValue
			}
		}).then(async () => {
			await m.send('Successfully Set ' + '```' + varKey + '➜' + varValue + '```')
		}).catch(async (error) => {
			await m.send(`HEROKU : ${error.body.message}`)
		})
	}
})

Function({
	pattern: 'delvar ?(.*)',
	fromMe: true,
	desc: 'Delete heroku config var',
	type: 'heroku'
}, async (m, text, client) => {
	if (text === '') return await m.send('```Either Key or Value is missing```');
	await heroku.get(baseURI + '/config-vars').then(async (vars) => {
		key = text.trim();
		for (vr in vars) {
			if (key == vr) {
				await heroku.patch(baseURI + '/config-vars', {
					body: {
						[key.toUpperCase()]: null
					}
				});
				return await m.send('```{} successfully deleted```'.replace('{}', key));
			}
		}
		await m.send('```No results found for this key```');
	}).catch(async (error) => {
		await m.send(`HEROKU : ${error.body.message}`);
	});
});

Function({
	pattern: 'getvar ?(.*)',
	fromMe: true,
	desc: 'Get heroku config var',
	type: 'heroku'
}, async (m, text, client) => {
	if (text === '') return await m.send('```Either Key or Value is missing```')
	await heroku.get(baseURI + '/config-vars').then(async (vars) => {
		for (vr in vars) {
			if (text.trim().toUpperCase() == vr) return await m.send('_{} : {}_'.replace('{}', vr).replace('{}', vars[vr]));
		}
		await m.send('```No results found for this key```');
	}).catch(async (error) => {
		await m.send(`HEROKU : ${error.body.message}`)
	});
});

Function({
	pattern: 'allvar ?(.*)',
	fromMe: true,
	desc: 'Shows all vars in Heroku APP settings.',
	type: 'heroku'
}, async (m, text, client) => {
	let msg = '```Here your all Heroku vars\n\n\n'
	await heroku.get(baseURI + '/config-vars')
		.then(async (keys) => {
			for (let key in keys) {
				msg += `${key} : ${keys[key]}\n\n`
			}
			return await m.send(msg + '```')
		}).catch(async (error) => {
			await m.send(`HEROKU : ${error.body.message}`)
		})
});

function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);

	var hDisplay = h > 0 ? h + (h == 1 ? " " + Lang.HOUR + ", " : " " + Lang.HOUR + ", ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " " + Lang.MINUTE + ", " : " " + Lang.MINUTE + ", ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " " + Lang.SECOND : " " + Lang.SECOND) : "";
	return hDisplay + mDisplay + sDisplay;
}

Function({
	pattern: 'dyno',
	fromMe: true,
	desc: Lang.DYNO_DESC,
	type: 'heroku'
}, async (message, match) => {
	heroku.get('/account').then(async (account) => {
		url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
		headers = {
			"User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
			"Authorization": "Bearer " + Config.HEROKU.API_KEY,
			"Accept": "application/vnd.heroku+json; version=3.account-quotas",
		}
		await got(url, {
			headers: headers
		}).then(async (res) => {
			const resp = JSON.parse(res.body);
			total_quota = Math.floor(resp.account_quota);
			quota_used = Math.floor(resp.quota_used);
			percentage = Math.round((quota_used / total_quota) * 100);
			remaining = total_quota - quota_used;
			await message.send(
				Lang.DYNO_TOTAL + ": ```{}```\n\n".format(secondsToHms(total_quota)) +
				Lang.DYNO_USED + ": ```{}```\n".format(secondsToHms(quota_used)) +
				Lang.PERCENTAGE + ": ```{}```\n\n".format(percentage) +
				Lang.DYNO_LEFT + ": ```{}```\n".format(secondsToHms(remaining))
			);
		}).catch(async (err) => {
			await message.send(err.message);
		});
	});
});

}

Function({
	pattern: 'update ?(.*)',
	fromMe: true,
	desc: 'Checks or start bot updates',
	type: 'heroku'
}, async (m, text, client) => {
	if (!text || text === 'check') {
		let n = await updatecheck()
		if (n === 500) return await m.send('_Bot is completely up-to-date!_')
		var up = 'New update available!\n\nChanges:\n'
		let no = 1
		n['all'].map((c) => {
			up += '' + no++ + '. ' + '[' + c.date.substring(0, 10) + ']: ' + c.message + '\n';
		});
		await m.send(up + '\ntype ' + prefix + 'update now');
		/* let buttons = [{
			buttonId: prefix + 'update now',
			buttonText: {
				displayText: 'UPDATE START'
			},
			type: 1
		}, ]
		const buttonMessage = {
			text: up,
			footer: 'Click the button to start update',
			buttons: buttons,
			headerType: 1
		}
		await client.sendMessage(m.chat, buttonMessage) 
		*/
	} else if (text === 'start' || text === 'now') {
		let n = await updatecheck()
		if (!Config.HEROKU.API_KEY && !Config.HEROKU.APP_NAME) {
		await git.reset("hard",["HEAD"])
        await git.pull()
        await m.send('_Updated_')
        await m.send('_Rebooting..._')
        return require('pm2').restart('index.js');
        }
		if (n === 500) return await m.send('_Bot is completely up-to-date!_')
		await m.send('_Build started_')
		let us = await updatestart(m)
		if (n === 404) return await m.send('*Your Heroku information is wrong!*')
		if (n === 408) return await m.send('_Your account has reached its concurrent builds limit!. Please wait for the other app to finish its deploy_')
		if (n === 200) return await m.send('_Successfully Updated!_')
	} else {
		let n = await updatecheck()
		await m.send(n == 500 ? '*Bot is up-to-date.*' : n.total + ' New Updates are available')
		/*
		let buttons = [{
				buttonId: prefix + 'update now',
				buttonText: {
					displayText: 'UPDATE START'
				},
				type: 1
			},
			{
				buttonId: prefix + 'update check',
				buttonText: {
					displayText: 'UPDATE CHECK'
				},
				type: 1
			}
		]
		const buttonMessage = {
			text: 'Update Manager',
			footer: n == 500 ? '*Bot is up-to-date.*' : n.total + ' New Updates are available',
			buttons: buttons,
			headerType: 1
		}
		await client.sendMessage(m.chat, buttonMessage)
		*/
	}
});
