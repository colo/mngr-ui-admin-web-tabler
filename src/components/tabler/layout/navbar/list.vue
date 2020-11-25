<template>
  <b-navbar-nav >
    <!-- for vertical class="pt-lg-3" -->
    <template v-for="(item, index) in list">
      <b-nav-item v-if="(!item.list || item.list.length === 0) && (!item.columns || item.columns.length === 0)" :to="item.to" :key="index" :class="( processActive(item) === true ) ? 'active' : ''">
          <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="item.icon"></span>
          <span class="nav-link-title">
            {{item.label}}
          </span>
      </b-nav-item>

      <!-- Dropdown -->
      <!-- :menu-class="(item.columns) ? 'dropdown-menu-columns dropdown-menu-columns-'+item.columns : ''" -->
      <b-nav-item-dropdown v-else :key="index" :class="( processActive(item) === true ) ? 'active' : ''">
        <template v-slot:button-content>
          <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="item.icon"></span>
          {{item.label}}
        </template>
        <slot v-if="item.columns">
          <div class="dropdown-menu-columns">
            <div class="dropdown-menu-column" v-for="(column, column_index) in processColumns(item)" :key="index+'.'+column_index">
              <template v-for="(column_item, column_item_index) in column">

                <div class="dropright" v-if="column_item.list && column_item.list.length > 0" :key="index+'.'+column_index+'.'+column_item_index">
                  <b-nav-item-dropdown :ref="index+'.'+column_index+'.'+column_item_index+'.nested'" id="dropdown-nested" toggle-class="dropdown-item">
                    <template v-slot:button-content>
                      <span v-if="column_item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="column_item.icon"></span>
                      {{column_item.label}}
                    </template>
                    <b-dropdown-item v-for="(column_item_nested, column_item_nested_index) in column_item.list" :to="column_item_nested.to" :key="index+'.'+column_index+'.'+column_item_index + '.' +column_item_nested_index" exact exact-active-class="active">
                      <span v-if="column_item_nested.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="column_item_nested.icon"></span>
                      {{column_item_nested.label}}
                    </b-dropdown-item>
                  </b-nav-item-dropdown>
                </div>

                <b-dropdown-item v-else :to="column_item.to" exact exact-active-class="active" :key="index+'.'+column_index+'.'+column_item_index">
                  <span v-if="column_item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="column_item.icon"></span>
                  {{column_item.label}}
                </b-dropdown-item>

              </template>
              <!-- <b-dropdown-item v-for="(column_item, column_item_index) in column" :to="column_item.to" :key="index+'.'+column_index+'.'+column_item_index" exact exact-active-class="active">

                <div class="dropright" v-if="column_item.list && column_item.list.length > 0">
                  <b-nav-item-dropdown id="dropdown-nested" >
                    <template v-slot:button-content>
                      <span v-if="column_item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="column_item.icon"></span>
                      {{column_item.label}}
                    </template>
                    <b-dropdown-item v-for="(column_item_nested, column_item_nested_index) in column_item.list" :to="column_item_nested.to" :key="index+'.'+column_index+'.'+column_item_index + '.' +column_item_nested_index" exact exact-active-class="active">
                      <span v-if="column_item_nested.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="column_item_nested.icon"></span>
                      {{column_item_nested.label}}
                    </b-dropdown-item>
                  </b-nav-item-dropdown>
                </div>

                <template v-else>
                  <span v-if="column_item.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="column_item.icon"></span>
                  {{column_item.label}}
                </template>
              </b-dropdown-item> -->
            </div>

          </div>
        </slot>
        <!-- No columns -->
        <b-dropdown-item v-else v-for="(subitem, subindex) in item.list" :to="subitem.to" :key="index+'.'+subindex" exact exact-active-class="active">
          <span v-if="subitem.icon" class="nav-link-icon d-md-none d-lg-inline-block" v-html="subitem.icon"></span>
          {{subitem.label}}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </template>

  </b-navbar-nav>

</template>

<script>
/**
* nested menus from:
* https://stackoverflow.com/questions/63357651/bootstrap-vue-multi-level-drop-down
* https://jsfiddle.net/kKaczynski/hk0c4my9/24/
**/

import * as Debug from 'debug'
const debug = Debug('components:layout:navbar:list')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BDropdown, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'NavBarList',
  components: { BDropdown, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem },
  props: {
    list: {
      type: [Array],
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      isDropdownNestedVisible: false
    }
  },
  // computed: {
  //
  // },
  // updated: function () {
  //   debug('updated', this.$refs)
  //
  //   /**
  //   * remove 'nav-link' from menus with nested sub-menus
  //   **/
  //   for (let key in this.$refs) {
  //     if (/^.*\.nested$/.test(key)) {
  //       // let ref = this.$refs[key]
  //       this.$refs[key][0].$children[0].$el.classList.remove('nav-link')
  //       debug('updated', key, this.$refs[key][0].$children[0].$el.classList.value)
  //     }
  //   }
  // },
  mounted: function () {
    debug('mounted', this.$refs)

    /**
    * remove 'nav-link' from menus with nested sub-menus
    **/
    for (let key in this.$refs) {
      if (/^.*\.nested$/.test(key)) {
        // let ref = this.$refs[key]
        this.$refs[key][0].$children[0].$el.classList.remove('nav-link')
        debug('mounted', key, this.$refs[key][0].$children[0].$el.classList.value)
      }
    }

    this.$root.$on('bv::dropdown::show', bvEvent => {
      if (bvEvent.componentId === 'dropdown-nested') {
        this.isDropdownNestedVisible = true
      }
    })
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      if (bvEvent.componentId === 'dropdown-nested') {
        this.isDropdownNestedVisible = false
      }
      if (this.isDropdownNestedVisible) {
        bvEvent.preventDefault()
      }
    })
  },
  methods: {
    processColumns: function (item) {
      let columns = []
      if (isNaN(item.columns)) {
        columns = item.columns
      } else {
        let length = Math.ceil(item.list.length / item.columns)
        debug('processColumns length ', length)
        let column = 0
        for (let i = 0; i < item.list.length; i++) {
          let item_list = item.list[i]

          if (columns[column] && columns[column].length === length) {
            column++
          }

          if (!columns[column] || !Array.isArray(columns[column])) columns[column] = []

          columns[column].push(item_list)
        }
      }

      debug('processColumns', item, columns)
      return columns
    },
    processActive: function (item) {
      debug('processActive', item, this.$route)
      let list = item.list || (item.columns && item.columns.reduce(function (list, item) { if (!list || !Array.isArray(list)) list = []; list.concat(item); return list }))
      debug('processActive', list)
      if (item && list && list.length > 0) {
        let active = false
        for (let i = 0; i < list.length; i++) {
          let _item = list[i]
          active = this.processActive(_item)
          if (active === true) { i = list.length }
        }

        return active
      } else if (item && item.to && (item.to.path === this.$route.path || item.to.name === this.$route.name)) return true
      return false
    },

  }
}
</script>
