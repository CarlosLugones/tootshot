<template>
  <div>
    <div class="topbar">
      <span class="brand">MastoShot</span>
      <span class="search w-full">
        <span class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText v-model="url" type="text" placeholder="Paste Mastodon toot link" class="w-full" @input="loadPost()" />
        </span>
      </span>
    </div>
    <div class="mt-20"></div>
    <div class="container w-10/12 mx-auto mt-10">    
      <div class="buttons">
        <Button :class="wrapperSize === 'desktop' ? '' : 'p-button-outlined'" icon="pi pi-desktop" @click="wrapperSize = 'desktop'" />
        <Button :class="wrapperSize === 'tablet' ? '' : 'p-button-outlined'" icon="pi pi-tablet" @click="wrapperSize = 'tablet'" />
        <Button :class="wrapperSize === 'mobile' ? '' : 'p-button-outlined'" icon="pi pi-mobile" @click="wrapperSize = 'mobile'" />
        <Button :class="darkMode ? '' : 'p-button-outlined'" icon="pi pi-moon" @click="darkMode = !darkMode" />
        <Button :class="details ? '' : 'p-button-outlined'" icon="pi pi-star" @click="details = !details" />
        <Button :class="padding === 'p-20' ? '' : 'p-button-outlined'" icon="pi pi-arrows-h" @click="togglePadding()" />
        <div class="gradient gradient-1" @click="gradient = 'gradient-1'"></div>
        <div class="gradient gradient-2" @click="gradient = 'gradient-2'"></div>
        <div class="gradient gradient-3" @click="gradient = 'gradient-3'"></div>
        <div class="gradient gradient-4" @click="gradient = 'gradient-4'"></div>
        <div class="gradient gradient-5" @click="gradient = 'gradient-5'"></div>
        <div class="gradient gradient-6" @click="gradient = 'gradient-6'"></div>
      </div>
      <div :class="`post-wrapper ${wrapperSize} ${gradient} ${padding}`">
        <mastodon-post
          :post="post"
          :host="host"
          :details="details"
          :dark-mode="darkMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
export default {
  name: 'IndexPage',
  components: { Button, InputText },
  data () {
    return {
      url: null,
      host: null,
      post: null,
      wrapperSize: 'desktop',
      darkMode: false,
      details: true,
      padding: 'p-20',
      gradient: 'gradient-1'
    }
  },
  mounted() {
    this.url = 'https://sasuke.social/@lugodev/107619692658603975'
    this.loadPost()
  },
  methods: {
    loadPost () {
      try {
        const u = new URL(this.url)
        console.log(u)
        const { origin, host, pathname } = u
        console.log(origin, host, pathname)
        const id = pathname.split('/')[2]
        console.log(id)
        this.$axios.get(`${origin}/api/v1/statuses/${id}`)
          .then(res => {
            console.log(res)
            this.post = res.data
            this.host = host
          })
          .catch(err => {
            console.log(err)
          })
      } catch (e) {
        console.log(e)
      }
      /* this.$http.get(this.url).then(response => {
        console.log(response)
      }) */
    },
    togglePadding () {
      if (this.padding == 'p-10') {
        this.padding = 'p-20'
      } else {
        this.padding = 'p-10'
      }
    }
  }
}
</script>

<style>
.topbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  @apply p-3 bg-white flex;
}
.topbar .brand {
  display: inline;
  background: linear-gradient(to right, #E100FF, #7F00FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @apply text-3xl text-gray-800 mr-3;
}
.topbar .search {
  display: inline;
}
.buttons {
  @apply mx-auto text-center my-5 flex gap-2 place-content-center;
}
.post-wrapper {
  @apply mb-10 mx-auto;
}
.post-wrapper.desktop {
  transition: 500ms;
  @apply w-full;
}
.post-wrapper.tablet {
  transition: 500ms;
  @apply w-8/12;
}
.post-wrapper.mobile {
  transition: 500ms;
  @apply w-5/12;
}
.gradient {
  width: 37.7px;
  height: 42px;
  display: inline-block;
  @apply rounded border border-gray-300;
}
.gradient:hover {
  cursor: pointer;
}
.gradient-1 {
  background: #12c2e9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-2 {
  background: #7F00FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-3 {
  background: #0f0c29;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-4 {
  background: #12c2e9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-5 {
  background: #833ab4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fcb045, #fd1d1d, #833ab4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-6 {
  background: #6441A5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2a0845, #6441A5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2a0845, #6441A5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>