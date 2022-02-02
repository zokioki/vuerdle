<template>
  <div class="letter-tile" :class="classObject">
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: 'LetterTile',
  props: {
    letter: {
      type: String,
      required: true,
      default: ''
    },
    position: {
      type: Number,
      required: true
    },
    parent: {
      type: Object,
      required: true
    }
  },
  computed: {
    classObject() {
      if (!this.parent.isSubmitted()) return {};

      return {
        correct: this.isInCorrectPosition(),
        incorrect: !this.isInAnswer(),
        mispositioned: this.isInAnswer() && !this.isInCorrectPosition()
      };
    }
  },
  methods: {
    positionInAnswer() {
      const gameState = JSON.parse(window.localStorage.getItem('gameState'));
      return gameState.answer.indexOf(this.letter);
    },
    isInAnswer() {
      return this.positionInAnswer() > -1;
    },
    isInCorrectPosition() {
      return this.position === this.positionInAnswer();
    }
  }
}
</script>

<style>
.letter-tile {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.5em;
  border: 2px #c5c5c5 solid;
  width: 60px;
  height: 60px;
  margin: 6px;
  user-select: none;
}
.correct {
  border-color: green;
  background-color: green;
  color: white;
}
.incorrect {
  border-color: gray;
  background-color: gray;
  color: white;
}
.mispositioned {
  border-color: orange;
  background-color: orange;
  color: white;
}
</style>
