Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkJournalToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKJOURNAL'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKJOURNAL_HINT'),
        scope: 'client',
        config: true,
        type: String,
        choices: {
          "standard": "Original",
          "light": "Custom",
          "dark": "Dark Custom"
        },
        default: "standard",
        onChange: value => {},
		//onChange: () => {
		//	location.reload();
		//}
    });
})

Hooks.on("renderJournalSheetPF2e", (app, html) => {
    if (game.settings.get('pathfinder-ui', 'darkJournalToggle') !== 'standard') {
        let mode = game.settings.get('pathfinder-ui', 'darkJournalToggle');
        app.element.classList.add('dark-custom');
        app.element.classList.add(mode);
    }
})

