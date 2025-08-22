Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkHazardSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKHAZARDSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKHAZARDSHEET_HINT'),
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

Hooks.on("renderHazardSheetPF2e", (app) => {
    if (game.settings.get('pathfinder-ui', 'darkHazardSheetToggle') !== 'standard') {
        const mode = game.settings.get('pathfinder-ui', 'darkHazardSheetToggle');
        app.element.classList.add('dark-hazard-theme', mode);
    }
})

