let gameSeq = [];
let userSeq = [];
let highScores = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelup();
  }
});
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randIndx = Math.floor(Math.random() * 3);
  let randColor = btns[randIndx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    console.log("game ended");
    highScores.push(level - 1);
    let highScore = Math.max(...highScores);
    h2.innerHTML = `GAME OVER !! Your score was <b>${level - 1}</b> 
        <br> Press any key to start again 
        <br> highest score: ${highScore}`;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
