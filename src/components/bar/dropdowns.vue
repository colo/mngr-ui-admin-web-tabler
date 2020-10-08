<template>
  <!-- Right aligned nav items -->
  <b-navbar-nav :class="navClass" style="height: 48px;">
    <bar-dropdowns-settings />
    <bar-dropdowns-alerts />
    <bar-dropdowns-user />

  </b-navbar-nav>
</template>

<script>
import BarDropdownsAlerts from 'components/bar/dropdowns/alerts'
import BarDropdownsUser from 'components/bar/dropdowns/user'
import BarDropdownsSettings from 'components/bar/dropdowns/settings'

export default {
  name: 'BarDropdowns',

  components: { BarDropdownsAlerts, BarDropdownsUser, BarDropdownsSettings },

  props: {
    vertical: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
    }
  },
  computed: {
    navClass: function () {
      let appendClass = ''
      appendClass += (this.vertical === true) ? 'flex-row d-lg-none' : 'flex-row order-md-last'

      return appendClass
    }
    // logo: function () {
    //   return (this.dark === true) ? 'logo-white.svg' : 'logo.svg'
    // }
  }
}
</script>
