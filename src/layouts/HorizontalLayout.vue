<template>
  <q-layout>
    <div class="page">
      <b-navbar toggleable="md" :type="(darkTopBar === true) ? 'dark' : 'light'" tag="header" :style="topbarContainerStyle">
        <top-bar
          v-if="topbar.available === true"
          :condensed="condensed"
          :combined="topbar.combined"
          :dark="darkTopBar"
          :fluid="fluid"
          :background="topbar.background"
          :grow="topbar.grow"
          :smallLogo="smallLogo"
          :logo="logo"
          />
      </b-navbar>
      <horizontal-nav-bar v-if="condensed !== true && navbar.available === true" :dark="darkNavBar" :fluid="fluid" :background="navbar.background"/>

      <div class="content">
        <div :class="containerClass">
          <q-page-container>
            <router-view />
          </q-page-container>
        </div>

        <content-footer />
      </div>
    </div>
  </q-layout>

</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

import Layout from '@mixins/Layout'

import HorizontalNavBar from 'components/HorizontalNavBar'
import TopBar from 'components/TopBar'
import ContentFooter from 'components/ContentFooter'

export default Vue.extend({
  name: 'HorizontalLayout',
  mixins: [Layout],
  components: {
    HorizontalNavBar,
    TopBar,
    ContentFooter
  },
  data () {
    return {
    }
  },
  // props: {
  //   topbar: {
  //     type: Object,
  //     default: function () {
  //       return {
  //         available: true,
  //         combined: false,
  //         dark: false
  //       }
  //     }
  //   },
  //   navbar: {
  //     type: Object,
  //     default: function () {
  //       return {
  //         available: true,
  //         // right: false,
  //         dark: false
  //       }
  //     }
  //   },
  //   condensed: {
  //     type: Boolean,
  //     default: false
  //   },
  //   // fluid: {
  //   //   type: Boolean,
  //   //   default: false
  //   // }
  // },

  computed: {
    ...mapState({
      navbar: state => state.layout.HorizontalLayout.navbar,
      topbar: state => state.layout.HorizontalLayout.topbar,
      condensed: state => state.layout.HorizontalLayout.condensed,
      smallLogo: state => state.layout.HorizontalLayout.smallLogo,
      logo: state => state.layout.HorizontalLayout.logo,
    }),
    containerClass: function () {
      let appendClass = ''

      appendClass += (this.fluid === true) ? 'container-fluid ' : 'container-xl '

      return appendClass
    },

  },

})
</script>
