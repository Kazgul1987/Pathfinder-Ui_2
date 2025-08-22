Hooks.on("init", () => {

	game.settings.register('pathfinder-ui', 'darkLootSheetToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.DARKLOOTSHEET'),
        hint: game.i18n.localize('RPGUI.SETTINGS.DARKLOOTSHEET_HINT'),
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

Hooks.on("renderLootSheetPF2e", () => {
    if ( game.settings.get('pathfinder-ui', 'darkLootSheetToggle') !== "standard" ) {
        const elements = document.querySelectorAll(".sheet.actor.loot");
        if (!elements.length) {
            console.error('No elements found for selector .sheet.actor.loot');
            return;
        }
        const mode = game.settings.get('pathfinder-ui', 'darkLootSheetToggle');
        for (const element of elements) {
            element.classList.add("dark-loot-theme");
            element.classList.add(mode);
        }
    }
})