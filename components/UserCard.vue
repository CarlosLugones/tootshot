<template>
  <div>
    <div v-if="post.account" class="user-card">
      <img
        v-if="post.account.avatar"
        class="avatar"
        :src="post.account.avatar"
        :alt="post.account.display_name"
      >
      <span>
        <span class="name">
          <span>{{ name }}</span>
          <span v-if="verified">
            <i v-if="darkMode" class="mdi mdi-check-decagram text-white"></i>
            <i v-else class="mdi mdi-check-decagram text-blue-600"></i>
          </span>
          <span v-if="post.account.bot">
            <i class="mdi mdi-robot text-gray-500"></i>
          </span>
          <!-- span v-if="moderator">
            <i class="mdi mdi-gavel text-gray-500"></i>
          </span -->
          <span v-for="(badge, key) in badges" :key="key" :class="`badge ${darkMode ? 'badge-dark' : ''}`">
            {{ badge }}
          </span>
        </span>
        <span class="username">
          @{{ post.account.username }}@{{ host }}
        </span>
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
    emojis: {
      type: Array,
      default: () => []
    },
    darkMode: {
      type: Boolean,
      default: null
    }
  },

  computed: {
    name() {
      if (this.post.account.display_name) {
        let name = this.post.account.display_name
        this.emojis.forEach(emoji => {
          name = name.replaceAll(`:${emoji.shortcode}:`, `<img src="${emoji.url}" width="15pt" style="display: inline-block" />`)
        });
        return name
      }
      return this.post.account.username;
    },
    verified() {
      return this.post.account.pleroma?.tags.includes('verified')
    },
    moderator() {
      return this.post.account.pleroma?.is_moderator
    },
    badges() {
      return this.post.account.pleroma?.tags.filter((badge) => {
        return badge.includes('badge:')
      }).map((badge) => {
        return badge.replaceAll('badge:', '')
      })
    }
  }
}
</script>

<style scoped>
.user-card {
  display: flex;
  overflow: hidden;
  overflow-wrap: normal;
}

.user-card .avatar {
  width: 40pt;
  height: 40pt;
  @apply mr-3 rounded-full;
}

.user-card .avatar img {
  display: inline;
  width: 40pt;
  height: 40pt;
  @apply rounded-full;
}

.user-card .name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  @apply text-xl;
}

.user-card.small .name {
  @apply text-sm;
}

.user-card .username {
  display: block;
  @apply text-gray-400 mx-auto;
}

.user-card .badge {
  text-transform: capitalize;
  @apply bg-gray-200 text-sm rounded-lg px-2 py-1;
}

.user-card .badge.badge-dark {
  @apply bg-gray-500;
}
</style>
