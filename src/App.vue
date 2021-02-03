<template>
  <div id="app">
    <best-time-table v-if="isCompleted"/>
    <card-grid @complete="onComplete" v-else/>
  </div>
</template>

<script>
import BestTimeTable from './components/BestTimeTable.vue'
import CardGrid from './components/CardGrid.vue'

export default {
  components: { CardGrid, BestTimeTable },
  name: 'App',
  data() {
    return {
      isCompleted: false,
    }
  },
  methods: {
    onComplete() {
      this.isCompleted = true
    },
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
