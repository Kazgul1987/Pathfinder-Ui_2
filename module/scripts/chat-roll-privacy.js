/*
 * @see https://github.com/flamewave000/dragonflagon-fvtt/blob/master/df-chat-enhance/src/privacy/df-chat-privacy.ts
 */

const ICONS_FOR_KNOWN_ROLL_TYPES = {
  publicroll: 'fas fa-dice-d20',
  gmroll: 'fas fa-user-secret',
  blindroll: 'fas fa-user-ninja',
  selfroll: 'fas fa-ghost',
};

export default class ChatRollPrivacy {
  static setup() {
    game.keybindings.register('pathfinder-ui', 'roll-mode.publicroll', {
      name: 'Public Roll',
      editable: [{ key: 'KeyQ', modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: 'Roll Type Shortcuts',
      onDown: () => {
        document.querySelector('#rpg-ui-buttons > button[data-id="publicroll"]')?.click();
      },
    });
    game.keybindings.register('pathfinder-ui', 'roll-mode.gmroll', {
      name: 'Private GM Roll',
      editable: [{ key: 'KeyW', modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: 'Roll Type Shortcuts',
      onDown: () => {
        document.querySelector('#rpg-ui-buttons > button[data-id="gmroll"]')?.click();
      },
    });
    game.keybindings.register('pathfinder-ui', 'roll-mode.blindroll', {
      name: 'Blind GM Roll',
      editable: [{ key: 'KeyE', modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: 'Roll Type Shortcuts',
      onDown: () => {
        document.querySelector('#rpg-ui-buttons > button[data-id="blindroll"]')?.click();
      },
    });
    game.keybindings.register('pathfinder-ui', 'roll-mode.selfroll', {
      name: 'Self Roll',
      editable: [{ key: 'KeyR', modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: 'Roll Type Shortcuts',
      onDown: () => {
        document.querySelector('#rpg-ui-buttons > button[data-id="selfroll"]')?.click();
      },
    });
  }

  static init() {
    game.settings.register('pathfinder-ui', 'enabled', {
      name: 'RPGUI.SETTINGS.EnableTitle',
      hint: 'RPGUI.SETTINGS.EnableHint',
      scope: 'client',
      type: Boolean,
      default: true,
      config: true,
      onChange: () => {
        location.reload();
      },
    });
    game.settings.register('pathfinder-ui', 'replace-buttons', {
      name: 'RPGUI.SETTINGS.ReplaceButtonsTitle',
      hint: 'RPGUI.SETTINGS.ReplaceButtonsHint',
      scope: 'client',
      type: Boolean,
      default: true,
      config: true,
      onChange: () => {
        location.reload();
      },
    });

    if (
      !game.settings.get('pathfinder-ui', 'enabled')
      || game.settings.get('pathfinder-ui', 'disableAllStyles')
    ) {
      return;
    }

    Hooks.once('renderChatLog', this._handleChatLogRendering);
  }

  static calcColour(current, count) {
    return `rgb(${(current / count) * 255},${(1 - (current / count)) * 255},0)`;
  }

  static async _handleChatLogRendering(chat, html, data) {
    const buttons = [];
    const iconKeys = Object.keys(ICONS_FOR_KNOWN_ROLL_TYPES);
    for (const [k, v] of Object.entries(data.rollModes)) {
      let rt, name;

      if (foundry.utils.isNewerVersion(game.release.version, "12")) {
        rt = v.value;
        name = v.label;
      } else {
        rt = k;
        name = v;
      }

      if (!(rt in ICONS_FOR_KNOWN_ROLL_TYPES)) {
        console.warn(Error(`Unknown roll type '${rt}'`));
        continue;
      }
      buttons.push({
        rt: rt,
        name: game.i18n.localize(name),
        active: data.rollMode === rt,
        icon: ICONS_FOR_KNOWN_ROLL_TYPES[rt],
        colour: ChatRollPrivacy.calcColour(iconKeys.findIndex(x => x == rt), iconKeys.length),
      });
    }
    const temp = document.createElement('div');
    temp.innerHTML = await renderTemplate('modules/pathfinder-ui/templates/privacy-button.hbs', { buttons });
    const buttonHtml = temp.firstElementChild;
    buttonHtml.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const rollType = button.getAttribute('data-id');
        game.settings.set('core', 'rollMode', rollType);
        const active = buttonHtml.querySelector('button.active');
        if (active) active.classList.remove('active');
        button.classList.add('active');
      });
    });
    const select = html[0].querySelector('select[name=rollMode]');
    if (select) {
      select.after(buttonHtml);
      select.remove();
    }
    const fragment = document.createElement('template');
    fragment.innerHTML = await renderTemplate('modules/pathfinder-ui/templates/privacy-button.hbs', { buttons });
    const buttonHtml = fragment.content.firstElementChild;
    buttonHtml.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rollType = btn.getAttribute('data-id');
        game.settings.set('core', 'rollMode', rollType);
        buttonHtml.querySelector('button.active')?.classList.remove('active');
        btn.classList.add('active');
      });
    });

    const rollModeSelect =
      html[0].querySelector('select[name=rollMode]') ||
      html[0].querySelector('select[name=messageVisibility]');
    rollModeSelect?.insertAdjacentElement('afterend', buttonHtml);
    rollModeSelect?.remove();

    if (!game.settings.get('pathfinder-ui', 'replace-buttons'))
      return;

    // Adjust the button container to remove the extra margin since those buttons are now moving in.
    buttonHtml.style.margin = '0 0 0 0.5em';

    // Convert the old <a> tag elements to <button> tags
    let first = true;
    html[0].querySelectorAll('#chat-controls div.control-buttons a').forEach(a => {
      const htmlContent = a.innerHTML;
      const classes = a.className;
      const ariaLabel = a.getAttribute('aria-label');
      const tooltip = a.getAttribute('data-tooltip');
      const style = a.getAttribute('style');
    const chatControls =
      html[0].querySelector('#chat-controls') || html[0].querySelector('.chat-controls');
    chatControls?.querySelectorAll('div.control-buttons a').forEach((anchor) => {
      const htmlContent = anchor.innerHTML;
      const classes = anchor.getAttribute('class') ?? '';
      const ariaLabel = anchor.getAttribute('aria-label') ?? '';
      const tooltip = anchor.getAttribute('data-tooltip') ?? '';
      const style = anchor.getAttribute('style') ?? '';
      const button = document.createElement('button');
      button.className = classes;
      if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
      if (tooltip) button.setAttribute('data-tooltip', tooltip);
      if (style) button.setAttribute('style', style);
      button.innerHTML = htmlContent;
      button.addEventListener('click', () => a.click());
      // Add a small margin between the first button and the RollTypes
      button.addEventListener('click', () => anchor.click());
      if (first) {
        button.style.marginLeft = '0.5em';
        first = false;
      }
      buttonHtml.appendChild(button);
    });

    const controls = html[0].querySelector('#chat-controls div.control-buttons');
    if (controls) controls.remove();
    chatControls?.querySelector('div.control-buttons')?.remove();
  }
}
