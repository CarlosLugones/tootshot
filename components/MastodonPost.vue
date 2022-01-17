<template>
  <div v-if="post" :class="`post ${dark}`">
    <div class="logo"><img src="mastodon.png" alt="" width="25pt"></div>
    <user-card :post="post" :host="host" />
    <div v-html="post.content" class="content mt-3"></div>
    <div v-if="post.card">
      <post-card :card="post.card" />
    </div>
    <div class="footer">
      <span>{{ $moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a') }}</span>
      <span>・ <i class="mdi mdi-earth"></i></span>
      <span v-if="post.application">・ {{ post.application.name }}</span>
      <span v-if="details">
        <span>・ <i class="mdi mdi-reply"></i> {{ post.replies_count }}</span>
        <span>・ <i class="mdi mdi-repeat"></i> {{ post.reblogs_count }}</span>
        <span>・ <i class="mdi mdi-star"></i> {{ post.favourites_count }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: null
    },
    host: {
      type: String,
      default: null
    },
    details: {
      type: Boolean,
      default: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dark () {
      return this.darkMode ? 'dark' : ''
    }
  }
}
</script>

<style>
.post {
  @apply p-10 rounded-lg shadow-lg border-2 bg-white;
}
.post .logo {
  float: right;
}
.post p {
  @apply mb-3;
}
.post a {
  word-break: break-all;
  @apply text-blue-500;
}
.post .invisible {
  visibility: visible;
}
.post .footer {
  @apply text-gray-600 text-sm;
}
/* dark mode */
.post.dark {
  @apply bg-gray-900 text-white border-gray-500;
}
.post.dark .footer {
  @apply text-gray-100;
}
.post.dark .card {
  @apply text-gray-100 border-gray-700;
}
</style>