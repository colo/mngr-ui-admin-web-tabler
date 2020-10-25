<template>
  <!-- <div class="card">
    <div class="card-body">
      <div class="row row-sm align-items-center">
        <div class="col-auto">
          <span class="avatar avatar-lg" style="background-image: url(./static/avatars/000m.jpg)"></span>
        </div>
        <div class="col">
          <h4 class="card-title m-0">
            <a href="#">Paweł Kuna</a>
          </h4>
          <div class="text-muted">
            Working in Yombu
          </div>
          <div class="small mt-1">
            <span class="text-success">●</span> Online
          </div>
        </div>
        <div class="col-auto">
          <a href="#" class="btn btn-sm btn-white d-none d-md-inline-block">
            Subscribe
          </a>
        </div>
        <div class="col-auto">
          <b-dropdown  size="sm" variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
            <template v-slot:button-content>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="12" cy="5" r="1" /></svg>
            </template>

            <b-dropdown-item>
              Action
            </b-dropdown-item>
            <b-dropdown-item>
              Another action
            </b-dropdown-item>

          </b-dropdown>
        </div>
      </div>
    </div>
  </div> -->

  <b-card>
    <b-row align-h="center" align-v="center" class="row-sm">
      <b-col class="col-auto">
        <span v-if="processedAvatar" class="avatar avatar-lg" :style="processedAvatar"></span>
        <span v-else class="avatar avatar-lg">{{processedName}}</span>
      </b-col>
      <b-col>
        <h4 class="card-title m-0">
          <b-link :to="to">{{name}}</b-link>
        </h4>
        <div class="text-muted">
          {{title}}
        </div>
        <div class="small mt-1">
          <span :class="statusClass">●</span> {{status.label}}
        </div>
      </b-col>
      <b-col class="col-auto">
        <b-button v-if="action" :variant="action.variant || 'white'" size="sm" :to="action.to" class="d-none d-md-inline-block">{{action.label}}</b-button>
      </b-col>
      <b-col class="col-auto">
        <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
          <template v-slot:button-content>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="12" cy="5" r="1" /></svg>
          </template>

          <b-dropdown-item v-for="(item, index) in menu" :to="item.to" :key="index">
            <span v-if="item.icon" class="d-md-none d-lg-inline-block" v-html="item.icon"></span>
            {{item.label}}
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import { BCard, BButton, BLink, BRow, BCol, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'TUserCardStatus',
  components: { BCard, BButton, BLink, BRow, BCol, BDropdown, BDropdownItem },

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
    to: {
      type: Object,
      default: function () {
        return { path: '#' }
      }
    },
    action: {
      type: Object,
      default: function () {
        return {label: 'Suscribe', to: {path: '#'}, variant: 'white'}
      }
    },
    menu: {
      type: Array,
      default: function () {
        return [
          {label: 'Action', to: {path: '#'}, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" /><line x1="12" y1="12" x2="20" y2="7.5" /><line x1="12" y1="12" x2="12" y2="21" /><line x1="12" y1="12" x2="4" y2="7.5" /><line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>'},
          {label: 'Another Action', to: {path: '#'}, icon: undefined}
        ]
      }
    },
    status: {
      type: Object,
      default: function () {
        return {
          label: 'offline',
          class: undefined
        }
      }
    },

  },
  // data () {
  //   return {
  //     default_progress: {
  //       title: 'Progress',
  //       label: undefined,
  //       class: 'bg-blue',
  //       value: 50,
  //       max: 100,
  //     }
  //   }
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
      let arr = this.name.split(' ')
      for (let i = 0; i < arr.length; i++) {
        name += arr[i].charAt(0).toUpperCase()
      }

      return name
    },
    statusClass: function () {
      if (this.status && !this.status.class) {
        if (this.status.label.toLowerCase() === 'online') return 'text-success'
        return 'text-secondary'
      } else {
        return this.status.class
      }
    },
    // progressLabel: function () {
    //   if (this.progress && !this.progress.label) return this.progress.value + '%'
    //   return this.progress.label
    // },
  }
}
</script>
