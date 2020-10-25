<template>
  <!-- <a class="card card-link" href="#">
    <div class="card-cover text-center" style="background-image: url(./static/photos/2854fd67ddbd6217.jpg
)">
      <span class="avatar avatar-xl avatar-thumb" style="background-image: url(./static/avatars/012f.jpg)"></span>
    </div>
    <div class="card-body text-center">
      <div class="card-title mb-1">Marsha Labat</div>
      <div class="text-muted">Research Associate</div>
    </div>
  </a> -->
  <b-link :to="to" class="card-link">
    <b-card tag="a" no-body>
      <div v-if="processedCover" class="card-cover text-center" :style="processedCover">
        <span v-if="processedAvatar" class="avatar avatar-xl avatar-thumb" :style="processedAvatar"></span>
        <span v-else class="avatar avatar-xl avatar-thumb">{{processedName}}</span>
      </div>
      <div class="card-body text-center">
        <div class="card-title mb-1">{{name}}</div>
        <div class="text-muted">{{title}}</div>
      </div>

    </b-card>
  </b-link>
</template>

<script>
import { BCard, BLink } from 'bootstrap-vue'

export default {
  name: 'TUserCardCover',
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
    cover: {
      type: [Object, String, Boolean],
      default: function () {
        return { 'background-image': 'url(./static/photos/2854fd67ddbd6217.jpg)' }
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
    processedCover: function () {
      if (typeof this.cover === 'string') {
        return { 'background-image': 'url(' + this.cover + ')' }
      } else if (this.cover === null || this.cover === false || this.cover === undefined) {
        return false
      } else {
        return this.cover
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
