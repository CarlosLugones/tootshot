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
          {{ post.account.display_name || post.account.username }}
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
</style>
