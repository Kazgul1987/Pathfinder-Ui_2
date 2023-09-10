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
        for (const element of document.querySelectorAll(".sheet.party")) {
            let mode = game.settings.get('pathfinder-ui', 'darkPartySheetToggle');
            element.classList.add("dark-party-theme");
            element.classList.add(mode);
        }
    }
})