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
  @apply border-2 rounded my-3 p-3 flex;
}
.post .card .image {
  background: #313543;
  flex: 0 0 100px;
  @apply mr-3 rounded;
}
.post .card .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-position: 50%;
  @apply rounded;
}
.post .card .title {
  @apply text-sm text-gray-600;
}
.post .card .description {
  @apply text-xs text-gray-500;
}
.post .card .domain {
  word-break: break-all;
  @apply text-xs text-gray-400;
}
</style>