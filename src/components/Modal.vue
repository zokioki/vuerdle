<template>
  <div class="modal">
    <div v-show="show" class="modal-container">
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close button" @click="close">X</button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style>
:root {
  --modal-background-color: #ffffff;
}
.dark-mode {
  --modal-background-color: #4a4a4a;
}

.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-backdrop {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
.modal-content {
  position: relative;
  margin: 2em auto 0 auto;
  background-color: var(--modal-background-color);
  border-radius: 6px;
  padding: 1em;
  max-width: 400px;
  z-index: 999;
}
.modal-close {
  float: right;
}
</style>
