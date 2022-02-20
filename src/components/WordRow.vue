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
      const result = [];
      const answerLetters = savedGameState().answer.split('');

      if (!this.isSubmitted()) return result;

      this.letters.forEach((letter, index) => {
        if (letter === answerLetters[index]) {
          answerLetters[index] = null;
          result[index] = 'correct';
        }
      });

      this.letters.forEach((letter, index) => {
        if (result[index]) return;

        if (answerLetters.includes(letter)) {
          const answerIndex = answerLetters.indexOf(letter);
          answerLetters[answerIndex] = null;
          result[index] = 'mispositioned';
        } else {
          result[index] = 'incorrect';
        }
      });

      return result;
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
