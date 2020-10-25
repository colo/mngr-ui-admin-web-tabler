<template>
  <b-card>
    <!-- <div class="row row-sm align-items-center"> -->
    <b-row align-h="center">
      <!-- <div class="col-auto"> -->
      <b-col class="col-auto">
        <span v-if="processedAvatar" class="avatar avatar-md" :style="processedAvatar"></span>
        <span v-else class="avatar avatar-md">{{processedName}}</span>
      <!-- </div> -->
      </b-col>
      <b-col>
        <h3 class="mb-0"><b-link :to="to">{{name}}</b-link></h3>
        <div class="text-muted text-h5">{{title}}</div>
      </b-col>
      <b-col class="col-auto lh-1" align-self="start">
      <!-- <div class="col-auto lh-1 align-self-start"> -->
        <span class="badge" :class="statusClass">
          {{status.label}}
        </span>
      <!-- </div> -->
      </b-col>
    </b-row>

    <!-- <div class="row align-items-center mt-4"> -->
    <b-row align-h="center" align-v="center" class="mt-4">
      <b-col>
        <div>
          <div class="d-flex mb-1 align-items-center lh-1">
            <div class="text-h5 font-weight-bolder m-0">{{progress.title}}</div>
            <span class="ml-auto text-h6 strong">{{progressLabel}}</span>
          </div>
          <b-progress size="sm" :max="progress.max" height="4px">
            <b-progress-bar :value="progress.value" :class="progress.class"></b-progress-bar>
          </b-progress>
        </div>
      </b-col>
      <b-col class="col-auto">
        <div class="btn-list">
          <b-button v-for="(action, index) in actions" :variant="action.variant || 'white'" size="sm" :to="action.to" :key="index">{{action.label}}</b-button>
        </div>
      </b-col>
    </b-row>

    <!-- </div> -->

  </b-card>
</template>

<script>
import { BCard, BProgress, BProgressBar, BButton, BLink, BRow, BCol } from 'bootstrap-vue'

export default {
  name: 'TUserCardProgress',
  components: { BCard, BProgress, BProgressBar, BButton, BLink, BRow, BCol },

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
    actions: {
      type: Array,
      default: function () {
        return [
          {label: 'Chat', to: {path: '#'}, variant: 'white'},
          {label: 'Profile', to: {path: '#'}, variant: 'white'}
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
    progress: {
      type: Object,
      default: function () {
        return {
          title: 'Progress',
          label: undefined,
          class: 'bg-blue',
          value: 50,
          max: 100,
        }
      }
    }

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
        if (this.status.label.toLowerCase() === 'online') return 'bg-green-lt'
        return 'bg-gray-lt'
      } else {
        return this.status.class
      }
    },
    progressLabel: function () {
      if (this.progress && !this.progress.label) return this.progress.value + '%'
      return this.progress.label
    },
  }
}
</script>
