<template>
  <div id="q-app">
    <component :is="this.$route.meta.layout || this.mode">
      <router-view />
    </component>
  </div>
</template>
<script>
import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import { mapActions } from 'vuex'

/**
* Dynamic Layout
* https://dev.to/lampewebdev/vuejs-pages-with-dynamic-layouts-problems-and-a-solution-4460
*/
import VerticalLayout from './layouts/VerticalLayout.vue'
import HorizontalLayout from './layouts/HorizontalLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

import TestLayout from './layouts/TestLayout.vue'

export default {
  name: 'App',
  components: {
    VerticalLayout,
    HorizontalLayout,
    EmptyLayout,
    TestLayout
  },
  computed: {
    // ...mapState({
    //   menuAutoExpand: state => state.layout.menuAutoExpand
    // }),
    mode: {
      get () {
        if (!this.$store.state.layout.mode || this.$store.state.layout.mode === undefined) {
          return false
        } else {
          return this.$store.state.layout.mode
        }
      },
      set (value) {
        this.setMode({ mode: value })
      }
    }
  },
  created: function () {
    // console.log('created', this.mode, this.$route)
    if (this.mode === false) { this.mode = 'HorizontalLayout' }
  },
  mounted: function () {
    // console.log('mounted', this.mode, this.$route)
    if (this.mode === false) { this.mode = 'HorizontalLayout' }
  },
  methods: {
    ...mapActions({
      setMode: 'layout/setMode',
    }),

  },
}
</script>
