import Engine from "../../../Engine/Engine.js";
import Enemy from "./enemy/enemy.js";
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
        new Enemy("Enemy", 64, 64);
    },
    { once: true }
);
