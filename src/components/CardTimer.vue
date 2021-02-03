<template>
  <span>{{ formattedTime }}</span>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  data() {
    return {
      time: 0,
      timer: null,
    }
  },
  computed: {
    formattedTime() {
      return formatTime(this.time)
    }
  },
  methods: {
    start() {
      if (this.timer === null) {
        this.timer = setInterval(() => {
          this.time += 1
        }, 1000)
      }
    },
    stop() {
      if (this.timer !== null) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
  },
}
</script>
