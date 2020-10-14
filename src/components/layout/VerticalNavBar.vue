<template>
  <!-- <aside class="navbar" :class="asideClass"> -->
    <b-navbar toggleable="lg" :type="(dark) ? 'dark' : 'light'" tag="aside" class="navbar-vertical" :class="asideClass" :style="containerStyle">
      <div class="container">
        <b-navbar-toggle target="navbar-menu"></b-navbar-toggle>

        <bar-logo v-if="logo" :dark="dark" :small="smallLogo"/>

        <!-- Right aligned nav items -->
        <bar-dropdowns :vertical="true"/>

        <b-collapse id="navbar-menu" is-nav>
          <nav-bar
            :vertical="true"
            :dark="dark"
            :list="list"
            :search="search"
            :user="user"
            :alerts="alerts"
            :settings="settings"
          />
        </b-collapse>
    </div>
    </b-navbar>
  <!-- </aside> -->
</template>

<script>
import { BNavbar, BNavbarToggle, BCollapse } from 'bootstrap-vue'

import BarLogo from 'components/layout/bar/logo'
import BarDropdowns from 'components/layout/bar/dropdowns'
import NavBar from 'components/layout/NavBar'

export default {
  name: 'VerticalNavBar',
  components: { BNavbar, BNavbarToggle, BCollapse, BarLogo, BarDropdowns, NavBar },

  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    //
    right: {
      type: Boolean,
      default: false
    },

    // vertical: {
    //   type: Boolean,
    //   default: true
    // },

    dark: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
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
    containerStyle: function () {
      let appendStyle = {}

      if (this.background !== '') appendStyle.background = this.background

      return appendStyle
    },
    asideClass: function () {
      let appendClass = ''
      appendClass += (this.dark === true) ? 'navbar-dark ' : 'navbar-light '

      appendClass += (this.right === true) ? 'navbar-right' : ''

      return appendClass
    },
    // containerClass: function () {
    //   let appendClass = ''
    //
    //   appendClass += 'container'
    //
    //   return appendClass
    // },
  }
}
</script>
