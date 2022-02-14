<template>
  <div class="letter-tile" :class="classObject">
    {{ letter }}
  </div>
</template>

<script>
import { savedGameState } from './utils/gameState';

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
      if (this.parent.isSubmitted()) {
        return {
          correct: this.isInCorrectPosition(),
          incorrect: !this.isInAnswer(),
          mispositioned: this.isInAnswer() && !this.isInCorrectPosition()
        };
      } else {
        return {
          filled: !!this.letter.length
        };
      }
    }
  },
  methods: {
    positionsInAnswer() {
      return savedGameState().answer.split('').reduce((positions, letter, index) => {
        if (letter === this.letter) positions.push(index);
        return positions;
      }, []);
    },
    isInAnswer() {
      return this.positionsInAnswer().length > 0;
    },
    isInCorrectPosition() {
      return this.positionsInAnswer().includes(this.position);
    },
    toIcon() {
      if (this.isInCorrectPosition()) {
        return '🟩';
      } else if (this.isInAnswer() && !this.isInCorrectPosition()) {
        return '🟨';
      } else {
        return '⬛';
      }
    }
  }
}
</script>

<style>
:root {
  --correct-color: #6aaa64;
  --incorrect-color: #787c7e;
  --mispositioned-color: #c9b458;
  --tile-border-color: #d3d6da;
  --filled-tile-border-color: #8f8f8f;
}

.dark-mode {
  --incorrect-color: #3a3a3c;
  --tile-border-color: #3a3a3c;
  --filled-tile-border-color: #7e7e7e;
}

.color-blind-mode {
  --correct-color: #f5793a;
  --mispositioned-color: #85c0f9;
}

.letter-tile {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
  font-size: 1.5em;
  border: 2px solid var(--tile-border-color);
  border-radius: 3px;
  width: 60px;
  height: 60px;
  margin: 6px;
  user-select: none;
}
.letter-tile:first-child {
  margin-left: 0;
}
.letter-tile:last-child {
  margin-right: 0;
}
.filled {
  border-color: var(--filled-tile-border-color);
}
.correct {
  border-color: var(--correct-color);
  background-color: var(--correct-color);
  color: white;
}
.incorrect {
  border-color: var(--incorrect-color);
  background-color: var(--incorrect-color);
  color: white;
}
.mispositioned {
  border-color: var(--mispositioned-color);
  background-color: var(--mispositioned-color);
  color: white;
}
</style>
