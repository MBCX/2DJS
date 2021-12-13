import Engine from "../../../../Engine/Engine.js";
import AudioTest from "./audio_test.js";

new Engine().whenIsReady(() => {
    AudioTest.getInstance("AudioTest", [" "]);
})