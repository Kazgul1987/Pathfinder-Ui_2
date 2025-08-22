import { registerSettings } from "./pause-icon-settings.js";

Hooks.on("setup", () => {
  registerSettings();
});
Hooks.on("renderPause", function (_, html, options) {
    if (!options.paused) return;
    const root = html[0];
    const path = game.settings.get("pathfinder-ui", "allSettings").path;
    const opacity = game.settings.get("pathfinder-ui", "allSettings").opacity / 100;
    let speed = game.settings.get("pathfinder-ui", "allSettings").speed + "s";
    const text = game.settings.get("pathfinder-ui", "allSettings").text;
    const dimensionX = game.settings.get("pathfinder-ui", "allSettings").dimensionX;
    const dimensionY = game.settings.get("pathfinder-ui", "allSettings").dimensionY;
    const top = `${-16 - (dimensionY - 128) / 2}px`;
    const left = `calc(50% - ${dimensionX / 2}px)`;
    const textColor = game.settings.get("pathfinder-ui", "allSettings").textColor;
    const shadow = game.settings.get("pathfinder-ui", "allSettings").shadow;
    const fontSize = game.settings.get("pathfinder-ui", "allSettings").fontSize;
    const size = `${(text.length * fontSize * 90 / 12) + 70}px 100px`;
    if (path === "None" || dimensionX === 0 || dimensionY === 0) {
        const pauseImg = root.querySelector("#pause.paused img");
        if (pauseImg) pauseImg.style.display = "none";
    }
    else {
        const img = root.querySelector("img");
        if (img) {
            img.setAttribute("src", path);
            if (foundry.utils.isNewerVersion(game.release.version, "10")) {
                img.classList.add("fa-spin");
                img.style.top = top;
                img.style.left = left;
                img.style.width = `${dimensionX}px`;
                img.style.height = `${dimensionY}px`;
                img.style.opacity = opacity;
                img.style.setProperty('--fa-animation-duration', speed);
            }
            else {
                speed += " linear 0s infinite normal none running rotation";
                img.style.top = top;
                img.style.left = left;
                img.style.width = `${dimensionX}px`;
                img.style.height = `${dimensionY}px`;
                img.style.opacity = opacity;
                img.style.setProperty('-webkit-animation', speed);
            }
        }
    }
    if (foundry.utils.isNewerVersion(game.release.version, "10")) {
        const caption = root.querySelector("figcaption");
        if (caption) {
            caption.textContent = text;
            if (text.length !== 0 && shadow) {
                root.style.backgroundSize = size;
                caption.style.color = textColor;
                caption.style.fontSize = `${fontSize}em`;
            }
            else if (text.length !== 0 && !shadow) {
                caption.style.color = textColor;
                caption.style.fontSize = `${fontSize}em`;
                root.style.background = "none";
            }
            else {
                root.style.background = "none";
            }
        }
    }
    else {
        const header = root.querySelector(".paused h3");
        if (header) {
            header.textContent = text;
            if (text.length !== 0 && shadow) {
                root.style.backgroundSize = size;
                header.style.color = textColor;
                header.style.fontSize = `${fontSize}em`;
            }
            else if (text.length !== 0 && !shadow) {
                header.style.color = textColor;
                header.style.fontSize = `${fontSize}em`;
                root.style.background = "none";
            }
            else {
                root.style.background = "none";
            }
        }
    }
});

Hooks.on("renderPause", (pause, element, options) => {
  if (!options.paused) return;

  const settings = game.settings.get("pathfinder-ui", "allSettings");
  const {
    path,
    opacity,
    speed,
    text,
    dimensionX,
    dimensionY,
    textColor,
    shadow,
    fontSize,
  } = settings;

  const top = `${-16 - (dimensionY - 128) / 2}px`;
  const left = `calc(50% - ${dimensionX / 2}px)`;
  const animationDuration = `${speed}s`;
  const size = `${(text.length * fontSize * 90) / 12 + 70}px 100px`;

  const pauseImg = element.querySelector("img");
  const caption = element.querySelector("figcaption");

  if (!pauseImg || !caption) return;

  if (path === "None" || dimensionX === 0 || dimensionY === 0) {
    pauseImg.style.display = "none";
  } else {
    pauseImg.style.display = "";
    pauseImg.src = path;
    pauseImg.classList.add("fa-spin");
    pauseImg.style.top = top;
    pauseImg.style.left = left;
    pauseImg.style.width = `${dimensionX}px`;
    pauseImg.style.height = `${dimensionY}px`;
    pauseImg.style.opacity = opacity / 100;
    pauseImg.style.setProperty("--fa-animation-duration", animationDuration);
  }

  caption.textContent = text;

  if (text.length !== 0 && shadow) {
    element.style.backgroundSize = size;
    caption.style.color = textColor;
    caption.style.fontSize = `${fontSize}em`;
  } else if (text.length !== 0 && !shadow) {
    caption.style.color = textColor;
    caption.style.fontSize = `${fontSize}em`;
    element.style.background = "none";
  } else {
    element.style.background = "none";
  }
});

