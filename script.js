console.log("Welcome to Spotidy");

//Initializing Variables
let songIndex = 0;
let audioElement = new Audio('serhat.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');
//songs Object with arrays
let songs = [
    { songNames: "What is Your Name", filePath: "Songs/1.mp3", coverPath: "images/1.png" },
    { songNames: "Let's Count", filePath: "Songs/2.mp3", coverPath: "images/1.png" },
    { songNames: "Family Song", filePath: "Songs/3.mp3", coverPath: "images/1.png" }
]

// audioElement.play();

//handling play/puase Button
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})

//Listen to Event
//using time change event of audio through function 'timeupdate' Event by eventListener (if song (audioElement) plays time automaticaly updates)
audioElement.addEventListener("timeupdate", () => {
    //console.log("timeupdate");
    //getting percentage of our song in integer value
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //console.log(progress);
    //it will gragyally increase time on myProgressBar in output
    myProgressBar.value = progress;
})

// when we change value of myProgressBar menually the current time of song also change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    console.log(audioElement.currentTime)
})