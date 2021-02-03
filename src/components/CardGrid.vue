<template>
  <div>
    <div class="controls-block">
      <button @click="start" v-if="!isStarted" class="btn">Start</button>
      <card-timer ref="timer"/>
    </div>
    <div class="card-grid-wrapper">
      <div class="overlay" v-if="!isStarted"></div>
      <div class="card-grid">
        <card-item
          v-for="(card, i) in cards"
          :key="i"
          :card="card"
          :idx="i"
          @open="onOpen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from './CardItem.vue'
import cards, { WINERS_KEY } from '@/constants'
import CardTimer from './CardTimer.vue'

const MAX_CHOOSING_TIME = 5

export default {
  components: { CardItem, CardTimer },
  data() {
    return {
      activePair: [],
      cards: [...cards, ...cards],
      isStarted: false,
      timer: null,
      choosingTime: 0,
    }
  },
  methods: {
    countUp() {
      if (this.timer === null) {
        this.timer = setInterval(() => {
          this.choosingTime += 1
          if (this.choosingTime >= MAX_CHOOSING_TIME) {
            this.resetCards()
            this.resetTimer()
            this.choosingTime = 0
          }
        }, 1000)
      }
    },
    checkForCompleting() {
      const isCompleted = this.cards.filter((card) => card.guessed).length === this.cards.length
      if (isCompleted) {
        this.$refs.timer.stop()
        const bestTimeList = localStorage.getItem(WINERS_KEY) || []
        bestTimeList.push(this.$refs.timer.time)
        localStorage.setItem(WINERS_KEY, bestTimeList)
        this.$emit('complete')
      }
    },
    onOpen(card) {
      if (this.activePair.length === 2) {
        this.resetCards()
        this.resetTimer()
        this.choosingTime = 0
      }
      this.countUp()

      this.cards.splice(card.idx, 1, { ...card, opened: true })

      const foundCard = this.activePair.find((activeCard) => (
        activeCard.name === card.name && activeCard.idx !== card.idx
      ))

      if (foundCard) {
        this.activePair.forEach((activeCard) => {
          this.cards.splice(activeCard.idx, 1, { ...activeCard, guessed: true })
          this.checkForCompleting()
          this.resetTimer()
          this.choosingTime = 0
        })
        this.activePair = []
        return
      }
      this.activePair.push(card)
    },
    resetCards() {
      this.activePair = []
      this.cards = this.cards.map((card) => ({ ...card, opened: false }))
    },
    resetTimer() {
      if (this.timer !== null) {
        clearInterval(this.timer)
      }
      this.timer = null
    },
    shuffle() {
      const cards = [...this.cards]
      for (let i = cards.length - 1; i > 0; i--) {
        const idx = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[idx]] = [cards[idx], cards[i]];
      }
      this.cards = cards
    },
    start() {
      this.$refs.timer.start()
      this.isStarted = true
    }
  },
  created() {
    this.shuffle()
  },
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-template-rows: repeat(6, 130px);
  grid-gap: 16px;
}

.controls-block {
  margin-bottom: 32px;
}

.btn {
  margin-right: 18px;
}

.card-grid-wrapper {
  position: relative;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}
</style>
