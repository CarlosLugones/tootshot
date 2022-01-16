<template>
  <div class="container w-10/12 mx-auto mt-10">
    <p class="text-3xl text-center mb-5">MastoShot</p>
    <span class="p-input-icon-left w-full">
      <i class="pi pi-search" />
      <InputText v-model="url" type="text" placeholder="Paste Mastodon toot link" class="w-full" @input="loadPost()" />
    </span>
    <mastodon-post :post="post" :host="host" class="mt-10" />
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
      post: null
    }
  },
  mounted() {
    this.url = 'https://sasuke.social/@lugodev/107626977279235342'
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
    }
  }
}
</script>
