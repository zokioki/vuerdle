<template>
  <div class="word-row">
    <LetterTile :letter="letters[0]" :position="0" :parent="this"/>
    <LetterTile :letter="letters[1]" :position="1" :parent="this"/>
    <LetterTile :letter="letters[2]" :position="2" :parent="this"/>
    <LetterTile :letter="letters[3]" :position="3" :parent="this"/>
    <LetterTile :letter="letters[4]" :position="4" :parent="this"/>
  </div>
</template>

<script>
import LetterTile from './LetterTile.vue';
import { savedGameState } from './utils/gameState';

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
    },
    position: {
      type: Number,
      required: true
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
      const gameState = savedGameState();
      return gameState.submittedWords.includes(this.toString()) &&
             this.position < gameState.currentWordRow;
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
