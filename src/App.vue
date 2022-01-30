<template>
  <h1>WORDLE</h1>

  <div class="word-rows">
    <WordRow/>
    <WordRow/>
    <WordRow/>
    <WordRow/>
    <WordRow/>
    <WordRow/>
  </div>
</template>

<script>
import WordRow from './components/WordRow.vue'

export default {
  name: 'App',
  components: {
    WordRow
  },
  mounted() {
    window.addEventListener('keydown', e => {
      console.log('pressed', e.key);
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
