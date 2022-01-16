<template>
  <div v-if="card" class="card">
    <div v-if="card.image" class="image">
      <img :src="card.image" alt="">
    </div>
    <div>
      <p class="title">{{ card.title }}</p>
      <p class="description">{{ card.description }}</p>
      <p class="domain">{{ domain }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: null
    }
  },
  computed: {
    domain () {
      const u = new URL(this.card.url)
      const { host } = u
      return host
    }
  }
}
</script>

<style>
.post .card {
  @apply border-2 rounded mb-3 p-3 flex;
}
.post .card .image {
  width: 100pt;
  @apply mr-3 rounded;
}
.post .card .image img {
  width: 100pt;
  @apply rounded;
}
.post .card .title {
  @apply text-sm text-gray-600;
}
.post .card .description {
  @apply text-xs text-gray-500;
}
.post .card .domain {
  @apply text-xs text-gray-400;
}
</style>