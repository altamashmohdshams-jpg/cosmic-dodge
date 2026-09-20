const spaceship = document.getElementById("spaceship");
const gameArea = document.getElementById("game-area");

const scoreDisplay = document.getElementById("score");

const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const highScoreDisplay = document.getElementById("high-score");

const restartButton = document.getElementById("restart-button");


let spaceshipPosition = 175;

let score = 0;

let asteroidSpeed = 5;

let gameOver = false;

let highScore = localStorage.getItem("cosmicHighScore") || 0;

highScoreDisplay.textContent = highScore;


document.addEventListener("keydown", function(event) {

    if (gameOver) {
        return;
    }

    if (event.key === "ArrowLeft") {

        spaceshipPosition -= 20;

    }

    if (event.key === "ArrowRight") {

        spaceshipPosition += 20;

    }


    if (spaceshipPosition < 0) {

        spaceshipPosition = 0;

    }

    if (spaceshipPosition > 350) {

        spaceshipPosition = 350;

    }


    spaceship.style.left = spaceshipPosition + "px";

});



function createAsteroid() {

    if (gameOver) {
        return;
    }


    const asteroid = document.createElement("div");


    asteroid.classList.add("asteroid");

    asteroid.textContent = "☄️";


    asteroid.style.left =
        Math.random() * 350 + "px";


    gameArea.appendChild(asteroid);


    let asteroidPosition = -50;


    const asteroidMovement = setInterval(function() {


        if (gameOver) {

            clearInterval(asteroidMovement);

            asteroid.remove();

            return;
        }


        asteroidPosition += asteroidSpeed;


        asteroid.style.top =
            asteroidPosition + "px";


        const asteroidRect =
            asteroid.getBoundingClientRect();

        const spaceshipRect =
            spaceship.getBoundingClientRect();


        if (

            asteroidRect.left <
            spaceshipRect.right &&

            asteroidRect.right >
            spaceshipRect.left &&

            asteroidRect.top <
            spaceshipRect.bottom &&

            asteroidRect.bottom >
            spaceshipRect.top

        ) {

            clearInterval(asteroidMovement);

            asteroid.remove();

            endGame();

            return;
        }


        if (asteroidPosition > 600) {

            clearInterval(asteroidMovement);

            asteroid.remove();

            score++;

            scoreDisplay.textContent =
                score;


            if (score >= 10) {

                asteroidSpeed = 7;

            }


            if (score >= 20) {

                asteroidSpeed = 9;

            }


            if (score >= 30) {

                asteroidSpeed = 11;

            }

        }

    }, 30);

}


function endGame() {

    gameOver = true;


    finalScore.textContent =
        score;


    if (score > highScore) {

        highScore = score;


        localStorage.setItem(
            "cosmicHighScore",
            highScore
        );

    }


    highScoreDisplay.textContent =
        highScore;


    gameOverScreen.classList.remove(
        "hidden"
    );

}


restartButton.addEventListener(
    "click",
    function() {

        location.reload();

    }
);

setInterval(
    createAsteroid,
    1500
);