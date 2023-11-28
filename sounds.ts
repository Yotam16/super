export const SOUND_CLICK = 'assets/sounds/chime.wav';
export const SOUND_ADDTOCART = 'assets/sounds/ding.mp3'

export function playSound(sound: string) {
    const audio = new Audio(sound);

    audio.play();
}

// to deploy use these lines, don't forget to import as well!
// document.getElementById("buttonID").addEventListener("click", playClickSound);
// document.getElementById("addButtonID").addEventListener("click", addToCatSound);


