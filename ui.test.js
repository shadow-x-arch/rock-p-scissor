global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './rock-p-scissor.html'), 'utf8');

describe('Rock-Paper-Scissors UI Tests', () => {
  let dom;
  let container;
  let playerScoreDisplay;
  let computerScoreDisplay;
  let playerDisplay;
  let computerDisplay;
  let resultDisplay;

  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
    global.document = container.ownerDocument;
    
    // Mock the playGame function inside the script
    dom.window.eval(`
      const choices = {
        rock: "✊",
        paper: "✋",
        scissors: "✌️"
      };

      const playerDisplay = document.getElementById("playerDisplay");
      const computerDisplay = document.getElementById("computerDisplay");
      const resultDisplay = document.getElementById("resultDisplay");
      const playerScoreDisplay = document.getElementById("playerScoreDisplay");
      const computerScoreDisplay = document.getElementById("computerScoreDisplay");

      let playerScore = 0;
      let computerScore = 0;

      function playGame(playerChoice) {
        const computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
        let result = "";

        playerDisplay.textContent = \`PLAYER: \${choices[playerChoice]}\`;
        computerDisplay.textContent = \`COMPUTER: \${choices[computerChoice]}\`;

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
      }
    `);

    playerScoreDisplay = dom.window.document.getElementById('playerScoreDisplay');
    computerScoreDisplay = dom.window.document.getElementById('computerScoreDisplay');
    playerDisplay = dom.window.document.getElementById('playerDisplay');
    computerDisplay = dom.window.document.getElementById('computerDisplay');
    resultDisplay = dom.window.document.getElementById('resultDisplay');
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked implementations
  });

  test('renders initial score and result', () => {
    expect(playerScoreDisplay.textContent).toBe('0');
    expect(computerScoreDisplay.textContent).toBe('0');
    expect(resultDisplay.textContent.trim()).toBe("IT'S A TIE!");
  });

  test('updates the score and result when the player plays "rock"', () => {
    dom.window.playGame('rock');
    
    const playerChoice = playerDisplay.textContent.includes("✊");
    const computerChoice = computerDisplay.textContent.includes("✋") || computerDisplay.textContent.includes("✌️");

    if (playerChoice && computerChoice) {
      expect(resultDisplay.textContent.trim()).toMatch(/YOU LOSE!|IT'S A TIE!/);
    } else {
      expect(resultDisplay.textContent.trim()).toMatch(/YOU WIN!|IT'S A TIE!/);
    }
  });

  test('updates the score and result when the player plays "paper"', () => {
    dom.window.playGame('paper');

    const playerChoice = playerDisplay.textContent.includes("✋");
    const computerChoice = computerDisplay.textContent.includes("✌️") || computerDisplay.textContent.includes("✊");

    if (playerChoice && computerChoice) {
      expect(resultDisplay.textContent.trim()).toMatch(/YOU LOSE!|IT'S A TIE!/);
    } else {
      expect(resultDisplay.textContent.trim()).toMatch(/YOU WIN!|IT'S A TIE!/);
    }
  });

  test('updates the score and result when the player plays "scissors"', () => {
    dom.window.playGame('scissors');

    const playerChoice = playerDisplay.textContent.includes("✌️");
    const computerChoice = computerDisplay.textContent.includes("✊") || computerDisplay.textContent.includes("✋");

    if (playerChoice && computerChoice) {
      expect(resultDisplay.textContent.trim()).toMatch(/YOU LOSE!|IT'S A TIE!/);
    } else {
      expect(resultDisplay.textContent.trim()).toMatch(/YOU WIN!|IT'S A TIE!/);
    }
  });
});
