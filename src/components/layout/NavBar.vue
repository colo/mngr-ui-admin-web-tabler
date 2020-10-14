<template>

    <div :class="containerClass" :style="containerStyle">

      <nav-bar-list :list="list"/>

      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last" v-if="vertical !== true">
        <b-nav-form> -->
          <div v-if="vertical !== true && condensed !== true && search === true" class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
            <bar-search />
          </div>
        <!-- </b-nav-form>
      </b-navbar-nav> -->

    </div>

</template>

<script>
// import BarLogo from 'components/layout/bar/logo'
import BarSearch from 'components/layout/bar/search'
import NavBarList from 'components/layout/navbar/list'

export default {
  name: 'NavBar',
  components: { BarSearch, NavBarList },

  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    //
    condensed: {
      type: Boolean,
      default: false
    },

    vertical: {
      type: Boolean,
      default: true
    },

    // dark: {
    //   type: Boolean,
    //   default: false
    // },
    fluid: {
      type: Boolean,
      default: false
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
    // internalClass: function () {
    //   let appendClass = ''
    //   appendClass += (this.dark === true) ? 'navbar navbar-dark ' : 'navbar navbar-light '
    //
    //   // override
    //   appendClass = (this.condensed === true) ? 'd-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center' : appendClass
    //   return appendClass
    // },
    // upperContainerClass: function () {
    //   let appendClass = ''
    //   // appendClass += (this.dark === true) ? 'navbar navbar-dark ' : 'navbar navbar-light '
    //
    //   appendClass += (this.vertical === true) ? 'container ' : '' // (this.condensed !== true) ? 'navbar-expand-md '
    //
    //   return appendClass
    // },

    containerStyle: function () {
      let appendStyle = (this.condensed === true && this.vertical !== true) ? {display: 'contents'} : {}

      if (this.background !== '') appendStyle.background = this.background

      return appendStyle
    },

    containerClass: function () {
      let appendClass = ''

      appendClass += (this.vertical === true) ? 'container' : (this.fluid === true) ? 'container-fluid' : 'container-xl'

      return appendClass
    },
  }
}
</script>
