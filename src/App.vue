<template>
  <div class="game-root" :class="{ 'dark-mode': gameState.darkMode, 'color-blind-mode': gameState.colorBlindMode }">
    <div class="game-container">
      <div class="header">
        <div class="button-group">
          <Instructions/>
          <button class="button">↣</button>
        </div>
        <h1>VUERDLE</h1>
        <div class="button-group">
          <Statistics ref="statistics" :parent="this"/>
          <Settings :parent="this" @update-settings="updateSettings"/>
        </div>
      </div>

      <div class="game-message" v-if="message">
        {{message}}
      </div>

      <div class="word-rows">
        <WordRow
          ref="wordRows"
          v-for="(n, index) in 6"
          :key="n"
          :position="index"
          :initial-letters="getInitialLetters(index)"
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

    const randomWordIndex = Math.floor(Math.random() * this.wordList.length);
    if (!this.gameState.answer) this.gameState.answer = this.wordList[randomWordIndex];
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (this.isGameComplete) return;

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
      setTimeout(() => { this.$refs.statistics.show(); }, 600);
    }
  },
  computed: {
    isGameComplete() {
      const { submittedWords, answer } = this.gameState;
      return submittedWords.length === 6 || submittedWords.includes(answer);
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
      if (word.length !== 5) return;
      if (!this.wordList.includes(word) && !this.allowedGuessList.includes(word)) {
        this.setMessage('Word not in list', 2000);
        return;
      }

      this.inProgressWord = '';
      this.gameState.submittedWords.push(word);
      this.gameState.currentWordRow += 1;

      if (word === this.gameState.answer) {
        this.setMessage('You did it!');
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
        setTimeout(()=> { this.$refs.statistics.show(); }, 3000);
      }
    },
    setMessage(message, timeout = null) {
      this.message = message;
      setTimeout(() => { this.message = null; }, timeout || 3000);
    },
    startNewGame() {
      const { previousGames, darkMode, colorBlindMode } = this.gameState;

      this.gameState = defaultGameState();
      this.gameState.previousGames = previousGames;
      this.gameState.darkMode = darkMode;
      this.gameState.colorBlindMode = colorBlindMode;

      const randomWordIndex = Math.floor(Math.random() * this.wordList.length);
      this.gameState.answer = this.wordList[randomWordIndex];
      this.inProgressWord = '';

      this.setMessage('New game', 2000);
    }
  }
}
</script>

<style>
:root {
  --background-color: #ffffff;
  --text-color: #2c3e50;
}

.dark-mode {
  --background-color: #121213;
  --text-color: #ffffff;
}

body {
  margin: 0;
}

.button {
  border: none;
  border-bottom: 2px #54874f solid;
  border-radius: 3px;
  padding: 0.5em 1em;
  background-color: #6aaa64;
  color: white;
  cursor: pointer;
}
.button:hover {
  filter: brightness(0.95);
}
.button:active {
  border-bottom: none;
  margin-top: 2px;
}

.button-group {
  display: flex;
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
</style>
