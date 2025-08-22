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

