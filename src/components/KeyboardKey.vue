<template>
  <div class="keyboard-key" @click="handleKeyClick">
    {{keyLabel}}
  </div>
</template>

<script>
export default {
  name: 'KeyboardKey',
  props: {
    keyCode: {
      type: String,
      required: true
    },
    keyLabel: {
      type: String,
      default: (props) => props.keyCode
    }
  },
  methods: {
    handleKeyClick() {
      const keyEvent = new KeyboardEvent(
        'keydown', {
          bubbles: true,
          cancelable: true,
          key: this.keyCode
        }
      );

      this.$el.dispatchEvent(keyEvent);
    }
  }
}
</script>

<style>
:root {
  --key-background-color: #ffffff;
}

.dark-mode {
  --key-background-color: #818181;
}

.keyboard-key {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 40px;
  width: 28px;
  border-bottom: 1px solid #b5b5b5;
  border-radius: 4px;
  box-shadow: 0 0 3px -1px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  background-color: var(--key-background-color);
  padding: 4px;
  margin: 0 4px;
  text-transform: capitalize;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
}
.keyboard-key:active {
  filter: brightness(0.95);
  border-bottom: none;
}
.keyboard-key-enter {
  width: 52px;
}
.keyboard-key-backspace {
  width: 40px;
}
</style>
