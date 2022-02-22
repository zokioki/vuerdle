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
      const object = {};

      if (this.parent.isSubmitted()) {
        object[this.state] = true;
      } else {
        object['filled'] = !!this.letter.length;
      }

      return object;
    },
    state() {
      return this.parent.letterStates[this.position];
    }
  },
  methods: {
    toIcon() {
      const icons = {
        correct: '🟩',
        mispositioned: '🟨',
        incorrect: '⬛'
      };

      return icons[this.state];
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
.letter-tile.filled {
  border-color: var(--filled-tile-border-color);
}
.letter-tile.correct {
  border-color: var(--correct-color);
  background-color: var(--correct-color);
  color: white;
}
.letter-tile.incorrect {
  border-color: var(--incorrect-color);
  background-color: var(--incorrect-color);
  color: white;
}
.letter-tile.mispositioned {
  border-color: var(--mispositioned-color);
  background-color: var(--mispositioned-color);
  color: white;
}
</style>
