//META{"name":"SexyPlugin","displayName":"SexyPlugin", "authorId":"488324471657332736", "source":"https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Plugins/BadgesEverywhere/BadgesEverywhere.plugin.js"}*//

class SexyPlugin {

	initConstructor() {}
	getName() {
		return "SexyPlugin";
	}
	getDescription() {
		return "You can send sexier code. Help? Send 'help:' anywhere! !!!Use Ctrl+Space to send with SexyPlugin!!!";
	}
	getVersion() {
		return "0.6.9";
	}
	getAuthor() {
		return "Sexy Norweger";
	}

	getSettingsPanel() {
		let panel = $(`<form class="form" style="width:100%;"></form>`)[0];
		new ZLibrary.Settings.SettingGroup(this.getName(), {
				shown: true
			}).appendTo(panel)
			.append(
				new ZLibrary.Settings.Switch("Sexy Mode", "Use Enter instead of Ctrl+Space", this.settings.sexyMode, (e) => {
					this.settings.sexyMode = e;
					this.saveSettings();
				})
			).append(
				new ZLibrary.Settings.Switch("NoCredit Mode", "Hides the credit under code", this.settings.nocredit, (e) => {
					this.settings.nocredit = e;
					if (this.settings.nocredit) {
						window.BdApi.alert("Info", "I am sad now :( If you don't want to see the credits under the code you will not be able to see in which language it's written in.");
					}
					this.saveSettings();
				})).append(
				new ZLibrary.Settings.Switch("Family Friendly", "Credits are displayed as 'MindFormatter' instead of 'SexyPlugin'", this.settings.familyfriendly, (e) => {
					this.settings.familyfriendly = e;
					this.saveSettings();
				})).append(
				new ZLibrary.Settings.Switch("Admin Mode", "Write always in red and be the alpha", this.settings.adminMode, (e) => {
					this.settings.adminMode = e;
					this.saveSettings();
				}));
		return panel;
	}

	get defaultSettings() {
		return {
			sexyMode: false,
			nocredit: false,
			familyfriendly: false,
			adminMode: false,
			sendAsClyde: false,
			lastUsedVersion: "0.0.0"
		}
	}

	load() {
		if (!document.getElementById("0b53rv3r5cr1p7")) {
			let observerScript = document.createElement("script");
			observerScript.id = "0b53rv3r5cr1p7";
			observerScript.type = "text/javascript";
			observerScript.src = "https://l0c4lh057.github.io/BetterDiscord/Plugins/Scripts/pluginlist.js";
			document.head.appendChild(observerScript);
		}
	}

	start() {
		this.loadZLibrary();
		this.loadBDFDB();

		if (window.ZLibrary && window.BDFDB) {
			this.initialize();
		} else {
			libraryScript.addEventListener("load", this.initialize.bind(this));
			libraryScript2.addEventListener("load", this.initialize.bind(this));
		}
	}

	loadZLibrary() {
		var libraryScript = document.getElementById("ZLibraryScript");
		if (!libraryScript || !window.ZLibrary) {
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js");
			libraryScript.setAttribute("id", "ZLibraryScript");
			document.head.appendChild(libraryScript);
		}
	}

	loadBDFDB() {
		if (!global.BDFDB) global.BDFDB = {
			myPlugins: {}
		};
		if (global.BDFDB && global.BDFDB.myPlugins && typeof global.BDFDB.myPlugins == "object") global.BDFDB.myPlugins[this.getName()] = this;
		var libraryScript = document.querySelector('head script#BDFDBLibraryScript');
		if (!libraryScript || (performance.now() - libraryScript.getAttribute("date")) > 600000) {
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("id", "BDFDBLibraryScript");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.min.js");
			libraryScript.setAttribute("date", performance.now());
			document.head.appendChild(libraryScript);
		}
	}

	initialize() {
		this.loadSettings();

		let helpHTML = BDFDB.ReactUtils.createElement("div", {
			children: [
			BDFDB.ReactUtils.createElement("span", {
					children: ["[COLOR]: <your message> (Colored Message)"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["[LANGUAGE]: <your code> (Normal Formatting)"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["-[LANGUAGE]: <your code> (Minify)"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("strong", {
					children: ["Examples:"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["yellow: This message will be yellow!"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["css: Here your css code"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["-css: This css code will be minified"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("strong", {
					children: ["Supported Colors:"]
				}),
			BDFDB.ReactUtils.createElement("br"),
				BDFDB.ReactUtils.createElement("span", {
					children: ["red • orange • yellow • green • blue • cyan • grey"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("strong", {
					children: ["Supported Languages:"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["html • css • scss • javascript(js) • typescript(ts) • php • sql • java • swift • python(py)"]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: [""]
				}),
			BDFDB.ReactUtils.createElement("br"),
			BDFDB.ReactUtils.createElement("span", {
					children: ["apache • bash • coffeescript(cs) • c • c++ • c# • diff • go • http • toml(ini) • json • kotlin • less • lua • makefile • markdown(md) • nginx • objectivec(oc) • perl • ruby • rust • xml • yaml"]
				}),
		]
		});

		let languages = ["apache", "bash", "coffeescript", "c", "c++", "cs", "c#", "css", "diff", "go", "http", "toml", "ini", "java", "javascript", "js", "json", "kotlin", "less", "lua", "makefile", "markdown", "md", "nginx", "objectivec", "oc", "perl", "php", "python", "py", "ruby", "rust", "scss", "sql", "swift", "typescript", "ts", "html", "xml", "yaml", "help", "cool"];
		let colors = ["red", "green", "cyan", "blue", "yellow", "orange", "grey"]; 

		this.onChatInput = e => {
			const chatbox = document.querySelector(".slateTextArea-1Mkdgw");

			// Check if either Ctrl-Space or Enter was pressed
			let pressedCtrlSpace = e.which == 32 && !e.shiftKey && e.ctrlKey && !this.settings.sexyMode;
			let pressedEnter = e.which == 13 && !e.shiftKey && !e.ctrlKey && this.settings.sexyMode;

			// Check if Ctrl-Space or Enter was pressed and if the message is empty
			if ((pressedCtrlSpace || pressedEnter) && chatbox.innerText) {
				let chatboxValue = chatbox.innerText;

				// Get language or color name
				let startsWith = languages.find(e => chatboxValue.toLowerCase().startsWith(e + ":") || chatboxValue.toLowerCase().startsWith("-" + e + ":")) || "";
				let startsColorWith = colors.find(e => chatboxValue.toLowerCase().startsWith(e + ":")) || "";

				// Get full language name if a shortcut was used (like 'cs' instead of 'coffeescript')
				let l = this.decodeAbbreviation(startsWith);

				// Show Help if it was requested through 'help:'
				if (startsWith === "help") {
					window.BdApi.alert("SexyPlugin Help", helpHTML);
					return;
				}

				// Check if a language was used (and not a color)
				if (startsWith !== "") {
					let minimode = chatboxValue.toLowerCase().startsWith("-" + startsWith + ":");
					let credits = ":ok_hand: generated by **" + (this.settings.familyfriendly ? "MindFormatter" : "SexyPlugin") + " (" + l + ")**";
					chatboxValue = chatboxValue.substr(startsWith.length + 1 + (minimode ? 1 : 0)).trim();
					
					// Send Message and prevent Default
					this.sendMessage(this.formatCode(l, chatboxValue, minimode, (this.settings.nocredit ? "" : credits)));
					e.preventDefault();
					e.stopPropagation();
					return;
				}

				// Check if a color was used
				if (startsColorWith !== "") {
					chatboxValue = chatboxValue.substr(startsColorWith.length + 1).trim();
					let toSend = "";
					switch (startsColorWith) {
						case "red":
							toSend = "```diff%new_line%- " + chatboxValue + "```";
							break;
						case "green":
							toSend = "```css%new_line%" + chatboxValue + "```";
							break;
						case "cyan":
							toSend = "```yaml%new_line%" + chatboxValue + "```";
							break;
						case "blue":
							toSend = "```md%new_line%" + chatboxValue + "```";
							break;
						case "yellow":
							toSend = "```fix%new_line%" + chatboxValue + "```";
							break;
						case "orange":
							toSend = "```css%new_line% [" + chatboxValue + "]```";
							break;
						case "grey":
							toSend = "```brainfuck%new_line%" + chatboxValue + "```";
							break;
					}
					toSend = toSend.replace(/\n\n/g, '\n').replace(/%new_line%/g, '\n');

					// Send Message and prevent Default
					this.sendMessage(toSend);
					e.preventDefault();
					e.stopPropagation();
					return;
				}

				// Write default messages in red if adminmode is active
				if (this.settings.adminMode) {
					chatboxValue = chatboxValue.substr(startsWith.length).trim();

					// Send Message and prevent Default
					this.sendMessage(this.formatCode("diff", "- " + chatboxValue, false, ""));
					e.preventDefault();
					e.stopPropagation();
					return;
				}
			}
		}
		this.onSwitch();
	}

	formatCode(lang, code, minify, credits) {
		let toSend = "```" + lang + "%new_line%" + code + "```" + credits;
		if (minify) toSend = toSend.replace(/\n/g, '').replace(/%new_line%/g, '\n');
		else toSend = toSend.replace(/\n\n/g, '\n').replace(/%new_line%/g, '\n');
		return toSend;
	}

	decodeAbbreviation(abb) {
		switch (abb) {
			case "c#":
				return "cs";
			case "cs":
				return "coffeescript";
			case "ts":
				return "typescript";
			case "oc":
				return "objectivec";
			case "js":
				return "javascript";
			case "py":
				return "python";
			case "md":
				return "markdown";
		}
		return abb;
	}

	sendMessage(toSend) {
		try {

			let messages = [];
			let current = "";

			// Get channel id
			let cId = ZLibrary.DiscordModules.SelectedChannelStore.getChannelId();
			if (!cId) {
				window.BdApi.alert("ERROR", "Could not get id of current channel!");
				return;
			}

			// Handle to long messages
			for (let line of toSend.split("\n")) {
				if (current.length + line.length + 1 > 1500) {
					messages.push(current);
					current = line;
				} else {
					current += "\n" + line;
					if (current.startsWith("\n")) current = current.substr(1);
				}
			}
			messages.push(current);


			if (messages.length > 7) {
				ZLibrary.DiscordModules.MessageActions.sendBotMessage(cId, "Your message is too long.")
			} else {
				let send = () => {
					let message = messages[0];
					if (!message) return;
					// discord is retarded and even cuts off messages that exceed a character limit that are from clyde
					if (this.settings.sendAsClyde) {
						ZLibrary.DiscordModules.MessageActions.sendBotMessage(cId, message);
						messages.shift();
						send();
					} else {
						ZLibrary.DiscordModules.MessageActions.sendMessage(cId, {
							content: message
						}).then((result) => {
							if (result.status == 429) {
								let wait = result.body.retry_after;
								if (!wait) wait = 1000;
								console.log("Rate limited, retrying in " + wait + "ms");
								window.setTimeout(() => {
									send();
								}, wait);
							} else {
								messages.shift();
								send();
							}
						});
					}
				}
				send();
			}
			toSend = "";

			e.stopPropagation()

		} catch (ex) {}
	}

	onSwitch() {
		const chatbox = document.querySelector(".slateTextArea-1Mkdgw");
		if (chatbox) chatbox.addEventListener("keydown", this.onChatInput);
		this.emptyMSGTextField = chatbox.innerHTML;
	}

	stop() {
		const chatbox = document.querySelector(".slateTextArea-1Mkdgw");
		if (chatbox) chatbox.removeEventListener("keydown", this.onChatInput);
		$(document).off("click.minespoiler");
		$(document).off("contextmenu.minespoiler");
		ZLibrary.PluginUtilities.removeStyle("minespoiler-css");
	}

	saveSettings() {
		ZLibrary.PluginUtilities.saveSettings(this.getName(), this.settings);
	}
	loadSettings() {
		this.settings = ZLibrary.PluginUtilities.loadSettings(this.getName(), this.defaultSettings);
	}


}
