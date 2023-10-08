"use strict";
(() => {
    function i() {
        game.settings.register("pathfinder-ui", "size", {
            name: game.i18n.localize('RPGUI.SETTINGS.SIMPLY_PORTRAITS'),
            hint: game.i18n.localize('RPGUI.SETTINGS.SIMPLY_PORTRAITS_HINT'),
            scope: "client",
            type: Number,
            default: 36,
            config: !0,
            requiresReload: !0
        })
    }

    function c(t) {
        let e = document.createElement("img"),
            n = game.settings.get("pathfinder-ui", "size");
        return e.src = t, e.width = n, e.height = n, e.classList.add("simply-portraits"), e
    }

    function g(t) {
        let e = document.createElement("video"),
            n = game.settings.get("pathfinder-ui", "size");
        return e.src = t, e.width = n, e.height = n, e.autoplay = !1, e.controls = !1, e.muted = !0, e.classList.add("simply-portraits"), e
    }

    function l(t) {
        return /(?:\.([^.]+))?$/.exec(t)?.[1] === "webm"
    }

    function u(t) {
        return game.scenes.get(t.scene)?.tokens.get(t.token)?.texture?.src
    }

    function m(t) {
        let n = game.actors.get(t.actor)?.prototypeToken;
        return n?.randomImg ? null : n?.texture?.src
    }

    function p(t) {
        let e = t.speaker;
        return e.token ? u(e) : m(e)
    }
    Hooks.on("init", i);
    Hooks.on("preCreateChatMessage", (t, e, n, s) => {
        let r = p(t);
        r && t.updateSource({
            flags: {
                "simply-portraits": {
                    src: r
                }
            }
        })
    });
    Hooks.on("renderChatMessage", (t, e, n) => {
        let s = e.find(".message-header")?.[0],
            r = t.flags?.["simply-portraits"]?.src;
        if (!s || !r) return;
        let a = l(r) ? g(r) : c(r);
        s.prepend(a), s.style.paddingBottom = "3px";
        let o = e.find(".message-sender")?.[0];
        !o || (o.style.alignSelf = "center")
    });
})();