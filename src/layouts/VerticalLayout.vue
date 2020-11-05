<template>
  <q-layout>
    <vertical-nav-bar
      v-if="navbar.available === true"
      :right="navbar.right"
      :dark="darkNavBar"
      :background="navbar.background"
      :smallLogo="smallLogo"
      :logo="logo"
      :list="navbar.list"
      :search="search"
      />

    <div class="page">
      <b-navbar toggleable="md" :type="(darkTopBar === true) ? 'dark' : 'light'" tag="header" v-if="topbar.available === true" class="d-none d-lg-flex" :style="topbarContainerStyle">
        <top-bar
          :combined="topbar.combined"
          :dark="darkTopBar"
          :fluid="fluid"
          :vertical="true"
          :background="topbar.background"
          :grow="false"
          :search="search"
          :user="user"
          :alerts="alerts"
          :settings="settings"
        />
      </b-navbar>
      <div class="content">
        <div :class="containerClass">
          <q-page-container>
            <router-view :dark="dark" :fluid="fluid" :mode="mode"/>
          </q-page-container>
        </div>

        <content-footer />
      </div>
    </div>

  </q-layout>

</template>

<script>
import Vue from 'vue'

import { BNavbar } from 'bootstrap-vue'

import { mapActions, mapState } from 'vuex'

import Layout from '@mixins/Layout'

import VerticalNavBar from 'components/tabler/layout/VerticalNavBar'
import ContentFooter from 'components/tabler/layout/ContentFooter'

export default Vue.extend({
  name: 'MainLayout',
  mixins: [Layout],

  components: {
    BNavbar,
    VerticalNavBar,
    ContentFooter
  },
  // props: {
  //   topbar: {
  //     type: Object,
  //     default: function () {
  //       return {
  //         available: true,
  //         combined: true,
  //         dark: false
  //       }
  //     }
  //   },
  //   navbar: {
  //     type: Object,
  //     default: function () {
  //       return {
  //         available: true,
  //         right: false,
  //         dark: true
  //       }
  //     }
  //   },
  //   // fluid: {
  //   //   type: Boolean,
  //   //   default: true
  //   // }
  // },
  computed: {
    ...mapState({
      navbar: state => state.layout.VerticalLayout.navbar,
      topbar: state => state.layout.VerticalLayout.topbar,
      smallLogo: state => state.layout.VerticalLayout.smallLogo,
      logo: state => state.layout.VerticalLayout.logo,
      search: state => state.layout.VerticalLayout.search,
      // user: state => state.layout.VerticalLayout.user,
      alerts: state => state.layout.VerticalLayout.alerts,
      settings: state => state.layout.VerticalLayout.settings,
      // fluid: state => state.layout.fluid,
    }),
    containerClass: function () {
      let appendClass = ''

      appendClass += (this.fluid === true) ? 'container-fluid ' : 'container-xl '

      return appendClass
    },
  },
  // mounted: function () {
  //   this.loadUser(this.httpServer.scheme + '://' + this.httpServer.host + ':' + this.httpServer.port + this.httpServer.path)
  // },
  data () {
    return {
    }
  },

})
</script>
