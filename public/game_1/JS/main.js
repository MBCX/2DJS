import Engine from "../../../Engine/Engine.js";
import HUD from "./hud/hud.js";
import Player from "./player/player.js";

// Initialise.
document.addEventListener(
    "DOMContentLoaded",
    function () {
        new Engine();
        new Player("Player", 32, 32, [
            "ArrowRight",
            "ArrowLeft",
            "ArrowUp",
            "ArrowDown",
        ]);
        new HUD("GameHud", 64, 64);
    },
    { once: true }
);
