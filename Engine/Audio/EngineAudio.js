import EngineUtils from "../utils/EngineUtils.js"

/**
 * Keeps track of how many HTML5 audio elements
 * are active.
 */
let audio_elements_list = [];

const utils = new EngineUtils();

export class EngineAudio {
    /**
     * @param {String} audio_file_src Source of the audio file.
     * @param {Boolean} loop Enable looping for this audio file?
     * @public
     */
    playAudio(audio_file_src, loop = false, audio_options = {
        volume: 0.2
    }) {
        
        // Play audio that's already in the list,
        // otherwise add it.
        for (let i = 0; audio_elements_list.length > i; ++i) {
            const audio_el_src = audio_elements_list[i].src.split("/");
            const audio_src = audio_file_src.split("/");
            if (audio_el_src[audio_el_src.length - 1] === audio_src[audio_src.length - 1]) {
                audio_elements_list[i].play();
                return;
            }
        }
        
        const audio_element = new Audio(audio_file_src);
        audio_element.volume = audio_options.volume;
        audio_element.loop = loop;

        audio_element.addEventListener("canplay", this.audioIsReady.bind(this, audio_element));
        if (loop) {
            audio_element.addEventListener("ended", this.automaticallyLoop.bind(this, audio_element));
        } else {
            audio_element.addEventListener("ended", this.removeAudioWhenFinished.bind(this, audio_element));
        }
    }

    /** @private */
    audioIsReady(audio_element) {
        audio_elements_list.push(audio_element);
        audio_element.play();
    }

    /** @private */
    automaticallyLoop(audio_element) {
        audio_element.play();
    }

    /** @private */
    removeAudioWhenFinished(audio_element) {
        audio_element.removeEventListener("canplay", this.audioIsReady.bind(this));
        audio_elements_list.length = 0;
        audio_element.removeEventListener("ended", this.removeAudioWhenFinished.bind(this));
    }
}

Object.freeze(EngineAudio);
export default EngineAudio;
