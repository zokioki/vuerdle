<template>
  <div class="settings">
    <button class="settings-open" @click="show()">☰</button>

    <div v-show="showSettings" class="settings-container">
      <div class="settings-backdrop"></div>
      <div class="settings-content">
        <button class="settings-close" @click="hide()">X</button>
        <p>Settings here...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      showSettings: false
    }
  },
  methods: {
    show() {
      this.showSettings = true;
    },
    hide() {
      this.showSettings = false;
    }
  }
}
</script>

<style>
.settings-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.settings-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
.settings-content {
  position: relative;
  margin: 2em auto 0 auto;
  background-color: white;
  border-radius: 6px;
  padding: 1em;
  width: 600px;
  z-index: 999;
}
.settings-open {
  cursor: pointer;
}
.settings-close {
  float: right;
  cursor: pointer;
}
.examples .letter-tile {
  width: 40px;
  height: 40px;
  margin: 4px;
}
</style>
