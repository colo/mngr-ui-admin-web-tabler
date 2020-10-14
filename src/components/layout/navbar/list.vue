<template>
  <b-navbar-nav >
    <!-- for vertical class="pt-lg-3" -->
    <template v-for="(item, index) in list">
      <b-nav-item v-if="!item.list || item.list.length === 0" :to="item.to" :key="index" :class="( processActive(item) === true ) ? 'active' : ''">
          <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="item.icon"></span>
          <span class="nav-link-title">
            {{item.label}}
          </span>
      </b-nav-item>

      <!-- Dropdown -->
      <b-nav-item-dropdown v-else :menu-class="(item.columns) ? 'dropdown-menu-columns dropdown-menu-columns-'+item.columns : ''" :key="index" :class="( processActive(item) === true ) ? 'active' : ''">
        <template v-slot:button-content>
          <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="item.icon"></span>
          {{item.label}}
        </template>
        <b-dropdown-item v-for="(subitem, subindex) in item.list" :to="subitem.to" :key="index+'.'+subindex" exact exact-active-class="active">
          <span v-if="subitem.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="subitem.icon"></span>
          {{subitem.label}}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </template>
    <!-- <b-nav-item :to="{name: 'index'}">
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
        </span>
        <span class="nav-link-title">
          Home
        </span>
    </b-nav-item> -->

    <!-- <b-nav-item-dropdown menu-class="dropdown-menu-columns dropdown-menu-columns-2">
      <template v-slot:button-content>
          <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" /><line x1="12" y1="12" x2="20" y2="7.5" /><line x1="12" y1="12" x2="12" y2="21" /><line x1="12" y1="12" x2="4" y2="7.5" /><line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>
          </span>
            User Interface
      </template>
      <b-dropdown-item :to="{name: 'empty'}">
          Empty page
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'blank'}">
          Blank page
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'buttons'}">
          Buttons
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'cards'}">
          Cards
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'dropdowns'}">
          Dropdowns
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'icons'}">
          Icons
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'modals'}">
          Modals
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'tables'}">
          Tables
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'calendar'}">
          Calendar
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'carousel'}">
          Carousel
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'lists'}">
          Lists
      </b-dropdown-item>
    </b-nav-item-dropdown> -->

    <!-- <b-nav-item :to="{name: 'form-elements'}">
      <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 11 12 14 20 6" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
      </span>
      <span class="nav-link-title">
        Form elements
      </span>
    </b-nav-item> -->

    <!-- <b-nav-item-dropdown>
      <template v-slot:button-content>
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" /></svg>
        </span>
          Extra
      </template>
      <b-dropdown-item :to="{name: 'invoice'}">
          Invoice
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'blog'}">
          Blog cards
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'snippets'}">
          Snippets
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'search'}">
          Search results
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'pricing'}">
          Pricing cards
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'users'}">
          Users
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'gallery'}">
          Gallery
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'profile'}">
          Profile
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'music'}">
          Music
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'welcome'}">
          Welcome
      </b-dropdown-item>
    </b-nav-item-dropdown> -->

  </b-navbar-nav>

</template>

<script>
import * as Debug from 'debug'
const debug = Debug('components:layout:navbar:list')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'NavBarList',
  components: { BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem },
  props: {
    list: {
      type: [Array],
      default: function () {
        return []
      }
    }
  },
  methods: {
    processActive: function (item) {
      debug('processActive', item, this.$route)
      if (item && item.list && item.list.length > 0) {
        let active = false
        for (let i = 0; i < item.list.length; i++) {
          let _item = item.list[i]
          active = this.processActive(_item)
          if (active === true) { i = item.list.length }
        }

        return active
      } else if (item && item.to && (item.to.path === this.$route.path || item.to.name === this.$route.name)) return true
      return false
    },

  }
}
</script>
