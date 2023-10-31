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
        for (const element of document.querySelectorAll(".journal-entry")) {
            let mode = game.settings.get('pathfinder-ui', 'darkJournalToggle');
            element.classList.add("dark-custom");
            element.classList.add(mode);
        }
    }
})