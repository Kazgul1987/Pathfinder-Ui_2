Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkLootSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKLOOTSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKLOOTSHEET_HINT'),
        scope: 'client',
        config: true,
        type: String,
        choices: {
          "standard": "Original",
          "dark": "Dark Mode (Remaster)",
          "glassy": "Dark Mode Glassy (Remaster)"
        },
        default: "standard",
        onChange: value => {},
		//onChange: () => {
		//	location.reload();
		//}
    });
})

Hooks.on("renderLootSheetPF2e", (app, html) => {
    if (game.settings.get('pathfinder-ui', 'darkLootSheetToggle') !== 'standard') {
        let mode = game.settings.get('pathfinder-ui', 'darkLootSheetToggle');
        app.element.classList.add('dark-loot-theme');
        app.element.classList.add(mode);
    }
})

