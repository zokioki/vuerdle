<template>
  <div class="settings">
    <button class="button" @click="$refs.modal.open">☰</button>

    <Modal ref="modal">
      <p><strong>Settings</strong></p>
      <p>
        <label>
          <input type="checkbox" name="darkMode" :checked="parent.gameState.darkMode" @change="emitSettingsChange">
          Dark Mode
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" name="colorBlindMode" :checked="parent.gameState.colorBlindMode" @change="emitSettingsChange">
          Color Blind Mode
        </label>
      </p>
      <div class="reset-data">
        <a href="#" @click.prevent="resetData">Reset data</a>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'Settings',
  components: {
    Modal
  },
  emits: ['updateSettings'],
  props: {
    parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showSettings: false
    }
  },
  methods: {
    emitSettingsChange(event) {
      this.$emit('updateSettings', { target: event.target });
    },
    resetData() {
      if (confirm('This will clear all game history and settings. Are you sure?')) {
        this.parent.resetData();
        this.$refs.modal.close();
      }
    }
  }
}
</script>

<style>
.reset-data {
  margin-top: 2rem;
}
</style>
