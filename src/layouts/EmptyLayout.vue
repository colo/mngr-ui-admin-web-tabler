<template>
  <q-layout>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<script>
import Vue from 'vue'

import { mapActions, mapState } from 'vuex'

import Layout from '@mixins/Layout'

// import VerticalNavBar from 'components/VerticalNavBar'
// import ContentFooter from 'components/ContentFooter'

export default Vue.extend({
  name: 'EmptyLayout',
  mixins: [Layout],

  // components: {
  //   VerticalNavBar,
  //   ContentFooter
  // },
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
  mounted: function () {
    // if (this.dark === true) {
    //   this.toggleBodyClass('addClass', 'theme-dark')
    // } else {
    //   this.toggleBodyClass('removeClass', 'theme-dark')
    // }
    this.toggleBodyClass('addClass', 'antialiased')
    this.toggleBodyClass('addClass', 'border-top-wide')
    this.toggleBodyClass('addClass', 'border-primary')
    this.toggleBodyClass('addClass', 'd-flex')
    this.toggleBodyClass('addClass', 'flex-column')
  },
  beforeDestroy: function () {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    this.toggleBodyClass('removeClass', 'border-top-wide')
    this.toggleBodyClass('removeClass', 'border-primary')
    this.toggleBodyClass('removeClass', 'd-flex')
    this.toggleBodyClass('removeClass', 'flex-column')
  }

})
</script>
