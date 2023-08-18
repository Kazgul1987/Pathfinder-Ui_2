Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKSHEET_HINT'),
        scope: 'client',
        config: true,
        type: String,
        choices: {
          "standard": "Original (Red)",
          "remaster": "Original (Remaster)",
          "red": "Dark Mode (Red)",
          "dark": "Dark Mode (Remaster)"
        },
        default: "standard",
        onChange: value => {},
		//onChange: () => {
		//	location.reload();
		//}
    });
})

Hooks.on("renderActorSheet", () => {
    if ( game.settings.get('pathfinder-ui', 'darkSheetToggle') !== "standard" ) {
        for (const element of document.querySelectorAll(".sheet.character")) {
            let mode = game.settings.get('pathfinder-ui', 'darkSheetToggle');
            element.classList.add("dark-theme");
            element.classList.add(mode);
        }
    }
})