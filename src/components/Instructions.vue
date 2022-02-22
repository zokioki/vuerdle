<template>
  <div class="instructions">
    <button class="button" @click="$refs.modal.open" tabindex="-1">?</button>

    <Modal ref="modal">
      <p><strong>How to play</strong></p>
      <p>Guess the word in {{parent.gameState.guessLimit}} tries. Each guess must be a valid {{parent.gameState.wordLength}} letter word. Hit the <em>Enter</em> button to submit.</p>
      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

      <div class="word-examples">
        <strong>Examples</strong>
        <div class="word-row">
          <div class="letter-tile correct">W</div>
          <div class="letter-tile">E</div>
          <div class="letter-tile">A</div>
          <div class="letter-tile">R</div>
          <div class="letter-tile">Y</div>
        </div>
        <div>The letter <strong>W</strong> is in the word and in the correct spot.</div>

        <div class="word-row">
          <div class="letter-tile">P</div>
          <div class="letter-tile">O</div>
          <div class="letter-tile mispositioned">L</div>
          <div class="letter-tile">A</div>
          <div class="letter-tile">R</div>
        </div>
        <div>The letter <strong>L</strong> is in the word but in the wrong spot.</div>

        <div class="word-row">
          <div class="letter-tile">V</div>
          <div class="letter-tile">A</div>
          <div class="letter-tile">G</div>
          <div class="letter-tile incorrect">U</div>
          <div class="letter-tile">E</div>
        </div>
        <div>The letter <strong>U</strong> is not in the word in any spot.</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'Instructions',
  components: {
    Modal
  },
  props: {
    parent: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.word-examples .word-row {
  margin-top: 1em;
}
.word-examples .letter-tile {
  width: 40px;
  height: 40px;
  margin: 4px;
}
.word-examples .letter-tile:first-child {
  margin-left: 0;
}
</style>
