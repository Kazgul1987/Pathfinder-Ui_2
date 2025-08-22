import { registerSettings } from "./pause-icon-settings.js";

Hooks.on("setup", () => {
  registerSettings();
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

