<template>
  <div class="game-root" :class="{ 'dark-mode': gameState.darkMode, 'color-blind-mode': gameState.colorBlindMode }">
    <div class="game-container">
      <div class="header">
        <Instructions/>
        <h1>WORDLE</h1>
        <Settings :parent="this" @update-settings="updateSettings"/>
      </div>

      <div class="game-message" v-if="message">
        {{message}}
      </div>

      <div class="word-rows">
        <WordRow ref="word0" :position="0" :initial-letters="getInitialLetters(0)"/>
        <WordRow ref="word1" :position="1" :initial-letters="getInitialLetters(1)"/>
        <WordRow ref="word2" :position="2" :initial-letters="getInitialLetters(2)"/>
        <WordRow ref="word3" :position="3" :initial-letters="getInitialLetters(3)"/>
        <WordRow ref="word4" :position="4" :initial-letters="getInitialLetters(4)"/>
        <WordRow ref="word5" :position="5" :initial-letters="getInitialLetters(5)"/>
      </div>

      <Keyboard/>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { defaultGameState, savedGameState } from './components/utils/gameState';
import Instructions from './components/Instructions.vue';
import Settings from './components/Settings.vue';
import WordRow from './components/WordRow.vue';
import Keyboard from './components/Keyboard.vue';
import WordList from './data/word-list.txt';

export default {
  name: 'App',
  components: {
    WordRow,
    Instructions,
    Settings,
    Keyboard
  },
  data() {
    return {
      wordList: WordList.trim().split('\n'),
      gameState: defaultGameState,
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
      const wordRef = this.$refs[`word${this.gameState.currentWordRow}`];

      if (e.key.match(/^[a-zA-Z]{1}$/)) {
        wordRef.addLetter(e.key);
      } else if (e.key === 'Backspace') {
        wordRef.removeLetter();
      } else if (e.key === 'Enter') {
        const word = wordRef.toString();
        this.checkAnswer(word);
      }
    });
  },
  methods: {
    getInitialLetters(rowIndex) {
      const word = this.gameState.submittedWords[rowIndex] || '';
      return reactive({ items: word.split('') });
    },
    updateSettings(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.gameState[target.name] = value;
    },
    checkAnswer(word) {
      if (word.length !== 5) return;
      if (!this.wordList.includes(word)) {
        this.setMessage('Word not in list', 2000);
        return;
      }

      this.gameState.submittedWords.push(word);
      this.gameState.currentWordRow += 1;

      if (word === this.gameState.answer) {
        this.setMessage('You did it!');
      }
    },
    setMessage(message, timeout = null) {
      this.message = message;
      setTimeout(() => { this.message = null; }, timeout || 3000);
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
