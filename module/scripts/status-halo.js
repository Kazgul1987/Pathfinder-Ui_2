function countEffects(token) {
    if (!token) {
      return 0;
    }
    let numEffects = token.document.effects?.length || 0;
    token.actor?.temporaryEffects?.forEach((actorEffect) => {
      if (!actorEffect.getFlag("core", "overlay")) {
        numEffects++;
      }
    });
    return numEffects;
}

function sortIcons(e1, e2) {
    if (e1.position.x === e2.position.x) {
      return e1.position.y - e2.position.y;
    }
    return e1.position.x - e2.position.x;
}

function updateIconSize(effectIcon, size) {
    effectIcon.width = size;
    effectIcon.height = size;
}

function polar_to_cartesian(r, theta) {
    return {
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
    };
}

function updateIconPosition(effectIcon, i, effectIcons, token) {
  const actorSize = token?.actor?.size;
  let max = 20;
  if (actorSize == "tiny") max = 10;
  if (actorSize == "sm") max = 14;
  if (actorSize == "med") max = 16;
  const ratio = i / max;
  // const angularOffset = i < max ? 0 : ratio / 2;
  const gridSize = token?.scene?.grid?.size ?? 100;
  const tokenTileFactor = token?.document?.width ?? 1;
  const sizeOffset = sizeToOffset(actorSize);
  const offset = sizeOffset * tokenTileFactor * gridSize;
  const initialRotation = (0.5 + (1 / max) * Math.PI) * Math.PI;
  const { x, y } = polar_to_cartesian(offset, (ratio + 0) * 2 * Math.PI + initialRotation);
  // debugger;
    effectIcon.position.x = x / 2 + (gridSize * tokenTileFactor) / 2;
    effectIcon.position.y = (-1 * y) / 2 + (gridSize * tokenTileFactor) / 2;
}

  // Nudge icons to be on the token ring or slightly outside
  function sizeToOffset(size) {
    if (size == "tiny") {
      return 1.4;
    } else if (size == "sm") {
      return 1.0;
    } else if (size == "med") {
      return 1.2;
    } else if (size == "lg") {
      return 0.925;
    } else if (size == "huge") {
      return 0.925;
    } else if (size == "grg") {
      return 0.925;
    }
    return 1.0;
  }

  function sizeToIconScale(size) {
    if (size == "tiny") {
      return 1.4;
    } else if (size == "sm") {
      return 1.4;
    } else if (size == "med") {
      return 1.4;
    } else if (size == "lg") {
      return 1.55;
    } else if (size == "huge") {
      return 1.55;
    } else if (size == "grg") {
      return 2.2;
    }
    return 1.0;
  }

function drawBG(effectIcon, background, gridScale) {
    const r = effectIcon.width / 2;
    background.lineStyle((1 * gridScale) / 2, 0x956d58, 1, 0);
    background.drawCircle(effectIcon.position.x, effectIcon.position.y, r + 1 * gridScale);
//    background.beginFill(0xe9d7a1);
    background.beginFill(0x333333);
    background.drawCircle(effectIcon.position.x, effectIcon.position.y, r + 1 * gridScale);
    background.endFill();
}

function updateEffectScales(token) {
    // if (token?.actor?.size == "sm") return;
    const numEffects = countEffects(token);
    // debugger;
    if (numEffects > 0 && token.effects.children.length > 0) {
        const background = token.effects.children[0];
        if (!(background instanceof PIXI.Graphics)) return;

        background.clear();

        // Exclude the background and overlay
        const effectIcons = token.effects.children.slice(1, 1 + numEffects);
        const tokenSize = token?.actor?.size;

        const gridSize = token?.scene?.grid?.size ?? 100;
        // Reposition and scale them
        effectIcons.forEach((effectIcon, i, effectIcons) => {
            if (!(effectIcon instanceof PIXI.Sprite)) return;
            // debugger;

            effectIcon.anchor.set(0.5);

            const iconScale = sizeToIconScale(token?.actor?.size);
            const gridScale = gridSize / 100;
            const scaledSize = 12 * iconScale * gridScale;
            updateIconSize(effectIcon, scaledSize);
            updateIconPosition(effectIcon, i, effectIcons, token);
            drawBG(effectIcon, background, gridScale);
        });
    }
};

function enableStatusHalo() {
  const origRefreshEffects = Token.prototype._refreshEffects;
  Token.prototype._refreshEffects = function (...args) {
    if (this) {
      origRefreshEffects.apply(this, args);
      updateEffectScales(this);
    }
  };
  const effectTextureCache = new Map();
  const origDrawEffect = Token.prototype._drawEffect;
  Token.prototype._drawEffect = async function (...args) {
    if (this) {
      const src = args[0];
      const tint = args[1];
      // return if no icon is set
      if (!src) return;

      // create texture cache key. SRC is fine if we make sure to also cache the fallback image
      let fallbackEffectIcon = "icons/svg/hazard.svg";
      const effectTextureCacheKey = src || fallbackEffectIcon;
      // attempt do load pre-rendered, circular effect icon
      let effectTexture = effectTextureCache.get(effectTextureCacheKey);
      let icon;
      if (effectTexture) {
        // all set, return sprite with pre-rendered effect icon
        icon = new PIXI.Sprite(effectTexture);
      } else {
        // load effect icon texture
        let tex = await loadTexture(src, { fallback: fallbackEffectIcon });
        icon = new PIXI.Sprite(tex);
        // death icon is always layed over the whole token, don't do anything with that one
        if (src === game.settings.get("pf2e", "deathIcon")) {
          return this.effects.addChild(icon);
        }

        // create circular mask and apply it to the icon sprite
        const minDimension = Math.min(icon.width, icon.height);
        const myMask = new PIXI.Graphics().beginFill(0xffffff).drawCircle(55, 55, 55).endFill();
        myMask.width = minDimension;
        myMask.height = minDimension;
        icon.mask = myMask;
        icon.addChild(myMask);

        // render masked sprite to a texture to re-use later
        effectTexture = PIXI.RenderTexture.create({
          width: minDimension,
          height: minDimension,
        });
        canvas.app.renderer.render(icon, { renderTexture: effectTexture });
        effectTextureCache.set(effectTextureCacheKey, effectTexture);
        // use rendered texture for icon sprite instead of masked one
        icon = new PIXI.Sprite(effectTexture);
      }
      return this.effects.addChild(icon);
    }
  };
}