const choices: { [key: string]: string } = {
    rock: "✊", // Rock emoji
    paper: "✋", // Paper emoji
    scissors: "✌️", // Scissors emoji
  };
  
  const playerDisplay = document.getElementById("playerDisplay") as HTMLElement | null;
  const computerDisplay = document.getElementById("computerDisplay") as HTMLElement | null;
  const resultDisplay = document.getElementById("resultDisplay") as HTMLElement | null;
  const playerScoreDisplay = document.getElementById("playerScoreDisplay") as HTMLElement | null;
  const computerScoreDisplay = document.getElementById("computerScoreDisplay") as HTMLElement | null;
  
  let playerScore = 0;
  let computerScore = 0;
  
  function playGame(playerChoice: "rock" | "paper" | "scissors"): void {
    // Random choice for the computer
    const computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
    let result = "";
  
    // Display choices with emojis
    if (playerDisplay && computerDisplay) {
      playerDisplay.textContent = `PLAYER: ${choices[playerChoice]}`;
      computerDisplay.textContent = `COMPUTER: ${choices[computerChoice]}`;
    }
  
    // Determine the result
    if (playerChoice === computerChoice) {
      result = "IT'S A TIE!";
    } else {
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
  