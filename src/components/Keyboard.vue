<template>
  <div class="keyboard">
    <div class="keyboard-row">
      <KeyboardKey keyCode="q"/>
      <KeyboardKey keyCode="w"/>
      <KeyboardKey keyCode="e"/>
      <KeyboardKey keyCode="r"/>
      <KeyboardKey keyCode="t"/>
      <KeyboardKey keyCode="y"/>
      <KeyboardKey keyCode="u"/>
      <KeyboardKey keyCode="i"/>
      <KeyboardKey keyCode="o"/>
      <KeyboardKey keyCode="p"/>
    </div>

    <div class="keyboard-row">
      <KeyboardKey keyCode="a"/>
      <KeyboardKey keyCode="s"/>
      <KeyboardKey keyCode="d"/>
      <KeyboardKey keyCode="f"/>
      <KeyboardKey keyCode="g"/>
      <KeyboardKey keyCode="h"/>
      <KeyboardKey keyCode="j"/>
      <KeyboardKey keyCode="k"/>
      <KeyboardKey keyCode="l"/>
    </div>

    <div class="keyboard-row">
      <KeyboardKey keyCode="Backspace" keyLabel="⌫"/>
      <KeyboardKey keyCode="z"/>
      <KeyboardKey keyCode="x"/>
      <KeyboardKey keyCode="c"/>
      <KeyboardKey keyCode="v"/>
      <KeyboardKey keyCode="b"/>
      <KeyboardKey keyCode="n"/>
      <KeyboardKey keyCode="m"/>
      <KeyboardKey keyCode="Enter" class="keyboard-key-fit-content"/>
    </div>
  </div>
</template>

<script>
import KeyboardKey from './KeyboardKey.vue';

export default {
  name: 'Keyboard',
  components: {
    KeyboardKey
  }
}
</script>

<style>
:root {
  --keyboard-background-color: #e7ebf2;
}

.dark-mode {
  --keyboard-background-color: #585858;
}

.keyboard {
  margin-top: 2em;
  background-color: var(--keyboard-background-color);
  padding: 12px 8px;
  border-radius: 6px;
}
.keyboard-row {
  display: flex;
  touch-action: manipulation;
}
.keyboard-row:not(:last-child) {
  margin-bottom: 10px;
}
</style>
