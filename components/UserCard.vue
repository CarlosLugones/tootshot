<template>
  <div>
    <div v-if="post.account" class="user-card">
      <span class="avatar">
        <img
          v-if="post.account.avatar"
          :src="post.account.avatar"
          :alt="post.account.display_name"
        >
      </span>
      <span>
        <span class="name">
          {{ post.account.display_name }}
        </span>
        <span class="username">
          @{{ post.account.username }}@{{ host }}
        </span>
      </span>
      <span><img src="mastodon.png" alt="" width="25pt" class="float-right"></span>
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

.user-card:hover {
    cursor: pointer;
}

.user-card .avatar {
    width: 40pt;
    height: 40pt;
    @apply mr-3;
}

.user-card .avatar img {
    display: inline;
    width: 40pt;
    height: 40pt;
    @apply rounded-full;
}

.user-card.small .avatar img {
    width: 30pt !important;
    height: 30pt !important;
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
