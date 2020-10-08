<template>
  <div class="navbar-expand-md" >
    <b-collapse id="navbar-menu" is-nav>
      <b-navbar toggleable="md" :type="(dark) ? 'dark' : 'light'" tag="div" :style="containerStyle" >
        <nav-bar :vertical="false" :dark="dark" :condensed="condensed" :fluid="fluid" :background="background"/>
      </b-navbar>
    </b-collapse>
  </div>
</template>

<script>
import NavBar from 'components/NavBar'

export default {
  name: 'HorizontalNavBar',
  components: { NavBar },

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
    }
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
