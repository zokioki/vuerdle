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
      wordList: WordList.trim().split('\n')
    };
  },
  mounted() {
    window.addEventListener('keydown', e => {
      const wordRef = this.$refs.word0;

      if (e.key.match(/^[a-zA-Z]{1}$/)) {
        wordRef.addLetter(e.key);
      } else if (e.key === 'Backspace') {
        wordRef.removeLetter();
      } else if (e.key === 'Enter') {
        // check answer...
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
