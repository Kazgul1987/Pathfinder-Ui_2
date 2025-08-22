const ALLIANCES = ['default', 'neutral', 'opposition', 'party'];

export default class AllianceViewer {
  static init() {
    game.settings.register('pathfinder-ui', 'enabledAllianceViewer', {
      name: 'RPGUI.SETTINGS.EnableAllianceViewerTitle',
      hint: 'RPGUI.SETTINGS.EnableAllianceViewerHint',
      scope: 'world',
      type: Boolean,
      default: true,
      config: true,
      onChange: () => {
        location.reload();
      },
    });

    if (!game.settings.get('pathfinder-ui', 'enabledAllianceViewer')) {
      return;
    }

    Hooks.on('renderActorDirectory', this._handleActorDirectoryRendering);
    Hooks.on('updateActor', this._handleActorUpdated);
  }

  static _handleActorDirectoryRendering(object, html) {
    if (!game.user.isGM) {
      return;
    }

    const documentList = html[0].querySelectorAll('li.directory-item.document');
    const collection = object.constructor.collection;

    // Interate through each directory list item.
    for (const li of documentList) {
      const actorDoc = collection.get(li.dataset.documentId);

      if (!['character', 'npc'].includes(actorDoc.type)) {
        continue;
      }

      const alliance = AllianceViewer.#getDocumentAlliance(actorDoc);

      const marker = document.createElement('div');
      marker.classList.add('pfui-alliance-viewer', `alliance-${alliance}`);
      marker.dataset.actorId = actorDoc.id;
      marker.dataset.tooltip = AllianceViewer.#getTooltip(alliance);
      li.appendChild(marker);
    }
  }

  static _handleActorUpdated(actor) {
    if (!game.user.isGM) {
      return;
    }

    document.querySelectorAll('.pfui-alliance-viewer').forEach(element => {
      const id = element.dataset.actorId;

      if (id === actor.id) {
        ALLIANCES.forEach(alliance => element.classList.remove(`alliance-${alliance}`));
        const alliance = AllianceViewer.#getDocumentAlliance(actor);

        element.classList.add(`alliance-${alliance}`);
        element.dataset.tooltip = AllianceViewer.#getTooltip(alliance);
      }
    });
  }

  static #getDocumentAlliance(document) {
    return document.system?.details?.alliance ?? 'default';
  }

  static #getTooltip(alliance) {
    return game.i18n.format(`PF2E.Actor.Creature.Alliance.${alliance.titleCase()}`, { alliance });
  }
}
