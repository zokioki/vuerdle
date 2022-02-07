<template>
  <div class="statistics">
    <button class="statistics-open" @click="show">%</button>

    <div v-show="showStatistics" class="statistics-container">
      <div class="statistics-backdrop"></div>
      <div class="statistics-content">
        <button class="statistics-close" @click="hide">X</button>
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

        <button @click="startNewGame">New Game</button>
      </div>
    </div>
  </div>
</template>

<script>
import { savedGameState } from './utils/gameState';

export default {
  name: 'Statistics',
  props: {
    parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showStatistics: false
    }
  },
  methods: {
    show() {
      this.showStatistics = true;
    },
    hide() {
      this.showStatistics = false;
    },
    startNewGame() {
      this.parent.startNewGame();
      this.hide();
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
:root {
  --statistics-background-color: #ffffff;
}
.dark-mode {
  --statistics-background-color: #4a4a4a;
}

.statistics-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.statistics-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}
.statistics-content {
  position: relative;
  margin: 2em auto 0 auto;
  background-color: var(--statistics-background-color);
  border-radius: 6px;
  padding: 1em;
  max-width: 400px;
  z-index: 999;
}
.statistics-open {
  cursor: pointer;
}
.statistics-close {
  float: right;
  cursor: pointer;
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
</style>
