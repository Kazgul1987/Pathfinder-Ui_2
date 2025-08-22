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
        const elements = document.querySelectorAll(".sheet.character");
        if (!elements.length) {
            console.error('No elements found for selector .sheet.character');
            return;
        }
        const mode = game.settings.get('pathfinder-ui', 'darkSheetToggle');
        for (const element of elements) {
            element.classList.add("dark-theme");
            element.classList.add(mode);
        }
Hooks.on("renderActorSheet", (app, html) => {
    if (
        game.settings.get('pathfinder-ui', 'darkSheetToggle') !== 'standard' &&
        app.element.classList.contains('character')
    ) {
        let mode = game.settings.get('pathfinder-ui', 'darkSheetToggle');
        app.element.classList.add('dark-theme');
        app.element.classList.add(mode);
    }
})

