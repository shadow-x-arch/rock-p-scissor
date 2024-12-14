global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');

describe('Rock-Paper-Scissors Unit Tests', () => {
  let playerDisplay;
  let computerDisplay;
  let resultDisplay;
  let playerScoreDisplay;
  let computerScoreDisplay;
  let playGame;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body>
      <div id="playerDisplay"></div>
      <div id="computerDisplay"></div>
      <div id="resultDisplay"></div>
      <div id="playerScoreDisplay"></div>
      <div id="computerScoreDisplay"></div>
    </body></html>`);
    global.document = dom.window.document;

    playerDisplay = document.getElementById("playerDisplay");
    computerDisplay = document.getElementById("computerDisplay");
    resultDisplay = document.getElementById("resultDisplay");
    playerScoreDisplay = document.getElementById("playerScoreDisplay");
    computerScoreDisplay = document.getElementById("computerScoreDisplay");

    // Mock the playGame function
    playGame = (playerChoice) => {
      const choices = {
        rock: "✊",
        paper: "✋",
        scissors: "✌️"
      };

      let playerScore = 0;
      let computerScore = 0;

      const computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
      let result = "";

      playerDisplay.textContent = `PLAYER: ${choices[playerChoice]}`;
      computerDisplay.textContent = `COMPUTER: ${choices[computerChoice]}`;

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

      resultDisplay.textContent = result;
      resultDisplay.classList.remove("greenText", "redText");

      switch (result) {
        case "YOU WIN!":
          resultDisplay.classList.add("greenText");
          playerScore++;
          playerScoreDisplay.textContent = playerScore;
          break;
        case "YOU LOSE!":
          resultDisplay.classList.add("redText");
          computerScore++;
          computerScoreDisplay.textContent = computerScore;
          break;
      }
    };
  });

  test('plays game with player choice "rock"', () => {
    playGame('rock');
    expect(playerDisplay.textContent).toBe('PLAYER: ✊');
  });

  test('plays game with player choice "paper"', () => {
    playGame('paper');
    expect(playerDisplay.textContent).toBe('PLAYER: ✋');
  });

  test('plays game with player choice "scissors"', () => {
    playGame('scissors');
    expect(playerDisplay.textContent).toBe('PLAYER: ✌️');
  });
});
