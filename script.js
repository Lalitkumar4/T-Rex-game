const tRex = document.getElementById("t-rex");
const cactus = document.getElementById("cactus");
const scoreSpan = document.getElementById("scoreSpan");
const highScoreSpan = document.getElementById("highScoreSpan");
const restart = document.getElementById("restart");
const audioDie = document.getElementById("die");
const audioJump = document.getElementById("jump");
const audioPoint = document.getElementById("point");
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.addEventListener("keydown", jump);

// Handle jump event
function jump(e) {
  if (e.key === " " || e.key === "ArrowUp") {
    audioJump.play();
    if (tRex.classList != "animate") {
      tRex.classList.add("animate");
    }
    setTimeout(() => {
      tRex.classList.remove("animate");
    }, 300);
  }
}

// Check for collision and update score
const checkDead = setInterval(() => {
  const tRexTop = parseInt(
    window.getComputedStyle(tRex).getPropertyValue("top")
  );
  const cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  if (cactusLeft < 10 && cactusLeft > -30 && tRexTop >= 130) {
    // Game over
    audioDie.play();
    cactus.style.animation = "none";
    cactus.style.display = "none";
    clearInterval(checkDead);

    // Set HighScore to localStorage
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }

    alert(
      `GAME OVER  \n Score: ${Math.floor(
        score / 100
      )} \n High Score:  ${Math.floor(highScore / 100)}`
    );

    score = 0;
    scoreSpan.textContent = Math.floor(score / 100);
    highScoreSpan.textContent = Math.floor(highScore / 100);
  } else {
    //Update score
    score++;
    scoreSpan.textContent = Math.floor(score / 100);
    highScoreSpan.textContent = Math.floor(highScore / 100);

    if (score / 100 == 25) {
      audioPoint.play();
    }
  }
}, 10);

// Restart game
restart.addEventListener("click", () => {
  window.location.reload();
});
