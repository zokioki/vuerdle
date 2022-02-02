<template>
  <div class="word-row">
    <LetterTile ref="word0" :letter="letters[0]"/>
    <LetterTile ref="word1" :letter="letters[1]"/>
    <LetterTile ref="word2" :letter="letters[2]"/>
    <LetterTile ref="word3" :letter="letters[3]"/>
    <LetterTile ref="word4" :letter="letters[4]"/>
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
