<template>
  <img :src="image">
</template>

<script>
export default {
  ready() {
    setInterval(() => {
      this.index = (this.index + 1) % 3;
      this.image = `/static/images/loading/${this.index + 1}.png`;
    }, 150)
  },

  data() {
    return {
      index: 0,
      image: '/static/images/loading/1.png'
    }
  }
}
</script>
