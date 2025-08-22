Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkNpcSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKNPCSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKNPCSHEET_HINT'),
        scope: 'client',
        config: true,
        type: String,
        choices: {
          "standard": "Original",
          "dark": "Dark Mode (Remaster)",
          "glassy": "Dark Mode Glassy (Remaster)"
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
        const elements = document.querySelectorAll(".actor.npc");
        if (!elements.length) {
            console.error('No elements found for selector .actor.npc');
            return;
        }
        const mode = game.settings.get('pathfinder-ui', 'darkNpcSheetToggle');
        for (const element of elements) {
            element.classList.add("dark-npc-theme");
            element.classList.add(mode);
        }
    }
})

Hooks.on("renderNPCSheetPF2e", (app, html) => {
    if (game.settings.get('pathfinder-ui', 'darkNpcSheetToggle') !== 'standard') {
        let mode = game.settings.get('pathfinder-ui', 'darkNpcSheetToggle');
        app.element.classList.add('dark-npc-theme');
        app.element.classList.add(mode);
    }
})

