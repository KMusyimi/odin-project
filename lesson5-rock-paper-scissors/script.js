(function(){
    const rounds = 5;
    let counter = 1;
    let playerWins = 0;
    let compWins = 0;
    const options = ["rock", "paper", "scissors"];
    function getComputerChoice()
    {
        return options[Math.floor(Math.random() * options.length)]
    }
    function getPlayerChoice()
    {
        return checkPlayerInput(prompt("Rock Paper Scissors. Enter choice:").toLowerCase());

    }
    function playRound(playerChoice, compChoice)
    {
        console.log(playerChoice, compChoice);
        if (playerChoice === "rock" && compChoice === "scissors" || playerChoice === "scissors" && compChoice === "paper" || playerChoice === "paper" && compChoice === "rock")
        {
            playerWins++;

            return `You win! ${playerChoice} beats`;

        }
        else if (compChoice === "rock" && playerChoice === "scissors" || compChoice === "scissors" && playerChoice === "paper" || compChoice === "paper" && playerChoice === "rock")
        {
            compWins++;

            return `You Lose! ${compChoice} beats`;

        } else
        {

            return `Tie! player wins: ${playerWins} computer wins: ${compWins}`;

        }
    }
    function game()
    {
        for (let i = 0; i <= rounds; i++)
        {
            if (counter <= rounds)
            {
                console.log(`Round: ${counter} Player wins: ${playerWins} Computer Wins: ${compWins}`)
                let playerChoice = getPlayerChoice();

                let compChoice = getComputerChoice();

                console.log(playRound(playerChoice, compChoice));
                counter++;
            } else
            {
                wins();
            }
        }
    }

    function checkPlayerInput(choice)
    {

        const idx = options.findIndex(element => element === choice);

        if (idx < 0)
        {
            console.log("Invalid input! Try Again!")
            return getPlayerChoice();
        }
        return choice;

    }
    function wins()
    {

        if (compWins > playerWins)
        {
            console.log(`You lose :( Computer wins by ${compWins} to ${playerWins} out of ${rounds} rounds.`);
            return;
        }
        else if (playerWins > compWins)
        {
            console.log(`Congratulations! You win:) by ${playerWins} to ${compWins} out of ${rounds} rounds.`);
            return;
        }
        console.log(`Tie :| player ${playerWins} wins : computer ${compWins} wins out of ${rounds} rounds`);
    }
    console.log(game());

})();