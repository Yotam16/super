export function playClickSound() {

    const audio = new Audio('chime.wav');
    audio.play();
}

export function addToCartSound() {

    const audio = new Audio('ding.mp3');
    audio.play();

}

// to deploy use these lines, don't forget to import as well!
// document.getElementById("buttonID").addEventListener("click", playClickSound);
// document.getElementById("addButtonID").addEventListener("click", addToCatSound);


