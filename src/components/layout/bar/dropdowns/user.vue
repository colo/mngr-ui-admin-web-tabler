<template>

  <b-nav-item-dropdown  variant="link" toggle-class="text-decoration-none" no-caret right >
    <!-- Using 'button-content' slot -->
    <template v-slot:button-content>
      <!-- <a href="#" class="nav-link d-flex lh-1 text-reset p-0" size="lg"> -->
        <!-- <span class="avatar" style="background-image: url(./static/avatars/000m.jpg)"></span> -->
        <span v-if="processedAvatar" class="avatar avatar-md" :style="processedAvatar"></span>
        <span v-else class="avatar avatar-md">{{processedName}}</span>
        <div class="d-none d-xl-block pl-2">
          <div>{{name}}</div>
          <div class="mt-1 small text-muted">{{title}}</div>
        </div>
      <!-- </a> -->
    </template>

    <b-dropdown-item v-for="(action, index) in actions" :to="action.to" :key="index">

      <span v-if="action.icon" v-html="action.icon"></span>

      {{action.label}}
    </b-dropdown-item>
    <!-- v-html="processAction(action)" -->
    <!-- <b-dropdown-item>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
      Action
    </b-dropdown-item>
    <b-dropdown-item>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
      Another action
    </b-dropdown-item>
    <b-dropdown-divider />
    <b-dropdown-item>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
      Separated link
    </b-dropdown-item> -->
  </b-nav-item-dropdown>

</template>

<script>
import { BNavItem, BNavItemDropdown, BDropdownItem, BDropdownDivider, BLink } from 'bootstrap-vue'

export default {
  name: 'BarDropdownsUser',
  components: { BNavItem, BNavItemDropdown, BDropdownItem, BDropdownDivider, BLink },

  props: {
    name: {
      type: String,
      default: 'Paweł Kuna'
    },
    title: {
      type: String,
      default: 'UI Designer'
    },
    avatar: {
      type: [Object, String, Boolean],
      default: function () {
        return { 'background-image': 'url(./static/avatars/000m.jpg)' }
      }
    },
    // to: {
    //   type: Object,
    //   default: function () {
    //     return { path: '#' }
    //   }
    // },
    actions: {
      type: Array,
      default: function () {
        return [
          {
            icon: "<svg xmlns='http://www.w3.org/2000/svg' class='icon dropdown-item-icon' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z'/><path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' /><circle cx='12' cy='12' r='3' /></svg>",
            label: 'Action',
            to: {path: '#'}
          }, // label: 'Chat'

          {
            icon: "<svg xmlns='http://www.w3.org/2000/svg' class='icon dropdown-item-icon' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z'/><path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' /><path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' /><line x1='16' y1='5' x2='19' y2='8' /></svg>",
            label: 'Another action',
            to: {path: '#'}
          }
        ]
      }
    },
    // status: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       label: 'offline',
    //       class: undefined
    //     }
    //   }
    // },
    // progress: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       title: 'Progress',
    //       label: undefined,
    //       class: 'bg-blue',
    //       value: 50,
    //       max: 100,
    //     }
    //   }
    // }

  },

  data () {
    return {

    }
  },
  // methods: {
  //   processAction: function (action) {
  //     return '<b-link :to="action.to" class="dropdown-item" role="menuitem" target="_self">' + action.label + '</b-link>'
  //   },
  // },
  computed: {
    processedAvatar: function () {
      if (typeof this.avatar === 'string') {
        return { 'background-image': 'url(' + this.avatar + ')' }
      } else if (this.avatar === null || this.avatar === false || this.avatar === undefined) {
        return false
      } else {
        return this.avatar
      }
    },
    processedName: function () {
      let name = ''
      if (this.name && this.name !== null && this.name !== undefined) {
        let arr = this.name.split(' ')
        for (let i = 0; i < arr.length; i++) {
          name += arr[i].charAt(0).toUpperCase()
        }
      }

      return name
    },
    // statusClass: function () {
    //   if (this.status && !this.status.class) {
    //     if (this.status.label.toLowerCase() === 'online') return 'bg-green-lt'
    //     return 'bg-gray-lt'
    //   } else {
    //     return this.status.class
    //   }
    // },
    // progressLabel: function () {
    //   if (this.progress && !this.progress.label) return this.progress.value + '%'
    //   return this.progress.label
    // },
  }
}
</script>
