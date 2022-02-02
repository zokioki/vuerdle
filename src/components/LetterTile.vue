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
    positionsInAnswer() {
      const gameState = JSON.parse(window.localStorage.getItem('gameState'));
      return gameState.answer.split('').reduce((positions, letter, index) => {
        if (letter === this.letter) positions.push(index);
        return positions;
      }, []);
    },
    isInAnswer() {
      return this.positionsInAnswer().length > 0;
    },
    isInCorrectPosition() {
      return this.positionsInAnswer().includes(this.position);
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
  text-align: center;
  font-weight: 600;
  font-size: 1.5em;
  border: 2px #c5c5c5 solid;
  width: 60px;
  height: 60px;
  margin: 6px;
  user-select: none;
}
.correct {
  border-color: #6aaa64;
  background-color: #6aaa64;
  color: white;
}
.incorrect {
  border-color: #787c7e;
  background-color: #787c7e;
  color: white;
}
.mispositioned {
  border-color: #c9b458;
  background-color: #c9b458;
  color: white;
}
</style>
