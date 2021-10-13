Hooks.on('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id: "PF", name: "Dicefinder"}, "default");
  
    dice3d.addDicePreset({
      type: "d20",
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "modules/pathfinder-ui/ui/dice/nat20.webp"
      ],
      system: "PF"
    });
    dice3d.addDicePreset({
      type: "dc",
      colorset: "coin_default",
      labels: [
        "modules/pathfinder-ui/ui/dice/tail.webp",
        "modules/pathfinder-ui/ui/dice/heads.webp"
      ],
      system: "PF"
    });

    dice3d.addDicePreset({
      type: "d2",
      colorset: "coin_default",
      labels: [
        "modules/pathfinder-ui/ui/dice/tail_bump.webp",
        "modules/pathfinder-ui/ui/dice/heads_bump.webp"
      ],
      system: "PF"
    });

    dice3d.addTexture("PFred", {
      name: "Dicefinder",
      composite: "source-over",
      source: "modules/pathfinder-ui/ui/dice/texture.webp"
    })
    .then(() => {
        dice3d.addColorset({
          name: 'pf',
          description: "Dicefinder",
          category: "Pathfinder",
          texture: 'PFred',
          material: "chrome",
          background: "#6F0000",
          foreground: "#c98e45",
          outline: 'none',
          edge: "#c98e45",
          default: true
        },"default");
    });
  });
  