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

Hooks.on("renderActorSheet", (app, html) => {
    if (
        game.settings.get('pathfinder-ui', 'darkSheetKingdomToggle') !== 'standard' &&
        app.element.classList.contains('kingdom')
    ) {
        let mode = game.settings.get('pathfinder-ui', 'darkSheetKingdomToggle');
        app.element.classList.add('dark-kingdom-theme');
        app.element.classList.add(mode);
    }
})

Hooks.on("renderKingdomBuilder", (app, html) => {
    if (game.settings.get('pathfinder-ui', 'darkSheetKingdomToggle') !== 'standard') {
        let mode = game.settings.get('pathfinder-ui', 'darkSheetKingdomToggle');
        app.element.classList.add('dark-kingdom-theme');
        app.element.classList.add(mode);
    }
})

