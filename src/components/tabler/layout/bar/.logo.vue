<template>
  <!-- https://stackoverflow.com/questions/47511674/a-way-to-render-multiple-root-elements-on-vuejs-with-v-for-directive -->
  <div style="display: contents">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a href="." class="navbar-brand navbar-brand-autodark" :class="logoClass">
      <img :src="'../static/'+logo" alt="Tabler" class="navbar-brand-image">
    </a>
  </div>
</template>

<script>
export default {
  name: 'BarLogo',

  props: {
    // // title: {
    // //   type: String,
    // //   required: true
    // // },
    // //
    // // right: {
    // //   type: Boolean,
    // //   default: false
    // // },
    // //
    horizontal: {
      type: Boolean,
      default: false
    },
    // combined: {
    //   type: Boolean,
    //   default: false
    // },
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logoClass: function () {
      let appendClass = ''
      appendClass += (this.horizontal === true) ? 'd-none-navbar-horizontal pr-0 pr-md-3 ' : ''

      return appendClass
    },
    logo: function () {
      return (this.dark === true) ? 'logo-white.svg' : 'logo.svg'
    }
  }
}
</script>
