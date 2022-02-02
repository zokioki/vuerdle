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
  background-color: white;
  border-radius: 6px;
  padding: 1em;
  width: 600px;
  z-index: 999;
}
.instructions-open {
  cursor: pointer;
}
.instructions-close {
  float: right;
  cursor: pointer;
}
</style>
