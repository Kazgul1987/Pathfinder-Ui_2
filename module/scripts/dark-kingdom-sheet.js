Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkSheetKingdomToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKKINGDOMSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKKINGDOMSHEET_HINT'),
        scope: 'client',
        config: true,
        type: String,
        choices: {
          "standard": "Original",
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
    if ( game.settings.get('pathfinder-ui', 'darkSheetKingdomToggle') !== "standard" ) {
        for (const element of document.querySelectorAll(".sheet.kingdom, .sheet.kingdom-builder")) {
            let mode = game.settings.get('pathfinder-ui', 'darkSheetKingdomToggle');
            element.classList.add("dark-kingdom-theme");
            element.classList.add(mode);
        }
    }
})