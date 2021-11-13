import Engine from "../../../Engine/Engine.js";
import HUD from "./hud/hud.js";
import Player from "./player/player.js";
import Enemy from "./enemy/enemy.js";

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
        new HUD("GameHud", window.innerWidth, window.innerHeight);
        new Enemy("Enemy", 128, 128);
    },
    { once: true }
);
