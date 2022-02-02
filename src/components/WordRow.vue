<template>
  <div class="word-row">
    <LetterTile ref="word0" :letter="letters[0]" :position="0" :parent="this"/>
    <LetterTile ref="word1" :letter="letters[1]" :position="1" :parent="this"/>
    <LetterTile ref="word2" :letter="letters[2]" :position="2" :parent="this"/>
    <LetterTile ref="word3" :letter="letters[3]" :position="3" :parent="this"/>
    <LetterTile ref="word4" :letter="letters[4]" :position="4" :parent="this"/>
  </div>
</template>

<script>
import LetterTile from './LetterTile.vue'

export default {
  name: 'WordRow',
  components: {
    LetterTile
  },
  props: {
    initialLetters: {
      type: Object,
      required: true
    },
    letterLimit: {
      type: Number,
      default: 5
    }
  },
  computed: {
    letters() {
      return this.initialLetters.items;
    }
  },
  methods: {
    addLetter(value) {
      if (this.letters.length >= this.letterLimit) return;
      this.letters.push(value);
    },
    removeLetter() {
      this.letters.pop();
    },
    toString() {
      return this.letters.join('');
    },
    isSubmitted() {
      const gameState = JSON.parse(window.localStorage.getItem('gameState'));
      return gameState.submittedWords.includes(this.toString());
    }
  }
}
</script>

<style>
.word-row {
  display: flex;
  flex-direction: row;
}
</style>
