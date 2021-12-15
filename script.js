console.log("Welcome to Spotidy");

//Initializing Variables
let songIndex = 0;
let audioElement = new Audio('Songs/0.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem')); //using Array.from() becouse this html collection

//songs Object with arrays
let songs = [
    { songNames: "Sehrat Durmus 1", filePath: "Songs/0.mp3", coverPath: "images/0.jfif" },
    { songNames: "Sehrat Durmus 2", filePath: "Songs/1.mp3", coverPath: "images/1.png" },
    { songNames: "let me love you", filePath: "Songs/2.mp3", coverPath: "images/2.jfif" },
    { songNames: "Family Song", filePath: "Songs/3.mp3", coverPath: "images/3.png" },
    { songNames: "Sehrat Durmus 3", filePath: "Songs/4.mp3", coverPath: "images/4.png" },
    { songNames: "Sehrat Durmus 7", filePath: "Songs/5.mp3", coverPath: "images/5.jpg" },
    { songNames: "Sehrat Durmus 4", filePath: "Songs/6.mp3", coverPath: "images/6.jpg" },
    { songNames: "Sehrat Durmus 5", filePath: "Songs/7.mp3", coverPath: "images/7.png" },
    { songNames: "Sehrat Durmus 8", filePath: "Songs/7.mp3", coverPath: "images/7.png" },
    { songNames: "Sehrat Durmus 6", filePath: "Songs/8.mp3", coverPath: "images/8.jpg" }
]

songItem.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath; //changing images
    element.getElementsByClassName('songName')[0].innerText = songs[i].songNames; //changing song names
});


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

//making a function to make all songs icon like play-icon arrow function

const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        });
    }
    //to play all songs, using   array.forEach(element => {});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        //console.log(e.target);

        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle'); //when we click to play song pause icon will show
        e.target.classList.add('fa-pause-circle');
        audioElement.src = 'Songs/${songIndex+1}.mp3';
        masterSongName.innerText = songs[songIndex].songNames;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

//for backward/farword bottons

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = 'Songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songNames; //song name will be change
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = 'Songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songNames;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})