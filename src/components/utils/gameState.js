function defaultGameState() {
  return {
    answer: null,
    currentWordRow: 0,
    submittedWords: [],
    wordLength: 5,
    guessLimit: 6,
    darkMode: false,
    colorBlindMode: false,
    colorKeyboard: true,
    sharedGame: false,
    sharedGameHint: null,
    previousGames: []
  };
}

function savedGameState() {
  const gameState = window.localStorage.getItem('gameState');
  if (!gameState) return;

  return JSON.parse(gameState);
}

// Returns a two-dimensional array representing the states of submitted
// letters along with their position in the game's grid, for example:
// [
//   ['correct', 'incorrect', 'incorrect', 'mispositioned', 'incorrect'],
//   ['correct', 'correct', 'incorrect', 'incorrect', 'mispositioned'],
//   ...
// ]
function letterStatesMatrix(gameState) {
  const result = [];

  gameState.submittedWords.forEach(submittedWord => {
    const rowResult = [];
    const answerLetters = gameState.answer.split('');
    const submittedWordLetters = submittedWord.split('');

    submittedWordLetters.forEach((letter, index) => {
      if (letter === answerLetters[index]) {
        answerLetters[index] = null;
        rowResult[index] = 'correct';
      }
    });

    submittedWordLetters.forEach((letter, index) => {
      if (rowResult[index]) return;

      if (answerLetters.includes(letter)) {
        const answerIndex = answerLetters.indexOf(letter);
        answerLetters[answerIndex] = null;
        rowResult[index] = 'mispositioned';
      } else {
        rowResult[index] = 'incorrect';
      }
    });

    result.push(rowResult);
  });

  return result;
}

// Returns an object mapping the submitted letters with their respective states:
// { a: 'correct', e: 'mispositioned', l: 'incorrect', p: 'incorrect', ... }
function letterStatesMap(gameState) {
  const result = {};
  const orderedStates = ['incorrect', 'mispositioned', 'correct'];
  const statesMatrix = letterStatesMatrix(gameState);

  gameState.submittedWords.forEach((submittedWord, rowIndex) => {
    submittedWord.split('').forEach((letter, colIndex) => {
      const state = statesMatrix[rowIndex][colIndex];

      if (orderedStates.indexOf(state) > orderedStates.indexOf(result[letter])) {
        result[letter] = state;
      }
    });
  });

  return result;
}

export { defaultGameState, savedGameState, letterStatesMatrix, letterStatesMap };
