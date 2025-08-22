Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkPartySheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKPARTYSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKPARTYSHEET_HINT'),
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
    if ( game.settings.get('pathfinder-ui', 'darkPartySheetToggle') !== "standard" ) {
        const elements = document.querySelectorAll(".sheet.party");
        if (!elements.length) {
            console.error('No elements found for selector .sheet.party');
            return;
        }
        const mode = game.settings.get('pathfinder-ui', 'darkPartySheetToggle');
        for (const element of elements) {
            element.classList.add("dark-party-theme");
            element.classList.add(mode);
        }
Hooks.on("renderActorSheet", (app, html) => {
    if (
        game.settings.get('pathfinder-ui', 'darkPartySheetToggle') !== "standard" &&
        app.element.classList.contains('party')
    ) {
        let mode = game.settings.get('pathfinder-ui', 'darkPartySheetToggle');
        app.element.classList.add('dark-party-theme');
        app.element.classList.add(mode);
    }
})

