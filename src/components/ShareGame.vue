<template>
  <div class="share-game">
    <button class="button" @click="openModal" tabindex="-1">➤</button>

    <Modal ref="modal">
      <p><strong>Share a game</strong></p>
      <p>Create a custom game and share it with others.</p>
      <p>
        <label>
          <div>Answer</div>
          <input type="text" :maxlength="gameState.wordLength" v-model="shareGameAnswer" class="share-game-answer-input" placeholder="e.g. fruit">
        </label>
      </p>
      <p>
        <label>
          <div>Hint <small>(optional, {{hintCharacterLimit - shareGameHint.length}} characters remaining)</small></div>
          <input type="text" :maxlength="hintCharacterLimit" v-model="shareGameHint" placeholder="e.g. orange, banana, apple">
        </label>
      </p>
      <div>
        <button class="button" @click.prevent="copyShareLink" :disabled="!shareGameAnswer || errors.length">
          Copy share link
        </button>
        <div class="link-copied-message" v-if="showLinkCopiedMessage">Copied to clipboard</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import { encodeSharedGameParams } from './utils/sharedGame';

export default {
  name: 'ShareGame',
  components: {
    Modal
  },
  inject: [
    'gameState'
  ],
  data() {
    return {
      shareGameAnswer: '',
      shareGameHint: '',
      hintCharacterLimit: 40,
      showLinkCopiedMessage: false
    }
  },
  computed: {
    errors() {
      const errorMessages = [];
      const wordLength = this.gameState.wordLength;

      if (this.shareGameAnswer.trim().length < wordLength) {
        errorMessages.push(`Answer must be ${wordLength} letters`);
      }

      if (this.shareGameHint.trim().length > this.hintCharacterLimit) {
        errorMessages.push(`Hint must be under ${this.hintCharacterLimit} characters`);
      }

      return errorMessages;
    }
  },
  methods: {
    openModal() {
      this.$refs.modal.open();
      setTimeout(() => this.$el.querySelector('.share-game-answer-input').focus(), 200);
    },
    copyShareLink() {
      let shareUrl = window.location.origin;
      let params = encodeSharedGameParams({
        answer: this.shareGameAnswer,
        hint: this.shareGameHint
      });

      navigator.clipboard.writeText(`${shareUrl}?g=${params}`);
      this.showLinkCopiedMessage = true;
      setTimeout(() => { this.showLinkCopiedMessage = false; }, 2000);
    }
  }
}
</script>

<style>
.share-game-answer-input {
  text-transform: uppercase;
}
.share-game-answer-input::placeholder {
  text-transform: none;
}
.link-copied-message {
  display: inline;
  margin-left: 10px;
}
</style>
