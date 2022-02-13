<template>
  <div class="share-game">
    <button class="button" @click="show">↣</button>

    <div v-show="showShareGame" class="share-game-container">
      <div class="share-game-backdrop"></div>
      <div class="share-game-content">
        <button class="share-game-close button" @click="hide">X</button>
        <p><strong>Share a game</strong></p>
        <p>Create a custom game and share it with others.</p>
        <p>
          <label>
            <div>Answer</div>
            <input type="text" maxlength="5" v-model="shareGameAnswer" class="share-game-answer-input" placeholder="e.g. fruit">
          </label>
        </p>
        <p>
          <label>
            <div>Hint <small>(optional)</small></div>
            <input type="text" maxlength="100" v-model="shareGameHint" placeholder="e.g. orange, banana, apple">
          </label>
        </p>
        <p>
          <button class="button" @click.prevent="copyShareLink" :disabled="!shareGameAnswer || errors.length">
            Copy share link
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareGame',
  data() {
    return {
      showShareGame: false,
      shareGameAnswer: null,
      shareGameHint: null
    }
  },
  computed: {
    errors() {
      const errorMessages = [];

      if (this.shareGameAnswer && this.shareGameAnswer.length < 5) {
        errorMessages.push('Answer must be 5 letters');
      }

      return errorMessages;
    }
  },
  methods: {
    show() {
      this.showShareGame = true;
      setTimeout(() => this.$el.querySelector('.share-game-answer-input').focus(), 200);
    },
    hide() {
      this.showShareGame = false;
    },
    copyShareLink() {
      let shareString = 'Check out this game:\n';
      let shareUrl = window.location.origin;
      let params = window.btoa(`${this.shareGameAnswer}::${this.shareGameHint}`);

      navigator.clipboard.writeText(`${shareString}${shareUrl}?g=${params}`);
    }
  }
}
</script>

<style>
:root {
  --share-game-background-color: #ffffff;
}
.dark-mode {
  --share-game-background-color: #4a4a4a;
}

.share-game-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.share-game-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
.share-game-content {
  position: relative;
  margin: 2em auto 0 auto;
  background-color: var(--share-game-background-color);
  border-radius: 6px;
  padding: 1em;
  max-width: 400px;
  z-index: 999;
}
.share-game-close {
  float: right;
}
.share-game-answer-input {
  text-transform: uppercase;
}
.share-game-answer-input::placeholder {
  text-transform: none;
}
</style>
