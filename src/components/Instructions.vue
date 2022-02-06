<template>
  <div class="instructions">
    <button class="instructions-open" @click="show()">?</button>

    <div v-show="showInstructions" class="instructions-container">
      <div class="instructions-backdrop"></div>
      <div class="instructions-content">
        <button class="instructions-close" @click="hide()">X</button>
        <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>
        <p>Each guess must be a valid 5 letter word. Hit the Enter button to submit.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
        <hr>
        <div class="examples">
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
            <div class="letter-tile mispositioned">I</div>
            <div class="letter-tile">L</div>
            <div class="letter-tile">L</div>
            <div class="letter-tile">S</div>
          </div>
          <div>The letter <strong>I</strong> is in the word but in the wrong spot.</div>

          <div class="word-row">
            <div class="letter-tile">V</div>
            <div class="letter-tile">A</div>
            <div class="letter-tile">G</div>
            <div class="letter-tile incorrect">U</div>
            <div class="letter-tile">E</div>
          </div>
          <div>The letter <strong>U</strong> is not in the word in any spot.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  data() {
    return {
      showInstructions: false
    }
  },
  methods: {
    show() {
      this.showInstructions = true;
    },
    hide() {
      this.showInstructions = false;
    }
  }
}
</script>

<style>
:root {
  --instructions-background-color: #ffffff;
}
.dark-mode {
  --instructions-background-color: #4a4a4a;
}

.instructions-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.instructions-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
.instructions-content {
  position: relative;
  margin: 2em auto 0 auto;
  background-color: var(--instructions-background-color);
  border-radius: 6px;
  padding: 1em;
  width: 400px;
  z-index: 999;
}
.instructions-open {
  cursor: pointer;
}
.instructions-close {
  float: right;
  cursor: pointer;
}
.examples .word-row {
  margin-top: 1em;
}
.examples .letter-tile {
  width: 40px;
  height: 40px;
  margin: 4px;
}
.examples .letter-tile:first-child {
  margin-left: 0;
}
</style>
