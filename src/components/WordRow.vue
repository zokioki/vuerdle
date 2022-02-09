<template>
  <div class="word-row">
    <LetterTile
      ref="letterTiles"
      v-for="(n, index) in this.letterLimit"
      :key="n"
      :letter="letters[index]"
      :position="index"
      :parent="this"
    />
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
    toShareString() {
      return this.$refs.letterTiles.map(tile => tile.toIcon()).join('');
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
