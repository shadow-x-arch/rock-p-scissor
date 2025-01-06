var choices = {
    rock: "✊", // Rock emoji
    paper: "✋", // Paper emoji
    scissors: "✌️", // Scissors emoji
};
var playerDisplay = document.getElementById("playerDisplay");
var computerDisplay = document.getElementById("computerDisplay");
var resultDisplay = document.getElementById("resultDisplay");
var playerScoreDisplay = document.getElementById("playerScoreDisplay");
var computerScoreDisplay = document.getElementById("computerScoreDisplay");
var playerScore = 0;
var computerScore = 0;
function playGame(playerChoice) {
    // Random choice for the computer
    var computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
    var result = "";
    // Display choices with emojis
    if (playerDisplay && computerDisplay) {
        playerDisplay.textContent = "PLAYER: ".concat(choices[playerChoice]);
        computerDisplay.textContent = "COMPUTER: ".concat(choices[computerChoice]);
    }
    // Determine the result
    if (playerChoice === computerChoice) {
        result = "IT'S A TIE!";
    }
    else {
        switch (playerChoice) {
            case "rock":
                result = computerChoice === "scissors" ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "paper":
                result = computerChoice === "rock" ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "scissors":
                result = computerChoice === "paper" ? "YOU WIN!" : "YOU LOSE!";
                break;
        }
    }
    // Display result and update scores
    if (resultDisplay) {
        resultDisplay.textContent = result;
        resultDisplay.classList.remove("greenText", "redText");
        switch (result) {
            case "YOU WIN!":
                resultDisplay.classList.add("greenText");
                playerScore++;
                if (playerScoreDisplay) {
                    playerScoreDisplay.textContent = playerScore.toString();
                }
                break;
            case "YOU LOSE!":
                resultDisplay.classList.add("redText");
                computerScore++;
                if (computerScoreDisplay) {
                    computerScoreDisplay.textContent = computerScore.toString();
                }
                break;
        }
    }
}
