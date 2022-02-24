<template>
  <div class="word-row">
    <LetterTile
      ref="letterTiles"
      v-for="(n, index) in this.wordLength"
      :key="n"
      :letter="letters[index]"
      :position="index"
      :parent="this"
    />
  </div>
</template>

<script>
import LetterTile from './LetterTile.vue';

export default {
  name: 'WordRow',
  components: {
    LetterTile
  },
  inject: [
    'gameState',
    'letterStatesMatrix'
  ],
  props: {
    initialLetters: {
      type: Object,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    wordLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    letters() {
      return this.initialLetters.items;
    },
    letterStates() {
      return this.letterStatesMatrix[this.position] || [];
    }
  },
  methods: {
    addLetter(value) {
      if (this.letters.length >= this.wordLength) return;
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
      return this.gameState.submittedWords.includes(this.toString()) &&
             this.position < this.gameState.currentWordRow;
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
