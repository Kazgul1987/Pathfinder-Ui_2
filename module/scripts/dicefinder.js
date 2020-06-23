Hooks.on('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id: "PF12", name: "Pathfinder 1 & 2"}, true);
  
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
        "modules/pathfinder-ui/ui/dice/nat20.png"
      ],
      system: "PF12"
    });
  
    dice3d.addTexture("PF12red", {
      name: "Pathfinder Red",
      composite: "source-over",
      source: "modules/pathfinder-ui/ui/dice/redTexture.png"
    })
    .then(() => {
        dice3d.addColorset({
          name: 'pf12',
          description: "Pathfinder Red/Gold",
          category: "Pathfinder 1 & 2",
          texture: 'PF12red',
          edge: '#d9a463',
          foreground: '#d9a463',
          default: true
        },"force");
    });
  });
  