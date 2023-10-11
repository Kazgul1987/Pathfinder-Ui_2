Hooks.on('ready', async () => {
    // Retrait de la classe de Monk's Little Details
    // Créer une erreur lorsque le module n'est pas activé
        if (game.settings.settings.has('monks-little-details.window-css-changes')) {
                game.settings.set("monks-little-details", "window-css-changes", false);
                $("body").removeClass("change-windows");
        }
		if (game.modules.has('pf2e-dorako-ui') && game.modules.get('pf2e-dorako-ui').active) {
			ui.notifications.error(game.i18n.localize('RPGUI.SETTINGS.DORAKOUI'));
		}
});

Hooks.on('init', () => {
	// Register module settings.

	game.settings.register('pathfinder-ui', 'adjustTokenEffectsHudToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.TOKEN_EFFECT_HUD'),
		hint: game.i18n.localize('RPGUI.SETTINGS.TOKEN_EFFECT_HUD_HINT'),
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'navigationVerticalToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.NAVIGATION'),
		hint: game.i18n.localize('RPGUI.SETTINGS.NAVIGATION_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'compactModeToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.COMPACT_MODE'),
		hint: game.i18n.localize('RPGUI.SETTINGS.COMPACT_MODE_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'standardLogoToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.STANDARD_LOGO'),
		hint: game.i18n.localize('RPGUI.SETTINGS.STANDARD_LOGO_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'minimalUICompatibility', {
		name: game.i18n.localize('RPGUI.SETTINGS.MINIMAL_UI'),
		hint: game.i18n.localize('RPGUI.SETTINGS.MINIMAL_UI_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pathfinder-ui', 'tokenHud', {
		name: game.i18n.localize('RPGUI.SETTINGS.TOKEN_HUD'),
		hint: game.i18n.localize('RPGUI.SETTINGS.TOKEN_HUD_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'customCss', {
		name: game.i18n.localize('RPGUI.SETTINGS.CUSTOM_CSS'),
		hint: game.i18n.localize('RPGUI.SETTINGS.CUSTOM_CSS_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'journalSheet', {
		name: game.i18n.localize('RPGUI.SETTINGS.JOURNAL_SHEET'),
		hint: game.i18n.localize('RPGUI.SETTINGS.JOURNAL_SHEET_HINT'),
		scope: "client",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'cursor', {
		name: game.i18n.localize('RPGUI.SETTINGS.JOURNAL_CURSOR'),
		hint: game.i18n.localize('RPGUI.SETTINGS.JOURNAL_CURSOR_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'disableAllStyles', {
		name: game.i18n.localize('RPGUI.SETTINGS.DISABLE_STYLES'),
		hint: game.i18n.localize('RPGUI.SETTINGS.DISABLE_STYLES_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('pathfinder-ui', 'highlightGmOwnerText', {
		name: game.i18n.localize('RPGUI.SETTINGS.HIGHLIGHT_GM_OWNER_TEXT'),
		hint: game.i18n.localize('RPGUI.SETTINGS.HIGHLIGHT_GM_OWNER_TEXT_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	if (!game.settings.get('pathfinder-ui', 'compactModeToggle')) {
		if (!game.settings.get('pathfinder-ui', 'standardLogoToggle')) {
			addClassByQuerySelector("hide", "img#logo")

			let newLogo = document.createElement('div');
			let uiLeft = document.getElementById('ui-left')
			newLogo.classList.add("new-logo")
			newLogo.innerText = "Pathfinder \n2e"
			uiLeft.prepend(newLogo)
		}
	}

	if (!game.settings.get('pathfinder-ui', 'disableAllStyles')) { rpgUIAddMainCss() }
    if (game.settings.get('pathfinder-ui', 'adjustTokenEffectsHudToggle')) { rpgUIAddTokenEffectsHud() }
	if (!game.settings.get('pathfinder-ui', 'tokenHud')) { rpgUIAddTokenHud() }
	if (!game.settings.get('pathfinder-ui', 'customCss')) { rpgUIAddCustomCss() }
	if (!game.settings.get('pathfinder-ui', 'journalSheet')) { rpgUIAddJournalSheet() }
	if (!game.settings.get('pathfinder-ui', 'cursor')) { rpgUIAddCursor() }
	if (game.settings.get('pathfinder-ui', 'minimalUICompatibility')) { addClassByQuerySelector('minimal-ui-mode', 'body.vtt') }
});

Hooks.on('getSceneNavigationContext', () => {
	if (!game.settings.get('pathfinder-ui', 'navigationVerticalToggle')) {
		navigation = document.querySelector("nav.app > ol#scene-list");
		if (navigation) {
			navigation.classList.add("vertical")
		}
	}
	if (game.settings.get('pathfinder-ui', 'compactModeToggle')) {
		addClassByQuerySelector("compact-mode", "body")
	}
});

Hooks.on('renderCombatCarousel', () => {
	let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
	if (carouselSize !== "") {
		addClassByQuerySelector(carouselSize, "#combat-carousel")
	}
});

function addClassByQuerySelector(className, selector) {
	let navigation = document.querySelector(selector);
	navigation.classList.add(className)
}

function rpgUIAddMainCss() {
	if(game.settings.get('pathfinder-ui', 'highlightGmOwnerText')) { rpgUIAddOptionalCss() }


	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pathfinder-ui/css/pathfinderui.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}
function rpgUIAddTokenEffectsHud() {
    const head = document.getElementsByTagName("head")[0];
    const mainCss = document.createElement("script");
    mainCss.setAttribute("type", "text/javascript")
    mainCss.setAttribute("src", "modules/pathfinder-ui/scripts/status-halo.js")
    head.insertBefore(mainCss, head.lastChild);
 
    setTimeout(() => enableStatusHalo(), 700);
}
function rpgUIAddTokenHud() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pathfinder-ui/css/hud.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}
function rpgUIAddCustomCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pathfinder-ui/css/custom.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

function rpgUIAddJournalSheet() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pathfinder-ui/css/journal-sheet.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

function rpgUIAddCursor() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pathfinder-ui/css/cursor.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

function rpgUIAddOptionalCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pathfinder-ui/css/optional.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

Hooks.on('renderSidebarTab', async (object, html) => {
	if (object instanceof Settings) {
	  const details = html.find('#game-details')
	  const list = document.createElement('ul')
	  list.innerHTML = await renderTemplate('modules/pathfinder-ui/templates/settings-info.hbs')
	  details.append(list.firstChild)
	}
  })
