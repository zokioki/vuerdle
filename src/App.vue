<template>
  <div class="game-root" :class="{ 'dark-mode': gameState.darkMode, 'color-blind-mode': gameState.colorBlindMode }">
    <div class="game-container">
      <div class="header">
        <div class="button-group">
          <Instructions ref="instructions" :parent="this"/>
          <ShareGame ref="shareGame" :parent="this"/>
        </div>
        <h1>VUERDLE</h1>
        <div class="button-group">
          <Statistics ref="statistics" :parent="this"/>
          <Settings ref="settings" :parent="this" @update-settings="updateSettings"/>
        </div>
      </div>

      <div class="game-message" v-if="message">
        {{message}}
      </div>

      <div class="game-hint" v-if="gameState.sharedGameHint">
        <strong>Hint:</strong> {{gameState.sharedGameHint}}
      </div>

      <div class="word-rows">
        <WordRow
          ref="wordRows"
          v-for="(n, index) in gameState.guessLimit"
          :key="n"
          :position="index"
          :initial-letters="getInitialLetters(index)"
          :word-length="gameState.wordLength"
        />
      </div>

      <Keyboard/>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { defaultGameState, savedGameState } from './components/utils/gameState';
import Instructions from './components/Instructions.vue';
import Statistics from './components/Statistics.vue';
import ShareGame from './components/ShareGame.vue';
import Settings from './components/Settings.vue';
import WordRow from './components/WordRow.vue';
import Keyboard from './components/Keyboard.vue';
import WordList from './data/word-list.txt';
import AllowedGuessList from './data/allowed-guess-list.txt';

export default {
  name: 'App',
  components: {
    WordRow,
    Instructions,
    Settings,
    ShareGame,
    Statistics,
    Keyboard
  },
  data() {
    return {
      wordList: WordList.trim().split('\n'),
      allowedGuessList: AllowedGuessList.trim().split('\n'),
      gameState: defaultGameState(),
      inProgressWord: '',
      message: null
    };
  },
  created() {
    if (savedGameState()) this.gameState = savedGameState();

    this.$watch('gameState', (newState) => {
      const state = JSON.stringify(newState);
      window.localStorage.setItem('gameState', state);
    }, { deep: true });

    if (!this.gameState.answer) {
      const randomWordIndex = Math.floor(Math.random() * this.wordList.length);
      this.gameState.answer = this.wordList[randomWordIndex];
    }

    const queryParams = new URLSearchParams(window.location.search);
    const gameFromParams = window.decodeURIComponent(
      window.atob(queryParams.get('g') || '')
    );

    if (gameFromParams) {
      const separator = '::';
      const splitIndex = gameFromParams.indexOf(separator);
      const answer = gameFromParams.substr(0, splitIndex).toLowerCase();
      const hint = gameFromParams.substr(splitIndex + separator.length);

      this.startNewGame(answer);

      this.gameState.sharedGame = true;
      this.gameState.sharedGameHint = hint;

      window.history.replaceState({}, document.title, '/');
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (this.isGameComplete) return;
      if (this.modalComponents().some(component => component.$refs.modal.show)) return;

      const wordRef = this.$refs.wordRows[this.gameState.currentWordRow];

      if (e.key.match(/^[a-zA-Z]{1}$/)) {
        wordRef.addLetter(e.key);
        this.inProgressWord = wordRef.toString();
      } else if (e.key === 'Backspace') {
        wordRef.removeLetter();
        this.inProgressWord = wordRef.toString();
      } else if (e.key === 'Enter') {
        const word = wordRef.toString();
        this.checkAnswer(word);
      }
    });

    if (this.isGameComplete) {
      setTimeout(() => { this.$refs.statistics.$refs.modal.open(); }, 200);
    }
  },
  computed: {
    isGameComplete() {
      const { submittedWords, guessLimit, answer } = this.gameState;
      return submittedWords.length === guessLimit || submittedWords.includes(answer);
    }
  },
  methods: {
    getInitialLetters(rowIndex) {
      let word = this.gameState.submittedWords[rowIndex] || '';
      if (!word && rowIndex === this.gameState.currentWordRow) {
        word = this.inProgressWord;
      }

      return reactive({ items: word.split('') });
    },
    updateSettings(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.gameState[target.name] = value;
    },
    checkAnswer(word) {
      if (word.length !== this.gameState.wordLength) return;
      if (!this.gameState.sharedGame && !this.wordList.includes(word) && !this.allowedGuessList.includes(word)) {
        this.setMessage('Word not in list', 2000);
        return;
      }

      this.inProgressWord = '';
      this.gameState.submittedWords.push(word);
      this.gameState.currentWordRow += 1;

      if (word === this.gameState.answer) {
        const messageIndex = this.gameState.submittedWords.length - 1;
        const messages = ['Brilliant!', 'Excellent!', 'Too easy!', 'You did it!', 'Just made it!', 'Phew'];

        this.setMessage(messages[messageIndex]);
      } else if (this.isGameComplete) {
        this.setMessage(this.gameState.answer.toUpperCase());
      }

      if (this.isGameComplete) {
        const gameData = {
          answer: this.gameState.answer,
          won: (word === this.gameState.answer),
          numberOfGuesses: this.gameState.submittedWords.length
        };

        this.gameState.previousGames.push(gameData);
        setTimeout(()=> { this.$refs.statistics.$refs.modal.open(); }, 3000);
      }
    },
    setMessage(message, timeout = null) {
      this.message = message;
      setTimeout(() => { this.message = null; }, timeout || 3000);
    },
    startNewGame(answer = null) {
      const { previousGames, darkMode, colorBlindMode } = this.gameState;

      this.gameState = defaultGameState();
      this.gameState.previousGames = previousGames;
      this.gameState.darkMode = darkMode;
      this.gameState.colorBlindMode = colorBlindMode;
      this.inProgressWord = '';

      if (answer) {
        this.gameState.answer = answer;
      } else {
        const randomWordIndex = Math.floor(Math.random() * this.wordList.length);
        this.gameState.answer = this.wordList[randomWordIndex];
      }
    },
    resetData() {
      this.gameState = defaultGameState();
      this.startNewGame();

      this.setMessage('Data reset', 2000);
    },
    modalComponents() {
      return [
        this.$refs.instructions,
        this.$refs.shareGame,
        this.$refs.statistics,
        this.$refs.settings
      ];
    }
  }
}
</script>

<style>
:root {
  --background-color: #ffffff;
  --text-color: #2c3e50;
  --link-color: #5374d5;
  --primary-color: #6aaa64;
}

.dark-mode {
  --background-color: #121213;
  --text-color: #ffffff;
  --link-color: var(--text-color);
}

.color-blind-mode {
  --primary-color: #f5793a;
}

body {
  margin: 0;
}

.button {
  appearance: none;
  display: inline-block;
  border: none;
  border-bottom: 2px rgba(50, 50, 50, 0.4) solid;
  border-radius: 3px;
  padding: 0.5em 1em;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  outline: 0;
  user-select: none;
  height: 2rem;
  min-width: 2.5rem;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
}
.button:hover {
  filter: brightness(0.95);
}
.button:active {
  border-bottom: none;
}
.button:disabled {
  opacity: 0.7;
}

.button-group {
  display: flex;
}

input[type="text"] {
  appearance: none;
  background: var(--background-color);
  background-image: none;
  border: 0.05rem solid #bcc3ce;
  border-radius: 3px;
  box-sizing: border-box;
  color: var(--text-color);
  display: block;
  font-size: 1rem;
  height: 2rem;
  margin: 0.25rem 0;
  max-width: 100%;
  outline: 0;
  padding: 0.25rem 0.4rem;
  position: relative;
  transition: background .2s,border .2s,box-shadow .2s,color .2s;
  width: 100%;
}

input[type="text"]:focus {
  border-color: #6aaa64;
  box-shadow: 0 0 0 0.1rem rgb(85 217 120 / 25%);
}

input[type="checkbox"] {
  position: relative;
  width: 1rem;
  height: 1rem;
  color: #000000;
  border: 1px solid #bcc3ce;
  border-radius: 3px;
  appearance: none;
  margin: 0;
  cursor: pointer;
  transition: background 100ms ease;
}
input[type="checkbox"]::before {
  content: '';
  position: absolute;
  display: block;
  top: 1px;
  left: 5px;
  width: 3px;
  height: 7px;
  border-style: solid;
  border-color: #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
}
input[type="checkbox"]:checked {
  color: #ffffff;
  border-color: var(--primary-color);
  background: var(--primary-color);
}
input[type="checkbox"]:checked::before {
  opacity: 1;
}

a {
  color: var(--link-color);
  text-underline-offset: 0.25rem;
  text-decoration-thickness: 0.08rem;
}

a:hover {
  filter: brightness(0.85);
}

.game-root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  height: 100vh;
}

.game-container {
  max-width: 375px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header > h1 {
  display: flex;
  flex-grow: 10;
  justify-content: center;
  user-select: none;
}

.header > .button-group {
  flex-grow: 1;
  justify-content: space-between;
}

.word-rows {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-message {
  position: absolute;
  left: 0;
  right: 0;
  top: 72px;
  font-size: 1.25em;
  background-color: var(--text-color);
  color: var(--background-color);
  padding: 0.5em 0.75em;
  margin: 0 auto;
  border-radius: 6px;
  width: fit-content;
}

.game-hint {
  text-align: center;
}
</style>
