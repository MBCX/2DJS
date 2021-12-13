import { Engine } from "../../../../../Engine/Engine.js"
import MultiTextRender from "./multi_text.js";

new Engine().whenIsReady(() => {
    new MultiTextRender("TextRenderer", 64, 64);
});