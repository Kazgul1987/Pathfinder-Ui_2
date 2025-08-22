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

Hooks.on("renderJournalSheetPF2e", () => {
    if ( game.settings.get('pathfinder-ui', 'darkJournalToggle') !== "standard" ) {
        const elements = document.querySelectorAll(".journal-entry");
        if (!elements.length) {
            console.error('No elements found for selector .journal-entry');
            return;
        }
        const mode = game.settings.get('pathfinder-ui', 'darkJournalToggle');
        for (const element of elements) {
            element.classList.add("dark-custom");
            element.classList.add(mode);
        }
    }
})

Hooks.on("renderJournalSheetPF2e", (app, html) => {
    if (game.settings.get('pathfinder-ui', 'darkJournalToggle') !== 'standard') {
        let mode = game.settings.get('pathfinder-ui', 'darkJournalToggle');
        app.element.classList.add('dark-custom');
        app.element.classList.add(mode);
    }
})

