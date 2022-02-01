<template>
  <div class="letter-tile">
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
</style>
