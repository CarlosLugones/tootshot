<template>
  <div>
    <Toast />
    <!-- help modal -->
    <Dialog
      :visible="helpModalActive"
      :style="{width: '50vw'}"
      :modal="true"
      header="About TootShot"
      @hide="helpModalActive = false"
    >
      <p class="mb-3">
        TootShot is a beautiful way to share your toots. Paste the toot URL, select style options and download or copy the screenshot.
      </p>
      <p class="mb-3">Does this add value to your daily life? Consider returning some value back to the product maker (value4value), with a donation.</p>
      <p class="mb-3 text-xs text-gray-500">
        Thanks to <a href="https://sasuke.social/@robert" class="text-blue-600" target="_blank">Robert Sasuke</a>,
        <a href="https://twitter.com/sotoplatero" class="text-blue-600" target="_blank">Damián Soto</a> and the
        <a href="https://lugonials.social" class="text-blue-600" target="_blank">lugonials</a> community.
      </p>
      <p class="mb-3">
        <a href="https://lugodev.com" class="text-blue-600" target="_blank">Made by Carlos Lugones</a> ・
        <a href="https://docs.tootshot.xyz" class="text-blue-600" target="_blank">Changelog</a>
      </p>
      <a href="https://www.producthunt.com/posts/tootshot?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tootshot" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=327332&theme=light" alt="TootShot - A beautiful way to share your screenshots | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          class="p-button-outlined"
          @click="helpModalActive = false"
        />
        <a href="https://paynest.app/lugodev" target="_blabj">
          <Button
            label="Donate"
            icon="pi pi-heart"
            class="p-button-danger"
          />
        </a>
      </template>
    </Dialog>
    <!-- end help modal -->

    <!-- new modal -->
    <Dialog
      :visible="newModalActive"
      :style="{width: '50vw'}"
      :modal="true"
      header="What's new"
      @hide="newModalActive = false"
    >
      <iframe
        src="https://sasuke.social/@lugodev/107663160986949260/embed"
        class="mastodon-embed mb-3 mx-auto"
        style="max-width: 100%; border: 0"
        width="400"
        allowfullscreen="allowfullscreen"
      >
      </iframe>
      <script src="https://sasuke.social/embed.js" async="async"></script>
      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          class="p-button-outlined"
          @click="newModalActive = false"
        />
        <a href="https://docs.tootshot.xyz" target="_blabj">
          <Button
            label="Changelog"
            icon="pi pi-link"
            class="p-button-info"
          />
        </a>
      </template>
    </Dialog>
    <!-- end new modal -->

    <div class="lg:flex hidden">
      <div class="topbar">
        <span class="brand">TootShot</span>
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
        <span>
          <Button
            icon="pi pi-bell"
            class="p-button-rounded p-button-info p-button-outlined mr-1"
            @click="newModalActive = true"
          />
        </span>
        <span>
          <Button
            icon="pi pi-question-circle"
            class="p-button-rounded p-button-info p-button-outlined"
            @click="helpModalActive = true"
          />
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
          <Button
            label="Copy"
            class="p-button-help"
            :icon="copying ? 'pi pi-spin pi-spinner' : 'pi pi-copy'"
            @click="copyPost()"
          />
          <Button
            label="Download"
            class="p-button-help"
            :icon="downloading ? 'pi pi-spin pi-spinner' : 'pi pi-download'"
            @click="downloadPost()"
          />
        </div>
        <div v-if="post" :class="`post-wrapper ${wrapper} ${gradient} ${padding}`" id="post">
          <mastodon-post
            :post="post"
            :host="host"
            :details="details"
            :dark-mode="darkMode"
            :emojis="emojis"
          />
          <div class="watermark">
            Made with TootShot.xyz
          </div>
        </div>
      </div>
    </div>
    <div class="lg:hidden visible">
      <div class="h-screen grid content-center align-middle text-center p-10">
        <p class="brand mb-5 mx-auto">TootShot</p>
        <img src="cover.jpg" alt="" class="mb-5 rounded">
        <p>
          <b>Mobile not supported:</b>
          Load this in desktop to take beautiful shots of your Mastodon toots.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
export default {
  name: 'IndexPage',
  components: { Button, InputText, Toast, Dialog },
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
      copying: false,
      downloading: false,
      helpModalActive: false,
      newModalActive: false,
      emojis: []
    }
  },
  beforeMount() {
    // Init params
    this.url = this.$route.query.toot || 'https://lugonials.social/@TootShot/107688125699732544'
    this.wrapper = this.$route.query.wrapper || 'tablet'
    this.darkMode = this.$route.query.dark === 'true' || false
    this.details = this.$route.query.details === 'true' || false
    this.padding = this.$route.query.padding || 'p-20'
    this.gradient = this.$route.query.gradient || 'gradient-1'
    this.loadPost()
  },
  methods: {
    loadPost () {
      // Destructure URL
      const u = new URL(this.url)
      const { origin, host, pathname } = u
      const parts = pathname.split('/')

      // Get emojis
      this.loadCustomEmojis(origin)

      // Get post
      try {
        let id
        if (parts.length === 3) {
          id = parts[2]
        } else {
          id = parts[3]
        }
        this.$axios.get(`${origin}/api/v1/statuses/${id}`)
          .then(res => {
            this.post = res.data
            this.host = host
          })
          .catch(err => {
            console.log(err)
          })
      } catch (e) {
        console.log(e)
      }
    },

    loadCustomEmojis(origin) {
      this.$axios.get(`${origin}/api/v1/custom_emojis`)
          .then(res => {
            this.emojis = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    togglePadding () {
      if (this.padding == 'p-10') {
        this.padding = 'p-20'
      } else {
        this.padding = 'p-10'
      }
    },

    async getScreenshot() {
      const url = encodeURIComponent(`https://tootshot.xyz?toot=${this.url}&wrapper=${this.wrapper}&details=${this.details}&dark=${this.darkMode}&padding=${this.padding}&gradient=${this.gradient}`)
      const screentshotUrl = `https://apimania.vercel.app/api/screenshot?url=${url}&size=.post-wrapper`
      const proxyUrl = `https://lugodev-cors-anywhere.herokuapp.com/${screentshotUrl}`
      const res = await this.$axios.get(proxyUrl, {
        responseType: 'blob'
      })
      const blob = new Blob([res.data], { type: 'image/jpeg' })
      return blob
    },

    async copyPost() {
      this.copying = true
      const blob = await this.getScreenshot()

      const img = new Image
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d')
      const that = this

      img.onload = function(){
        c.width = img.naturalWidth
        c.height = img.naturalHeight
        ctx.drawImage(img,0,0)
        c.toBlob(blob=>{
          const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator?.userAgent
          );
          const isNotFirefox = navigator.userAgent.indexOf("Firefox") < 0;

          if (isSafari) {
            navigator.clipboard
              .write([
                new ClipboardItem({'image/png': blob}),
              ])
              .then(() => {
                that.copying = false
                that.$toast.add({severity:'success', summary: 'Screenshot copied to clipboard', life: 3000})
              })
          } else if (isNotFirefox) {
            navigator?.permissions
              ?.query({ name: "clipboard-write" })
              .then(async (result) => {
                if (result.state === "granted") {
                  navigator.clipboard
                    .write([
                      new ClipboardItem({'image/png': blob}),
                    ])
                    .then(() => {
                      that.copying = false
                      that.$toast.add({severity:'success', summary: 'Screenshot copied to clipboard', life: 3000})
                    })
                    .catch((err) => {
                      // Error
                      that.$toast.add({severity:'error', summary: 'Error copying to clipbaord', detail:'Next time, stay in the tab to complete the copy'});
                      console.error("Error:", err);
                      that.copying = false
                    });
                }
              });
          } else {
            that.copying = false
            alert("Firefox does not support this functionality");
          }
        },'image/png')
      }
      const url = window.URL.createObjectURL(blob)
      img.src = url
    },

    async downloadPost() {
      this.downloading = true

      const blob = await this.getScreenshot()

      // Download
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'toot.jpeg'
      link.click()
      this.downloading = false
      
      /* this.$axios.get(proxyUrl, { responseType:"blob" }, { mode: 'cors'})
        .then(res => {
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
        }) */
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
  @apply mr-3;
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
.watermark {
  bottom: 0;
  right: 0;
  float: right;
  font-size: 10pt;
  width: 100%;
  opacity: 0.8;
  transition: 200ms;
  @apply p-2 mt-3 text-center text-white;
}
.gradient-7 .watermark {
  color: black;
  transition: 200ms;
}
</style>