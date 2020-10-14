<template>
  <!-- Right aligned nav items -->
  <b-navbar-nav :class="navClass" style="height: 48px;">
    <bar-dropdowns-settings v-if="settings === true"/>
    <bar-dropdowns-alerts v-if="alerts === true"/>
    <bar-dropdowns-user v-if="user === true"/>

  </b-navbar-nav>
</template>

<script>
import { BNavbarNav } from 'bootstrap-vue'

import BarDropdownsAlerts from 'components/layout/bar/dropdowns/alerts'
import BarDropdownsUser from 'components/layout/bar/dropdowns/user'
import BarDropdownsSettings from 'components/layout/bar/dropdowns/settings'

export default {
  name: 'BarDropdowns',

  components: { BNavbarNav, BarDropdownsAlerts, BarDropdownsUser, BarDropdownsSettings },

  props: {
    vertical: {
      type: Boolean,
      default: false,
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
