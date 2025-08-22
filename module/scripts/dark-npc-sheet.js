Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkNpcSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKNPCSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKNPCSHEET_HINT'),
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

Hooks.on("renderNPCSheetPF2e", (app, html) => {
    if (game.settings.get('pathfinder-ui', 'darkNpcSheetToggle') !== 'standard') {
        let mode = game.settings.get('pathfinder-ui', 'darkNpcSheetToggle');
        app.element.classList.add('dark-npc-theme');
        app.element.classList.add(mode);
    }
})

