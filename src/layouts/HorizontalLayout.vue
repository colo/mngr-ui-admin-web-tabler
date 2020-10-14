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
          :list="navbar.list"
          :search="search"
          :alerts="alerts"
          :user="user"
          :settings="settings"
          />
      </b-navbar>
      <horizontal-nav-bar v-if="condensed !== true && navbar.available === true" :dark="darkNavBar" :fluid="fluid" :background="navbar.background" :list="navbar.list" :search="search"/>

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

import { BNavbar } from 'bootstrap-vue'

import Layout from '@mixins/Layout'

import HorizontalNavBar from 'components/layout/HorizontalNavBar'
import TopBar from 'components/layout/TopBar'
import ContentFooter from 'components/layout/ContentFooter'

export default Vue.extend({
  name: 'HorizontalLayout',
  mixins: [Layout],
  components: {
    BNavbar,
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
      search: state => state.layout.HorizontalLayout.search,
      user: state => state.layout.HorizontalLayout.user,
      alerts: state => state.layout.HorizontalLayout.alerts,
      settings: state => state.layout.HorizontalLayout.settings,
    }),
    containerClass: function () {
      let appendClass = ''

      appendClass += (this.fluid === true) ? 'container-fluid ' : 'container-xl '

      return appendClass
    },

  },

})
</script>
