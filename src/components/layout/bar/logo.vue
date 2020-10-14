<template>
  <b-navbar-brand href=".">
      <img :src="'../static/'+logo" alt="Tabler" class="navbar-brand-image">
  </b-navbar-brand>

</template>

<script>
import { BNavbarBrand } from 'bootstrap-vue'

export default {
  name: 'BarLogo',
  components: { BNavbarBrand },
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },

  },
  computed: {
    logo: function () {
      let img = 'logo'
      img += (this.small === true) ? '-small' : ''
      img += (this.dark === true) ? '-white' : ''
      img += '.svg'
      return img
    }
  }
}
</script>
