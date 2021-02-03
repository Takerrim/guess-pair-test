<template>
  <div class="best-time-table">
    <h1>Best time</h1>
    <div
      v-for="(time, i) in winers"
      :key="i"
      class="item"
    >
      <strong class="number">{{i + 1}}.</strong>
      <span>{{ getFormattedTime(time) }}</span>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils'
import { WINERS_KEY } from '@/constants'

export default {
  data() {
    return {
      bestTimeList: [],
    }
  },
  methods: {
    getBestTimeList() {
      this.winers = localStorage.getItem(WINERS_KEY) || [54]
    },
    getFormattedTime(time) {
      return formatTime(time)
    },
  },
  created() {
    this.getBestTimeList()
  },
}
</script>

<style scoped>
.best-time-table {
  max-width: 500px;
  width: 100%;
}

.item {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #000;
}

.number {
  margin-right: 8px;
}
</style>