Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkNpcSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKNPCSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKNPCSHEET_HINT'),
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

Hooks.on("renderNPCSheetPF2e", () => {
    if ( game.settings.get('pathfinder-ui', 'darkNpcSheetToggle') !== "standard" ) {
        for (const element of document.querySelectorAll(".actor.npc, .sheet.actor.loot")) {
            let mode = game.settings.get('pathfinder-ui', 'darkNpcSheetToggle');
            element.classList.add("dark-npc-theme");
            element.classList.add(mode);
        }
    }
})