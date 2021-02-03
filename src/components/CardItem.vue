<template>
  <div class="card-item" @click="open">
    <img class="image" :src="require(`@/assets/${cardName}.png`)" v-if="!card.guessed">
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  computed: {
    cardName() {
      return this.card.opened ? this.card.name : 'back' 
    },
  },
  methods: {
    open() {
      if (!this.card.guessed) {
        this.$emit('open', {
          idx: this.idx,
          name: this.card.name,
        })
      }
    }
  }
}
</script>

<style scoped>
.card-item {
  background-color: #f0f0f0;
}

.image {
  display: block;
  width: 100%;
  height: 130px;
  cursor: pointer;
}
</style>
