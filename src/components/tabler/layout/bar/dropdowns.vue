<template>
  <!-- Right aligned nav items -->
  <b-navbar-nav :class="navClass" style="height: 48px;">
    <bar-dropdowns-settings v-if="settings === true"/>
    <bar-dropdowns-alerts v-if="alerts === true"/>
    <bar-dropdowns-user v-if="user" :avatar="user.avatar || null" :name="user.name || null" :title="user.title || null" :actions="user.actions  || null"/>

  </b-navbar-nav>
</template>

<script>
import * as Debug from 'debug'
const debug = Debug('components:tabler:layout:dropdowns')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BNavbarNav } from 'bootstrap-vue'

import BarDropdownsAlerts from 'components/tabler/layout/bar/dropdowns/alerts'
import BarDropdownsUser from 'components/tabler/layout/bar/dropdowns/user'
import BarDropdownsSettings from 'components/tabler/layout/bar/dropdowns/settings'

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
      type: [Boolean, Object],
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
  mounted: function () {
    debug('mounted', this.user)
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
