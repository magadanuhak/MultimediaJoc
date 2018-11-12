var iDir = "assets/img/";
var bestScore = localStorage.getItem('bestScore');
var bestScoreItem;
var currentMission;
console.log(bestScore);
var isDraw = false;
var isTimer = false;
var fructPos;
var color;
var fructType;
var fruitWidth = 50;
var fruitHeight = 50;
var score;
var fruitCtx, fruitCanvas;
var knifeCtx, knifeCanvas;
//initializare audio
var audio = {};
var audioDir = "assets/sound/";
audio['score'] = new Audio();
audio['score'].src = audioDir + "fruct_taiat.mp3";
audio['knife'] = new Audio();
audio['knife'].src = audioDir + "knife.mp3";
audio['intro'] = new Audio();
audio['intro'].src = audioDir + "intro.mp3";
function soundSetVolume(sound, volume) {
    audio[sound].volume = volume;
}
function initCurrentMission() {
    if (localStorage.getItem('currentChallenge') == null) {
        localStorage.setItem('currentChallenge', 0);
    }
    currentMission = localStorage.getItem('currentChallenge');
    document.querySelector('#challengeCount').innerHTML = currentMission;
}
function playSound(sound) {
    audio[sound].play();
}
function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function stopSound(sound) {
    audio[sound].pause();
    audio[sound].currentTime = 0;
}
function getFruct() {
    var fruct = Math.floor(Math.random() * 9);
    fructType = fruct;
    return fruct;
}
function getPos(canvas) {
    return {
        x: getRnd(fruitWidth, canvas.width - fruitWidth),
        y: getRnd(fruitHeight, canvas.height - fruitHeight)
    };
}
;
function addFruct() {
    var base_image = document.querySelector('#i' + getFruct());
    var pos = getPos(fruitCanvas);
    fructPos = pos;
    fruitCtx.drawImage(base_image, pos.x, pos.y, fruitWidth, fruitHeight);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function addScore(value) {
    var newScore = parseInt(score.textContent) + value;
    score.innerHTML = newScore;
    if (bestScore == 'null') {
        localStorage.setItem('bestScore', newScore);
    }
    else if (newScore > bestScore) {
        localStorage.setItem('bestScore', newScore);
        bestScoreItem.innerHTML = newScore;
    }
    console.log(newScore);
    playSound('score');
}
function drawpoint(canvas, ctx, evt) {
    var pos = getMousePos(canvas, evt);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + 8, pos.y + 8);
    ctx.strokeStyle = color;
    ctx.stroke();
}
function pornireJoc() {
    document.querySelector('.gameMenu').classList.add('hide');
    playSound('intro');
    addFruct();
}
function killFruct() {
    fruitCtx.clearRect(0, 0, fruitCanvas.width, fruitCanvas.height);
    var val = 870;
    switch (fructType) {
        case 0:
            val = 500;
            break;
        case 1:
            val = 250;
            break;
        case 2:
            val = 1430;
            break;
    }
    addScore(val);
    addFruct(fruitCanvas, fruitCtx);
}
function initializare() {
    initCurrentMission();
    fruitCanvas = document.querySelector('#fructe');
    fruitCtx = fruitCanvas.getContext('2d');
    score = document.querySelector('#score');
    bestScoreItem = document.querySelector('#bestScore');
    if (localStorage.getItem('bestScore') !== 'null') {
        bestScoreItem.innerHTML = localStorage.getItem('bestScore');
    }
}
// partea cu effecte
// particule
// sfirsit particule
// sfirsit partea cu efecte
function knifeTime(canvas) {
    setTimeout(function () {
        if (isDraw) {
            isDraw = false;
            knifeCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 400);
}
// functia pentru culori random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function showModal(title, text) {
    document.querySelector('#modalText').innerHTML = text;
    document.querySelector('#modalTitle').innerHTML = title;
    $('#modalFer').toggle();
}
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.querySelector("#joc");
    knifeCtx = canvas.getContext("2d");
    var playButton = document.querySelector('#playButton');
    initializare();
    knifeCtx.Alpha = 0;
    canvas.addEventListener('mousedown', function () {
        isDraw = true;
        color = getRandomColor();
        isTimer = true;
        playSound('knife');
    });
    canvas.addEventListener('mousemove', function (evt) {
        if (isDraw) {
            drawpoint(canvas, knifeCtx, evt);
            if (getMousePos(canvas, evt).x >= fructPos.x && getMousePos(canvas, evt).x <= fructPos.x + fruitHeight &&
                getMousePos(canvas, evt).y >= fructPos.y && getMousePos(canvas, evt).y <= fructPos.y + fruitWidth) {
                console.log('Am tait');
                killFruct(canvas, knifeCtx);
            }
            knifeTime(canvas);
        }
    });
    canvas.addEventListener('mouseup', function () {
        knifeCtx.clearRect(0, 0, canvas.width, canvas.height);
        isDraw = false;
        stopSound('knife');
    });
    canvas.addEventListener('mouseleave', function () {
        knifeCtx.clearRect(0, 0, canvas.width, canvas.height);
        isDraw = false;
    });
    $('#scores').on('click', function () {
        showModal('Scoruri', 'Cel mai mare scor este ' + bestScoreItem.innerText);
    });
    $('#about').on('click', function () {
        showModal('Despre Joc', 'Joc creat de Daniel Maga in anul 2018, pentru Tehnologii Multimedia');
    });
    $('.inchide').on('click', function () {
        $('#modalFer').toggle();
    });
    $('#startChallenge').on('click', function () {
        startTimeChallenge();
        $('.nextChallengeMenu').addClass('hide');
    });
    playButton.addEventListener('click', function (el) {
        console.log('click');
        $('#gameMenu').remove;
        $('.nextChallengeMenu').removeClass('hide');
    });
    //anulare selectare text cu mouse
    function disableselect(e) {
        return false;
    }
    function reEnable() {
        return true;
    }
    document.onselectstart = new Function("return false");
    if (window.sidebar) {
        document.onmousedown = disableselect;
        document.onclick = reEnable;
    }
});
function startTimeChallenge() {
    fruitCtx.clearRect(0, 0, fruitCanvas.width, fruitCanvas.height);
    score.innerHTML = 0;
    var challenge = currentMission;
    var i = missions.time[challenge].t;
    var timeBar = document.querySelector('#timeBar');
    timeBar.max = missions.time[challenge].t;
    timeBar.value = timeBar.max;
    document.querySelector('#necessaryScore').innerHTML = missions.time[challenge].s;
    pornireJoc();
    setTimeout(function () {
        if (parseInt(score.textContent) >= parseInt(missions.time[challenge].s)) {
            localStorage.setItem('currentChallenge', parseInt(challenge) + 1);
            currentMission++;
            document.querySelector('#challengeCount').innerHTML = currentMission;
            document.querySelector('#message').innerHTML = 'Felicitari ati trecut nivelul ';
            document.querySelector('#challengeButtonText').innerHTML = " Următorul Challenge";
            $('.nextChallengeMenu').removeClass('hide');
            isTime = false;
        }
        else {
            document.querySelector('#message').innerHTML = 'Ne pare rau dar nu ati trecut nivelul';
            document.querySelector('#challengeButtonText').innerHTML = " Restartare Challenge";
            $('.nextChallengeMenu').removeClass('hide');
        }
        clearInterval(bara);
        i = 0;
    }, missions.time[challenge].t * 1000);
    var bara = setInterval(frame, 1000);
    function frame() {
        if (i = 0) {
            clearInterval(bara);
        }
        else {
            i--;
            timeBar.value = timeBar.value - 1;
        }
    }
}
;
var missions = {
    'time': [
        {
            't': 12,
            's': 10000
        },
        {
            't': 17,
            's': 15000
        },
        {
            't': 20,
            's': 18000
        },
        {
            't': 25,
            's': 22000
        },
        {
            't': 28,
            's': 28000
        },
        {
            't': 25,
            's': 25000
        },
        {
            't': 28,
            's': 30000
        },
        {
            't': 35,
            's': 40000
        },
        {
            't': 40,
            's': 44000
        },
        {
            't': 44,
            's': 48000
        },
        {
            't': 36,
            's': 50000
        },
        {
            't': 37,
            's': 52000
        },
        {
            't': 40,
            's': 63000
        },
        {
            't': 43,
            's': 68000
        },
        {
            't': 47,
            's': 75000
        },
        {
            't': 50,
            's': 80000
        },
        {
            't': 55,
            's': 87000
        },
        {
            't': 55,
            's': 93000
        },
        {
            't': 60,
            's': 100000
        },
        {
            't': 63,
            's': 110000
        },
        {
            't': 64,
            's': 120000
        },
        {
            't': 65,
            's': 130000
        },
        {
            't': 70,
            's': 145000
        },
        {
            't': 80,
            's': 155000
        },
        {
            't': 90,
            's': 160000
        },
        {
            't': 106,
            's': 180000
        },
        {
            't': 110,
            's': 200000
        }
    ]
};
console.log(missions);
