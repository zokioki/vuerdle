<template>
  <div class="word-row">
    <div class="letter-tile">{{letters[0]}}</div>
    <div class="letter-tile">{{letters[1]}}</div>
    <div class="letter-tile">{{letters[2]}}</div>
    <div class="letter-tile">{{letters[3]}}</div>
    <div class="letter-tile">{{letters[4]}}</div>
  </div>
</template>

<script>
export default {
  name: 'WordRow',
  props: {
    letters: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.word-row {
  display: flex;
  flex-direction: row;
}

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
</style>
