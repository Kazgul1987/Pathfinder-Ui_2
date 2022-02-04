Hooks.on('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id: "basic", name: "☑ Dicefinder Basic"}, false);
  
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
        "modules/pathfinder-ui/ui/dice/basic/nat20.webp"
      ],
      system: "basic"
    });
    dice3d.addDicePreset({
      type: "dc",
      labels: [
        "modules/pathfinder-ui/ui/dice/basic/tail.webp",
        "modules/pathfinder-ui/ui/dice/basic/heads.webp"
      ],
      system: "basic"
    });

    dice3d.addDicePreset({
      type: "d2",
      labels: [
        "modules/pathfinder-ui/ui/dice/basic/tail_bump.webp",
        "modules/pathfinder-ui/ui/dice/basic/heads_bump.webp"
      ],
      system: "basic"
    });
  
    dice3d.addTexture("PFred", {
      name: "☑ Dicefinder Basic",
      composite: "source-over",
      source: "modules/pathfinder-ui/ui/dice/texture/texture.webp"
    })
    .then(() => {
      dice3d.addColorset({
        name: 'basic',
          description: "☑ Dicefinder Basic",
          category: "Pathfinder",
          texture: 'PFred',
          material: "chrome",
          foreground: "#c98e45",
          outline: 'none',
          edge: "#c98e45"
        },false);
    });

    dice3d.addSystem({id:"campaign",name:"☑ Dicefinder campaign"},false);

    dice3d.addDicePreset({
      type: "dc",
      labels: [
        "modules/pathfinder-ui/ui/dice/basic/tail.webp",
        "modules/pathfinder-ui/ui/dice/basic/heads.webp"
      ],
      system: "campaign"
    });

    dice3d.addDicePreset({
      type: "d2",
      labels: [
        "modules/pathfinder-ui/ui/dice/basic/tail_bump.webp",
        "modules/pathfinder-ui/ui/dice/basic/heads_bump.webp"
      ],
      system: "campaign"
    });
  
    dice3d.addDicePreset({
      type:"d4",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d4/d4-1.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d4/d4-2.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d4/d4-3.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d4/d4-4.webp'
      ],
    system:"campaign"
    });

    dice3d.addDicePreset({
      type:"d6",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d6/d6-1.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d6/d6-2.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d6/d6-3.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d6/d6-4.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d6/d6-5.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d6/d6-6.webp'
      ],
    system:"campaign"
    });    
    
    dice3d.addDicePreset({
      type:"df",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/df/dfm.webp',
        'modules/pathfinder-ui/ui/dice/campaign/df/df.webp',
        'modules/pathfinder-ui/ui/dice/campaign/df/dfp.webp'
      ],
      system:"campaign"
    }); 

    dice3d.addDicePreset({
      type:"d8",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-1.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-2.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-3.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-4.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-5.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-6.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-7.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d8/d8-P.webp'
      ],
    system:"campaign"
    });
    
    dice3d.addDicePreset({
      type:"d10",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-1.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-2.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-3.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-4.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-5.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-6.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-7.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-8.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-9.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d10/d10-10.webp'
      ],
      system:"campaign"
    });

    dice3d.addDicePreset({
      type:"d12",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-1.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-2.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-3.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-4.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-5.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-6.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-7.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-8.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-9.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-10.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-11.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d12/d12-12.webp'
      ],
      system:"campaign"
    });

    dice3d.addDicePreset({
      type:"d100",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-10.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-20.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-30.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-40.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-50.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-60.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-70.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-80.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-90.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d100/d100-100.webp'
      ],
      system:"campaign"
    });

    dice3d.addDicePreset({
      type:"d20",
      labels:[
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-1.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-2.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-3.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-4.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-5.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-6.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-7.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-8.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-9.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-10.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-11.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-12.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-13.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-14.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-15.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-16.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-17.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-18.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-19.webp',
        'modules/pathfinder-ui/ui/dice/campaign/d20/d20-20.webp'
      ],
      system:"campaign"
    });
   
    dice3d.addTexture("d4", {
      name: "☑ Dicefinder Campaign",
      composite: "source-over",
      source: "modules/pathfinder-ui/ui/dice/texture/d4.webp"
    })
    .then(() => {
      dice3d.addColorset({
        name: 'campaign',
          description: "☑ Dicefinder Campaign",
          category: "Pathfinder",
          texture: 'd4',
          material: "glass",
          foreground: "#c98e45",
          outline: 'none',
          edge: "#c98e45"
        },false);
    });

    dice3d.addSystem({id: "darkmode", name: "☑ Dicefinder Dark Mode"}, false);
  
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
        "modules/pathfinder-ui/ui/dice/basic/nat20.webp"
      ],
      system: "darkmode"
    });
    dice3d.addDicePreset({
      type: "dc",
      labels: [
        "modules/pathfinder-ui/ui/dice/basic/tail.webp",
        "modules/pathfinder-ui/ui/dice/basic/heads.webp"
      ],
      system: "darkmode"
    });

    dice3d.addDicePreset({
      type: "d2",
      labels: [
        "modules/pathfinder-ui/ui/dice/basic/tail_bump.webp",
        "modules/pathfinder-ui/ui/dice/basic/heads_bump.webp"
      ],
      system: "darkmode"
    });

    dice3d.addTexture("transparente", {
      name: "☑ Dicefinder Dark Mode",
      composite: "source-over",
      source: "modules/pathfinder-ui/ui/dice/texture/transparente.webp"
    })
    .then(() => {
      dice3d.addColorset({
        name: 'darkmode',
          description: "☑ Dicefinder Dark Mode",
          category: "Pathfinder",
          texture: 'transparente',
          material: "glass",
          foreground: "#c98e45",
          outline: 'none',
          edge: "#c98e45"
        },false);
    });
  });
  