<template>
  <h1>WORDLE</h1>

  <div class="word-rows">
    <WordRow ref="word0"/>
    <WordRow ref="word1"/>
    <WordRow ref="word2"/>
    <WordRow ref="word3"/>
    <WordRow ref="word4"/>
    <WordRow ref="word5"/>
  </div>
</template>

<script>
import WordRow from './components/WordRow.vue'
import WordList from './data/word-list.txt'

export default {
  name: 'App',
  components: {
    WordRow
  },
  data() {
    return {
      wordList: WordList.trim().split('\n'),
      gameState: {
        answer: null,
        currentWordRow: 0,
        submittedWords: []
      }
    };
  },
  created() {
    const savedGameState = JSON.parse(window.localStorage.getItem('gameState'));
    if (savedGameState) this.gameState = savedGameState;

    this.$watch('gameState', (newState) => {
      const state = JSON.stringify(newState);
      window.localStorage.setItem('gameState', state);
    }, { deep: true });

    if (!this.gameState.answer) this.gameState.answer = this.wordList[Math.floor(Math.random() * this.wordList.length)];
  },
  mounted() {
    window.addEventListener('keydown', e => {
      const wordRef = this.$refs[`word${this.gameState.currentWordRow}`];

      if (e.key.match(/^[a-zA-Z]{1}$/)) {
        wordRef.addLetter(e.key);
      } else if (e.key === 'Backspace') {
        wordRef.removeLetter();
      } else if (e.key === 'Enter') {
        // check answer...
        const word = wordRef.toString();
        if (word.length === 5) {
          this.gameState.submittedWords.push(word);
          this.gameState.currentWordRow += 1;

          if (word === this.gameState.answer) {
            // winner...
          }
        }
      }
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.word-rows {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
