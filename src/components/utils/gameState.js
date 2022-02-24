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

export { defaultGameState, savedGameState };
