class PauseIconSubmenu extends foundry.applications.forms.FormApplicationV2 {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
        id: 'pause-icon-settings-submenu',
        classes: ['form'],
        popOut: true,
        position: { width: 550, height: 'auto' },
        actions: [
            { action: 'submit', label: 'Save', type: 'submit' }
        ],
        window: { title: 'Settings Submenu' }
    });

    static PARTS = {
        form: { template: '/modules/pathfinder-ui/templates/settings-submenu.html' }
    };

    formConfig = {
        onSubmit: this.onSubmit.bind(this)
    };

    activateListeners(html) {
        super.activateListeners(html);
        const picker = html.querySelector('.pi-picker-button');
        picker?.addEventListener('click', async event => {
            event.preventDefault();
            new FilePicker({
                type: 'image',
                callback: async imagePath => {
                    html.querySelector('.pi-path').value = imagePath;
                }
            }).render(true);
        });
    }

    async _prepareContext() {
        let source = game.settings.get('pathfinder-ui', 'allSettings');
        if (foundry.utils.isEmpty(source)) {
            source = {
                /*path: 'icons/svg/clockwork.svg',*/
                path: 'modules/pathfinder-ui/ui/other/paused-pfrpg.webp',
                opacity: 50,
                dimensionX: 128,
                dimensionY: 128,
                text: game.i18n.format('GAME.Paused'),
                textColor: '#EEEEEE',
                shadow: true,
                fontSize: 2,
                speed: '5'
            };
        }
        return source;
    }

    async onSubmit(event) {
        const button = event.submitter;
        if (button?.name === 'submit') {
            const form = event.target;
            await game.settings.set('pathfinder-ui', 'allSettings', {
                path: form.querySelector('.pause-icon.pi-path').value,
                opacity: Number(form.querySelector('.pause-icon.pi-opacity').value),
                dimensionX: Number(form.querySelector('.pause-icon.pi-dimensionX').value),
                dimensionY: Number(form.querySelector('.pause-icon.pi-dimensionY').value),
                text: form.querySelector('.pause-icon.pi-text').value,
                textColor: form.querySelector('.pause-icon.pi-text-color').value,
                shadow: form.querySelector('.pause-icon.pi-shadow').checked,
                fontSize: form.querySelector('.pause-icon.pi-font-size').value,
                speed: form.querySelector('.pause-icon.pi-speed').value
            });
            window.location.reload();
        }
    }
}

export const registerSettings = function () {
    game.settings.register('pathfinder-ui', 'allSettings', {
        scope: 'world',
        config: false,
        type: Object,
        default: {
            /*path: 'icons/svg/clockwork.svg',*/
            path: 'modules/pathfinder-ui/ui/other/paused-pfrpg.webp',
            opacity: 50,
            dimensionX: 128,
            dimensionY: 128,
            text: game.i18n.format('GAME.Paused'),
            textColor: '#EEEEEE',
            shadow: true,
            fontSize: 2,
            speed: '8'
        }
    });
    game.settings.registerMenu('pathfinder-ui', 'allSettings', {
        name: game.i18n.format('PAUSEICON.settings'),
        label: game.i18n.format('PAUSEICON.settingsButton'),
        icon: 'fas fa-atlas',
        type: PauseIconSubmenu,
        restricted: true
    });
};

