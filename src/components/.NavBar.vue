<template>
    <!-- https://stackoverflow.com/questions/47511674/a-way-to-render-multiple-root-elements-on-vuejs-with-v-for-directive -->
    <div :class="upperContainerClass" :style="upperContainerStyle">
      <bar-logo v-if="vertical" :dark="dark"/>

      <div class="collapse navbar-collapse" id="navbar-menu">
          <!-- <nav-bar-list /> -->
          <div :class="internalClass" v-if="vertical !== true">
            <template v-if="condensed">
              <nav-bar-list :vertical="false"/>
              <bar-search :navbar="true" :condensed="true"/>
            </template>
            <div v-else :class="containerClass">
              <nav-bar-list :vertical="false"/>
              <bar-search :navbar="true"/>
            </div>
          </div>
          <nav-bar-list v-else :vertical="true"/>

      </div>
    </div>

</template>

<script>
import BarLogo from 'components/bar/logo'
import BarSearch from 'components/bar/search'
import NavBarList from 'components/navbar/list'

export default {
  name: 'NavBar',
  components: { BarLogo, BarSearch, NavBarList },

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

    dark: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    internalClass: function () {
      let appendClass = ''
      appendClass += (this.dark === true) ? 'navbar navbar-dark ' : 'navbar navbar-light '

      // override
      appendClass = (this.condensed === true) ? 'd-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center' : appendClass
      return appendClass
    },

    upperContainerStyle: function () {
      let appendStyle = (this.condensed === true && this.vertical !== true) ? {display: 'contents'} : {}

      return appendStyle
    },
    upperContainerClass: function () {
      let appendClass = ''

      appendClass += (this.vertical === true) ? 'container ' : (this.condensed !== true) ? 'navbar-expand-md ' : ''

      return appendClass
    },
    containerClass: function () {
      let appendClass = ''

      appendClass += (this.fluid === true) ? 'container-fluid ' : 'container-xl '

      return appendClass
    },
  }
}
</script>
