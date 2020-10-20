<template>
  <q-page>

  </q-page>
</template>

<script>
import * as Debug from 'debug'
const debug = Debug('apps:signout')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BForm, BFormInput, BButton, BLink } from 'bootstrap-vue'

import HttpSignout from '@etc/signout.http'

export default {
  name: 'PageSignout',

  components: { BForm, BFormInput, BButton, BLink },
  data () {
    return {
    }
  },
  computed: {
    uri: function () {
      let http = HttpSignout()
      return http.scheme + '://' + http.host + ':' + http.port + '' + http.path
    }
  },
  mounted: function () {
    this.signout()
  },
  methods: {
    signout: function () {
      this.$axios.post(this.uri, undefined, { withCredentials: true })
        .then((res) => {
          // Perform Success Action
          debug('res', res)
          this.$router.push({ name: 'index'})
        })
        .catch((error) => {
          debug('error', error)
          // error.response.status Check status code
        })
        // .finally(() => {
        //   // Perform action in always
        // })
    }
  }
}
</script>
