<template>
  <b-card body-class="text-center" footer-class="text-center card-btn" :footer-border-variant="(dark) ? 'dark' : 'white'">
    <div class="mb-3">
      <span v-if="processedAvatar" class="avatar avatar-xl avatar-rounded" :style="processedAvatar"></span>
      <span v-else class="avatar avatar-xl avatar-rounded">{{processedName}}</span>
    </div>
    <div class="card-title mb-1">{{name}}</div>
    <div class="text-muted">{{title}}</div>

    <!-- <footer class="text-center card-bt">
      <b-link :to="to">
        <div :style="{display: 'block'}">
        View full profile
        </div>
      </b-link>
    </footer> -->
    <template v-slot:footer>
      <b-link :to="to">
        <div>
        View full profile
        </div>
      </b-link>
    </template>
  </b-card>

</template>

<script>
import { BCard, BLink } from 'bootstrap-vue'

import { mapState } from 'vuex'

export default {
  name: 'TUserCard',
  components: { BCard, BLink },

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
    // actions: {
    //   type: Array,
    //   default: function () {
    //     return [
    //       {label: 'Chat', to: {path: '#'}, variant: 'white'},
    //       {label: 'Profile', to: {path: '#'}, variant: 'white'}
    //     ]
    //   }
    // },
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
    ...mapState({
      dark: state => state.layout.dark,
    }),
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
