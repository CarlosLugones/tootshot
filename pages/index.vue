<template>
  <div>
    <div class="lg:flex hidden">
      <div class="topbar">
        <span class="brand">MastoShot</span>
        <span class="search w-full">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" />
            <InputText
              v-model="url"
              type="text"
              placeholder="Paste Mastodon toot link"
              class="w-full"
              @input="loadPost()"
            />
          </span>
        </span>
      </div>
      <div class="container w-10/12 mx-auto mt-20">    
        <div class="buttons">
          <Button :class="wrapper === 'desktop' ? '' : 'p-button-outlined'" icon="pi pi-desktop" @click="wrapper = 'desktop'" />
          <Button :class="wrapper === 'tablet' ? '' : 'p-button-outlined'" icon="pi pi-tablet" @click="wrapper = 'tablet'" />
          <Button :class="wrapper === 'mobile' ? '' : 'p-button-outlined'" icon="pi pi-mobile" @click="wrapper = 'mobile'" />
          <Button :class="darkMode ? '' : 'p-button-outlined'" icon="pi pi-moon" @click="darkMode = !darkMode" />
          <Button :class="details ? '' : 'p-button-outlined'" icon="pi pi-star" @click="details = !details" />
          <Button :class="padding === 'p-20' ? '' : 'p-button-outlined'" icon="pi pi-arrows-h" @click="togglePadding()" />
          <div class="gradient gradient-1" @click="gradient = 'gradient-1'"></div>
          <div class="gradient gradient-2" @click="gradient = 'gradient-2'"></div>
          <div class="gradient gradient-3" @click="gradient = 'gradient-3'"></div>
          <div class="gradient gradient-4" @click="gradient = 'gradient-4'"></div>
          <div class="gradient gradient-5" @click="gradient = 'gradient-5'"></div>
          <div class="gradient gradient-6" @click="gradient = 'gradient-6'"></div>
          <div class="gradient gradient-7" @click="gradient = 'gradient-7'"></div>
          <Button class="p-button-help" icon="pi pi-copy" />
          <Button
            class="p-button-help"
            :icon="downloading ? 'pi pi-spin pi-spinner' : 'pi pi-download'"
            @click="downloadPost()"
          />
        </div>
        <div :class="`post-wrapper ${wrapper} ${gradient} ${padding}`" id="post">
          <mastodon-post
            :post="post"
            :host="host"
            :details="details"
            :dark-mode="darkMode"
          />
        </div>
      </div>
    </div>
    <div class="lg:hidden visible">
      <div class="h-screen grid content-center align-middle text-center p-10">
        <p class="brand mb-5 mx-auto">MastoShot</p>
        <img src="cover.jpg" alt="" class="mb-5 rounded">
        <p>
          Load this in desktop to take beautiful shots of your Mastodon toots.
        </p>
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
      wrapper: null,
      darkMode: false,
      details: true,
      padding: null,
      gradient: null,
      downloading: false
    }
  },
  beforeMount() {
    // Init params
    this.url = this.$route.query.toot || 'https://sasuke.social/@lugodev/107619692658603975'
    this.wrapper = this.$route.query.wrapper || 'desktop'
    this.darkMode = this.$route.query.dark === 'true' || false
    this.details = this.$route.query.details === 'true' || false
    this.padding = this.$route.query.padding || 'p-20'
    this.gradient = this.$route.query.gradient || 'gradient-1'
    this.loadPost()
  },
  methods: {
    loadPost () {
      try {
        const u = new URL(this.url)
        console.log(u)
        const { origin, host, pathname } = u
        console.log(origin, host, pathname)
        const parts = pathname.split('/')
        console.log(parts)
        let id
        if (parts.length === 3) {
          id = parts[2]
        } else {
          id = parts[3]
        }
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
    },
    downloadPost() {
      this.downloading = true
      const url = encodeURIComponent(`https://mastoshot.xyz?toot=${this.url}&wrapper=${this.wrapper}&details=${this.details}&padding=${this.padding}&gradient=${this.gradient}`)
      const screentshotUrl = `https://apimania.netlify.app/api/screenshot?url=${url}&size=.post-wrapper`
      const proxyUrl = `https://lugodev-cors-anywhere.herokuapp.com/${screentshotUrl}`
      this.$axios.get(proxyUrl, { responseType:"blob" }, { mode: 'cors'})
        .then(res => {
          console.log(res)
          const blob = new Blob([res.data], { type: 'image/jpeg' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'toot.jpeg'
          link.click()
          this.downloading = false
        })
        .catch(err => {
          console.log(err)
          this.downloading = false
        })
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
  width: 1290px;
}
.post-wrapper.tablet {
  transition: 500ms;
  width: 860px;
}
.post-wrapper.mobile {
  transition: 500ms;
  width: 537px;
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
  background: #7F00FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-2 {
  background: #1a2a6c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-3 {
  background: #12c2e9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-4 {
  background: #833ab4;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fcb045, #fd1d1d, #833ab4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-5 {
  background: #6441A5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2a0845, #6441A5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2a0845, #6441A5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-6 {
  background: #000000;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient-7 {
  background: #E0EAFC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.brand {
  background: linear-gradient(to right, #E100FF, #7F00FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @apply text-3xl text-gray-800 text-center;
}
</style>