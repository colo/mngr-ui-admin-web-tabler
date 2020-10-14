<template>
  <div class="navbar-expand-md" >
    <b-collapse id="navbar-menu" is-nav>
      <b-navbar toggleable="md" :type="(dark) ? 'dark' : 'light'" tag="div" :style="containerStyle">
        <nav-bar :vertical="false" :dark="dark" :condensed="condensed" :fluid="fluid" :background="background" :list="list" :search="search"/>
      </b-navbar>
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse, BNavbar, BNavbarToggle } from 'bootstrap-vue'

import NavBar from 'components/layout/NavBar'

export default {
  name: 'HorizontalNavBar',
  components: { BCollapse, BNavbar, BNavbarToggle, NavBar },

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

    condensed: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: true
    },
    fluid: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: undefined
    },
    search: {
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
    // internalClass: function () {
    //   let appendClass = ''
    //   appendClass += (this.dark === true) ? 'navbar navbar-dark ' : 'navbar navbar-light '
    //
    //   // override
    //   appendClass = (this.condensed === true) ? 'd-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center' : appendClass
    //   return appendClass
    // },

    // upperContainerStyle: function () {
    //   let appendStyle = (this.condensed === true && this.vertical !== true) ? {display: 'contents'} : {}
    //
    //   return appendStyle
    // },
    // upperContainerClass: function () {
    //   let appendClass = ''
    //   // appendClass += (this.dark === true) ? 'navbar navbar-dark ' : 'navbar navbar-light '
    //
    //   appendClass += (this.vertical === true) ? 'container ' : '' // (this.condensed !== true) ? 'navbar-expand-md '
    //
    //   return appendClass
    // },
    // containerClass: function () {
    //   let appendClass = ''
    //
    //   appendClass += (this.fluid === true) ? 'container-fluid' : 'container-xl'
    //
    //   return appendClass
    // },
    // containerClass: function () {
    //   let appendClass = ''
    //
    //   appendClass += (this.fluid === true) ? 'container-fluid' : 'container-xl'
    //
    //   return appendClass
    // },
  }
}
</script>
