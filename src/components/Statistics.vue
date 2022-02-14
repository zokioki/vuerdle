<template>
  <div class="statistics">
    <button class="button" @click="$refs.modal.open">%</button>

    <Modal ref="modal">
      <p><strong>Statistics</strong></p>
      <div class="stat-entries">
        <div class="stat-entry">
          <span class="stat-number">{{this.gamesPlayed()}}</span>
          <span class="stat-description">Played</span>
        </div>
        <div class="stat-entry">
          <span class="stat-number">{{this.winPercentage()}}</span>
          <span class="stat-description">Win %</span>
        </div>
        <div class="stat-entry">
          <span class="stat-number">{{this.currentWinStreak()}}</span>
          <span class="stat-description">Current Streak</span>
        </div>
        <div class="stat-entry">
          <span class="stat-number">{{this.maxWinStreak()}}</span>
          <span class="stat-description">Max Streak</span>
        </div>
      </div>

      <div class="button-group">
        <button class="button" @click="startNewGame">New Game</button>
        <button class="button" @click="shareGame" v-if="parent.isGameComplete">Share</button>
        <div class="share-message" v-if="showShareMessage">Copied to clipboard</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import { savedGameState } from './utils/gameState';

export default {
  name: 'Statistics',
  components: {
    Modal
  },
  props: {
    parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showShareMessage: false,
    }
  },
  methods: {
    startNewGame() {
      const shouldStartNewGame = this.parent.isGameComplete || window.confirm(
        'Are you sure you want to start a new game? ' +
        'Your progress on the current game will be lost.'
      );

      if (shouldStartNewGame) {
        this.parent.startNewGame();
        this.parent.setMessage('New game', 2000);
        this.$refs.modal.close();
      }
    },
    shareGame() {
      let shareString = 'Vuerdle result:\n';
      shareString += this.parent.$refs.wordRows.map(row => row.toShareString()).join('\n');

      navigator.clipboard.writeText(shareString);

      this.showShareMessage = true;
      setTimeout(() => { this.showShareMessage = false; }, 2000);
    },
    gamesPlayed() {
      return savedGameState().previousGames.length;
    },
    winPercentage() {
      const { previousGames } = savedGameState();
      const gamesWon = previousGames.filter(game => game.won);

      if (!previousGames.length) return 0;

      const percentage = (gamesWon.length / previousGames.length) * 100;
      return Math.round(percentage);
    },
    currentWinStreak() {
      const streaks = this.winStreaks();
      return streaks[streaks.length - 1];
    },
    maxWinStreak() {
      return Math.max(...this.winStreaks());
    },
    winStreaks() {
      return savedGameState().previousGames.reduce((streaks, game) => {
        game.won ? streaks[streaks.length - 1]++ : streaks.push(0);
        return streaks;
      }, [0]);
    }
  }
}
</script>

<style>
.statistics .button-group {
  margin-top: 2em;
  justify-content: space-evenly;
}
.stat-entries {
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
}
.stat-entry {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.stat-number {
  font-size: 1.25em;
  font-weight: 600;
}
.share-message {
  position: absolute;
  margin: 0 auto;
  top: 6px;
}
</style>
