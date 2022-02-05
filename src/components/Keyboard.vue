<template>
  <div class="keyboard">
    <div class="keyboard-row">
      <div class="keyboard-key" @click="handleKeyClick">q</div>
      <div class="keyboard-key" @click="handleKeyClick">w</div>
      <div class="keyboard-key" @click="handleKeyClick">e</div>
      <div class="keyboard-key" @click="handleKeyClick">r</div>
      <div class="keyboard-key" @click="handleKeyClick">t</div>
      <div class="keyboard-key" @click="handleKeyClick">y</div>
      <div class="keyboard-key" @click="handleKeyClick">u</div>
      <div class="keyboard-key" @click="handleKeyClick">i</div>
      <div class="keyboard-key" @click="handleKeyClick">o</div>
      <div class="keyboard-key" @click="handleKeyClick">p</div>
    </div>

    <div class="keyboard-row">
      <div class="keyboard-key" @click="handleKeyClick">a</div>
      <div class="keyboard-key" @click="handleKeyClick">s</div>
      <div class="keyboard-key" @click="handleKeyClick">d</div>
      <div class="keyboard-key" @click="handleKeyClick">f</div>
      <div class="keyboard-key" @click="handleKeyClick">g</div>
      <div class="keyboard-key" @click="handleKeyClick">h</div>
      <div class="keyboard-key" @click="handleKeyClick">j</div>
      <div class="keyboard-key" @click="handleKeyClick">k</div>
      <div class="keyboard-key" @click="handleKeyClick">l</div>
    </div>

    <div class="keyboard-row">
      <div class="keyboard-key" @click="handleKeyClick">z</div>
      <div class="keyboard-key" @click="handleKeyClick">x</div>
      <div class="keyboard-key" @click="handleKeyClick">c</div>
      <div class="keyboard-key" @click="handleKeyClick">v</div>
      <div class="keyboard-key" @click="handleKeyClick">b</div>
      <div class="keyboard-key" @click="handleKeyClick">n</div>
      <div class="keyboard-key" @click="handleKeyClick">m</div>
      <div class="keyboard-key" @click="handleKeyClick">i</div>
      <div class="keyboard-key" @click="handleKeyClick">o</div>
      <div class="keyboard-key" @click="handleKeyClick">p</div>
    </div>

    <div class="keyboard-row">
      <div class="keyboard-key" @click="handleKeyClick">←</div>
      <div class="keyboard-key" @click="handleKeyClick">⏎</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  components: {
  },
  props: {
  },
  methods: {
    handleKeyClick(e) {
      const target = e.target;
      const keyEvent = new KeyboardEvent(
        'keydown', {
          bubbles: true,
          cancelable: true,
          key: target.textContent
        }
      );

      target.dispatchEvent(keyEvent);
    }
  }
}
</script>

<style>
.keyboard {
  margin-top: 2em;
  background-color: #e7ebf2;
  padding: 12px 8px;
  border-radius: 6px;
}
.keyboard-row {
  display: flex;
}
.keyboard-row:not(:last-child) {
  margin-bottom: 10px;
}
.keyboard-key {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 50px;
  width: 28px;
  border-bottom: 1px solid #b5b5b5;
  border-radius: 4px;
  box-shadow: 0 0 3px -1px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 4px;
  margin: 0 4px;
  text-transform: capitalize;
  font-weight: 400;
  cursor: pointer;
}
</style>
