const winingPoints = 5;

let playerPoints = 0;
let computerPoints = 0;
let playerChoice = "";


window.addEventListener("load", () =>
{
    startPlayGameBtn();
});


function startPlayGameBtn()
{
    const playGame = document.querySelector(".play__game-btn");

    playGame.addEventListener("click", handleStartGameBtn, { once: true });
}


function createResultsSection()
{

    const results = document.createElement("section");
    results.classList.add("results");

    const h3 = document.createElement("h3");
    h3.className = "header";

    h3.innerText = "Player vs Computer. Let's go!";
    results.appendChild(h3);

    const helperText = document.createElement("p");
    helperText.className = "round";

    helperText.innerText = "Choose your weapon by clicking the buttons below.";
    results.appendChild(helperText);

    const playerScores = document.createElement("div");
    playerScores.setAttribute("class", "scores d--flex");

    const playerScoresSection = document.createElement("section");

    const playerHeading = document.createElement("h4");
    playerHeading.innerText = "Player";
    playerScoresSection.appendChild(playerHeading);

    const playerPoints = document.createElement("p");
    playerPoints.className = "player__points";

    const playerPointText = document.createElement("span");
    playerPointText.setAttribute("class", "points");

    playerPointText.innerText = "0";
    playerPoints.appendChild(playerPointText)

    playerScoresSection.appendChild(playerPoints);

    const compScoresSection = document.createElement("section");

    const compHeading = document.createElement("h4");

    compHeading.innerText = "Computer";
    compScoresSection.appendChild(compHeading);

    const computerPoints = document.createElement("p");
    computerPoints.setAttribute("class", "computer__points");

    const computerPointText = document.createElement("span");
    computerPointText.setAttribute("class", "points");
    computerPointText.innerText = "0";

    computerPoints.appendChild(computerPointText);
    compScoresSection.appendChild(computerPoints);

    playerScores.appendChild(playerScoresSection);
    playerScores.appendChild(compScoresSection);

    results.appendChild(playerScores);

    const gameBtnDiv = document.querySelector(".main__game > div");
    gameBtnDiv.parentNode.insertBefore(results, gameBtnDiv);
}


function getComputerChoice()
{
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)]
}

function updateChoice()
{
    const gameBtn = document.querySelectorAll(".main__game > .game__btn .btn");
    gameBtn.forEach(btn =>
    {
        btn.addEventListener("click", handleChoiceEvt);
    });

}



function playRound(playerChoice, compChoice)
{
    const playerPointsElement = document.querySelector(".player__points > .points");
    const computerPointsElement = document.querySelector(".computer__points > .points");

    if (playerChoice === "rock" && compChoice === "scissors" || playerChoice === "scissors" && compChoice === "paper" || playerChoice === "paper" && compChoice === "rock")
    {
        playerPoints = awardPoints(playerPoints);
        fadeInPoints(playerPointsElement, playerPoints);
        return `You win! ${playerChoice} beats ${compChoice}`;

    }
    else if (compChoice === "rock" && playerChoice === "scissors" || compChoice === "scissors" && playerChoice === "paper" || compChoice === "paper" && playerChoice === "rock")
    {

        computerPoints = awardPoints(computerPoints);
        fadeInPoints(computerPointsElement, computerPoints);
        return `You Lose! ${compChoice} beats ${playerChoice}`;

    } else
    {
        return `Tie! player  ${playerChoice} computer ${compChoice}`;

    }
}

function updateResultsSection(playerChoice, compChoice)
{
    const roundsInfo = document.querySelector(".results > p");
    fadeInRoundText(roundsInfo, playRound(playerChoice, compChoice));
    const end = endGame();
    if (end === 1)
    {
        endChoiceEvt();
        restartGame();
    }


}


function endGame()
{
    let heading = "";
    let roundText = "";
    if (playerPoints === winingPoints)
    {
        heading = `Congratulations!`;
        roundText = ` You win :)`;
        fadeInEndResults(heading, roundText);
        return 1;
    } else if (computerPoints === winingPoints)
    {
        heading = `GameOver!`;
        roundText = `You lose :( Computer wins`;
        fadeInEndResults(heading, roundText)
        return 1;
    }
    return 0;
}

function restartGame()
{
    const gameBtn = document.querySelector(".main__game > .game__btn");
    gameBtn.classList.add("d--flex", "game__btn--visually-hidden");
    gameBtn.addEventListener("transitionend", () =>
    {
        gameBtn.className = "game__btn--hidden";
        const restartBtn = document.querySelector(".restart__btn--hidden");
        restartBtn.className = "restart__btn play__game-btn restart__btn--visually-hidden";
        setTimeout(() =>
        {
            restartBtn.classList.remove("restart__btn--visually-hidden");
        }, 20)
        restartBtn.addEventListener("click", handleRestartGame, { once: true });
    }, { once: true });

}


function resetScores()
{
    playerPoints = 0;
    computerPoints = 0;
    const pointsReset = document.querySelectorAll(".points");
    pointsReset.forEach(point =>
    {
        fadeInPoints(point, "0");
    });

}
function awardPoints(points)
{
    points++;
    return points;
}


// event listeners
function handleStartGameBtn()
{
    const gameRules = document.querySelector(".game__rules");
    gameRules.classList.add("game__rules--visually-hidden");
    gameRules.addEventListener("transitionend", () =>
    {
        gameRules.className = "game__rules--hidden";
        fadeInResultSection();
        fadeInGamePlayBtn();
        updateChoice();
    }, { once: true })

}

function handleChoiceEvt()
{
    const playerChoice = this.getAttribute("id");
    const compChoice = getComputerChoice();

    updateResultsSection(playerChoice, compChoice);
}

function endChoiceEvt()
{
    const gameBtn = document.querySelectorAll(".main__game > .game__btn .btn");

    gameBtn.forEach(btn =>
    {
        btn.removeEventListener("click", handleChoiceEvt);
    });
}


function handleRestartGame(evt)
{
    const resultsHeading = document.querySelector(".results > h3");
    const roundsInfo = document.querySelector(".results > p");
    const heading = "Player vs Computer.Let's go!";
    const helperText = "Choose your weapon by clicking the buttons below.";
    const restartBtn = evt.target;
    restartBtn.classList.add("restart__btn--visually-hidden");
    restartBtn.addEventListener("transitionend", () =>
    {
        evt.target.className = "restart__btn--hidden";
        setTimeout(() =>
        {
            fadeInResultHeading(resultsHeading, heading);
            fadeInRoundText(roundsInfo, helperText);

            resetScores();
            fadeInGamePlayBtn();
            updateChoice();
        }, 100);


    }, { once: true });


}


// animations
function fadeInResultSection()
{
    createResultsSection();
    const results = document.querySelector(".results");
    results.className = "results results--visually-hidden";
    setTimeout(() =>
    {
        results.classList.remove("results--visually-hidden");
    }, 20)

}

function fadeInGamePlayBtn()
{
    const gameBtn = document.querySelector(".main__game > .game__btn--hidden");
    gameBtn.className = "game__btn d--flex game__btn--visually-hidden";
    setTimeout(() =>
    {
        gameBtn.classList.remove("game__btn--visually-hidden")
    }, 20);

}

function fadeInPoints(element, point)
{
    element.classList.add("points--visually-hidden");
    element.addEventListener("transitionend", () =>
    {
        setTimeout(() =>
        {
            element.classList.remove("points--visually-hidden");
            element.innerText = point;
        }, 10);
    }, { once: true });
}


function fadeInEndResults(heading, round)
{
    const resultsHeading = document.querySelector(".results > .header");
    fadeInResultHeading(resultsHeading, heading);
    const roundsInfo = document.querySelector(".results > p");
    fadeInRoundText(roundsInfo, round);


}
function fadeInResultHeading(resultsHeading, heading)
{
    resultsHeading.classList.add("header--visually-hidden");

    resultsHeading.addEventListener("transitionend", () =>
    {

        resultsHeading.classList.remove("header--visually-hidden");
        resultsHeading.innerText = heading;
    }, { once: true });
}

function fadeInRoundText(roundsInfo, text)
{
    roundsInfo.classList.add("round--visually-hidden");
    roundsInfo.addEventListener("transitionend", () =>
    {
        roundsInfo.classList.remove("round--visually-hidden");
        roundsInfo.innerText = text;
    }, { once: true });
}
