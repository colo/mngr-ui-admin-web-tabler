<template>
  <!-- <b-navbar toggleable="md" :type="(dark) ? 'dark' : 'light'" tag="header"> -->
    <div :class="containerClass" :style="containerStyle">
      <b-navbar-toggle target="navbar-menu"></b-navbar-toggle>
      <bar-logo v-if="combined === false && logo === true" :horizontal="true" :dark="dark" :small="smallLogo"/>

      <!-- Right aligned nav items -->
      <bar-dropdowns
        :user="user"
        :alerts="alerts"
        :settings="settings"
      />

      <b-collapse id="navbar-menu" is-nav>
        <!-- <b-navbar-nav v-if="vertical === true">
          <b-nav-form> -->
            <bar-search v-if="vertical === true && search === true"/>

            <div v-if="condensed === true" class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <nav-bar :dark="dark" :condensed="true" :vertical="false" :background="background" :list="list"/>
              <div v-if="search === true" class="ml-md-auto pl-md-4 py-2 py-md-0 mr-md-4 order-first order-md-last" :class="searchClass">
                <bar-search />
              </div>
            </div>
          <!-- </b-nav-form>
        </b-navbar-nav> -->
      </b-collapse>

    </div>

  <!-- </b-navbar> -->

</template>

<script>
import { BNavbarToggle, BCollapse } from 'bootstrap-vue'

import BarLogo from 'components/layout/bar/logo'
import BarSearch from 'components/layout/bar/search'
import BarDropdowns from 'components/layout/bar/dropdowns'
// import HorizontalNavBar from 'components/HorizontalNavBar'
import NavBar from 'components/layout/NavBar'

export default {
  name: 'TopBar',
  components: { BNavbarToggle, BCollapse, BarLogo, BarSearch, BarDropdowns, NavBar },

  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    //
    // right: {
    //   type: Boolean,
    //   default: false
    // },
    //
    vertical: {
      type: Boolean,
      default: false
    },
    condensed: {
      type: Boolean,
      default: false
    },
    combined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    },
    grow: {
      type: Boolean,
      default: false
    },
    smallLogo: {
      type: Boolean,
      default: false
    },
    logo: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: undefined
    },
    search: {
      type: Boolean,
      default: true
    },
    alerts: {
      type: Boolean,
      default: true
    },
    user: {
      type: Boolean,
      default: true
    },
    settings: {
      type: Boolean,
      default: true
    },
  },
  computed: {

    searchClass: function () {
      let appendClass = ''

      appendClass += (this.grow === false) ? 'flex-md-grow-0' : 'flex-grow-1'

      return appendClass
    },
    containerStyle: function () {
      let appendStyle = {}

      if (this.background !== '') appendStyle.background = this.background

      return appendStyle
    },
    containerClass: function () {
      let appendClass = ''

      appendClass += (this.fluid === true) ? 'container-fluid ' : 'container-xl '

      return appendClass
    },
    // headerClass: function () {
    //   let appendClass = ''
    //   appendClass += (this.dark === true) ? 'navbar-dark ' : 'navbar-light '
    //
    //   appendClass += (this.combined === true) ? 'navbar-expand-md navbar-light d-none d-lg-flex ' : 'navbar-expand-md '
    //
    //   return appendClass
    // }
  }
}
</script>
