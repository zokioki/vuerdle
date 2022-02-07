const defaultGameState = {
  answer: null,
  currentWordRow: 0,
  submittedWords: [],
  darkMode: false,
  colorBlindMode: false,
  previousGames: []
}

function savedGameState() {
  const gameState = window.localStorage.getItem('gameState');
  if (!gameState) return;

  return JSON.parse(gameState);
}

export { defaultGameState, savedGameState };
