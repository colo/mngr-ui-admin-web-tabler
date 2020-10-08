<template>
  <q-layout>
    <vertical-nav-bar
      v-if="navbar.available === true"
      :right="navbar.right"
      :dark="darkNavBar"
      :background="navbar.background"
      :smallLogo="smallLogo"
      :logo="logo"
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
        />
      </b-navbar>
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

import VerticalNavBar from 'components/VerticalNavBar'
import ContentFooter from 'components/ContentFooter'

export default Vue.extend({
  name: 'MainLayout',
  mixins: [Layout],

  components: {
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
      fluid: state => state.layout.fluid,
    }),
    containerClass: function () {
      let appendClass = ''

      appendClass += (this.fluid === true) ? 'container-fluid ' : 'container-xl '

      return appendClass
    },
  },
  data () {
    return {
    }
  },

})
</script>
