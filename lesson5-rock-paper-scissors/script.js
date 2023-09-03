const winingPoints = 5;

let playerPoints = 0;
let compPoints = 0;
let playerChoice = "";

(function ()
{
    startPlayGameBtn();

})();


function startPlayGameBtn()
{
    const playGame = document.querySelector(".play__game-btn");

    playGame.addEventListener("click", handleStartGameBtn, { once: true });
}



function handleStartGameBtn()
{
    const gameRules = document.querySelector(".game__rules");
    gameRules.classList.add("game__rules--hidden");
    startGame();
}


function createResultsSection()
{

    const results = document.createElement("section");
    results.classList.add("results");

    const h3 = document.createElement("h3");
    h3.innerText = "Player vs Computer. Let's go!";
    results.appendChild(h3);

    const helperText = document.createElement("p");
    helperText.innerText = "Choose your weapon by clicking the buttons below.";
    results.appendChild(helperText);

    const playerScores = document.createElement("div");
    playerScores.setAttribute("class", "scores d--flex");

    const playerScoresSection = document.createElement("section");

    const playerHeading = document.createElement("h4");
    playerHeading.innerText = "Player";
    playerScoresSection.appendChild(playerHeading);

    const playerPoints = document.createElement("p");
    playerPoints.setAttribute("class", "player__points");
    playerPoints.innerText = "0";
    playerScoresSection.appendChild(playerPoints);

    const compScoresSection = document.createElement("section");

    const compHeading = document.createElement("h4");

    compHeading.innerText = "Computer";
    compScoresSection.appendChild(compHeading);

    const compPoints = document.createElement("p");
    compPoints.setAttribute("class", "computer__points");
    compPoints.innerText = "0";
    compScoresSection.appendChild(compPoints);

    playerScores.appendChild(playerScoresSection);
    playerScores.appendChild(compScoresSection);

    results.appendChild(playerScores);

    const gameBtnDiv = document.querySelector(".main__game > div");
    gameBtnDiv.parentNode.insertBefore(results, gameBtnDiv);
}



function displayGamePlayBtn()
{
    const gameBtn = document.querySelector(".main__game > .game__btn--hidden");
    gameBtn.setAttribute("class", "game__btn d--flex");

}


function hideGamePlayBtn()
{
    const gameBtn = document.querySelector(".main__game > .game__btn");
    gameBtn.setAttribute("class", "game__btn--hidden");

}


function displayRestartBtn()
{
    const restartGameBtn = document.querySelector(".restart__game-btn--hidden");
    restartGameBtn.setAttribute("class", "restart__game-btn play__game-btn");
    return restartGameBtn;
}

function getComputerChoice()
{
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)]
}

function updateChoice()
{
    const gameBtn = document.querySelectorAll(".main__game > .game__btn .btn");
    for (let i = 0; i < gameBtn.length; i++)
    {
        gameBtn[i].addEventListener("click", handleChoiceEvt);
    }

}

function handleChoiceEvt(evt)
{
    const playerChoice = this.getAttribute("id");

    const compChoice = getComputerChoice();
    updateResultsSection(playerChoice, compChoice);
}

function endChoiceEvt()
{
    const gameBtn = document.querySelectorAll(".main__game > .game__btn .btn");

    for (let i = 0; i < gameBtn.length; i++)
    {
        gameBtn[i].removeEventListener("click", handleChoiceEvt);
    }
}

function playRound(playerChoice, compChoice)
{

    if (playerChoice === "rock" && compChoice === "scissors" || playerChoice === "scissors" && compChoice === "paper" || playerChoice === "paper" && compChoice === "rock")
    {
        playerPoints = awardPoints(playerPoints);
        return `You win! ${playerChoice} beats ${compChoice}`;

    }
    else if (compChoice === "rock" && playerChoice === "scissors" || compChoice === "scissors" && playerChoice === "paper" || compChoice === "paper" && playerChoice === "rock")
    {
        compPoints = awardPoints(compPoints);
        return `You Lose! ${compChoice} beats ${playerChoice}`;

    } else
    {
        return `Tie! player  ${playerChoice} computer ${compChoice}`;

    }
}

function updateResultsSection(playerChoice, compChoice)
{
    const resultsHeading = document.querySelector(".results > h3");
    const roundsInfo = document.querySelector(".results > p");
    roundsInfo.innerText = playRound(playerChoice, compChoice);
    const playerPointsElement = document.querySelector(".scores > section .player__points");

    playerPointsElement.innerText = playerPoints;


    const computerPointsElement = document.querySelector(".scores > section .computer__points");
    computerPointsElement.innerText = compPoints;


    const end = endGame(resultsHeading, roundsInfo);
    if (end === 1)
    {
        endChoiceEvt();
        restartGame();
    }


}
function startGame()
{
    createResultsSection();
    displayGamePlayBtn();

    updateChoice();
}

function awardPoints(points)
{
    points++;
    return points;
}

function endGame(resultsHeading, roundsInfo)
{
    if (playerPoints === winingPoints)
    {
        resultsHeading.innerText = `Congratulations!`;
        roundsInfo.innerText = ` You win :)`;
        return 1;
    } else if (compPoints === winingPoints)
    {
        resultsHeading.innerText = `GameOver!`;
        roundsInfo.innerText = `You lose :( Computer wins`;
        return 1;
    }
    return 0;
}

function restartGame()
{
    const restartGameBtn = displayRestartBtn();
    hideGamePlayBtn();
    restartGameBtn.addEventListener("click", handleRestartGame, { once: true });
}


function handleRestartGame(evt)
{
    const resultsHeading = document.querySelector(".results > h3");
    const roundsInfo = document.querySelector(".results > p");

    evt.target.setAttribute("class", "restart__game-btn--hidden");

    resultsHeading.innerText = "Player vs Computer.Let's go!"
    roundsInfo.innerText = "Choose your weapon by clicking the buttons below."

    resetScores();
    displayGamePlayBtn();
    updateChoice();
}


function resetScores()
{
    playerPoints = 0;
    compPoints = 0;
    const playerPointsReset = document.querySelector(".player__points");
    playerPointsReset.innerText = "0";

    const computerPointsReset = document.querySelector(".computer__points");
    computerPointsReset.innerText = "0";
}