<template>
  <!-- <div class="card d-flex flex-column">
    <div class="row row-0 flex-fill">
      <div class="col-md-3">
        <a href="#">
          <img src="../static/photos//9f36332564ca271d.jpg" class="w-100 h-100 object-cover" alt="Card side image">
        </a>
      </div>
      <div class="col">
        <div class="card-body">
          <h3 class="card-title"><a href="#">And this isn't my nose. This is a false one.</a></h3>
          <div class="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr...</div>
          <div class="d-flex align-items-center pt-5 mt-auto">
            <span class="avatar avatar-md" style="background-image: url(../static/avatars/002m.jpg)"></span>
            <div class="ml-3">
              <a href="./profile.html" class="text-body">Dunn Slane</a>
              <small class="d-block text-muted">3 days ago</small>
            </div>
            <div class="ml-auto">
              <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <b-card
    class="d-flex flex-column"
    no-body
  >
    <b-row no-gutters>
      <b-col :md="3">
        <b-link :to="to">
          <b-card-img :src="cardOptions['img-src']" :alt="cardOptions['img-src']" class="w-100 h-100 object-cover"></b-card-img>
        </b-link>
      </b-col>

      <b-col>
        <div class="card-body">
          <h3 class="card-title">
            <b-link :to="to">
              {{title}}
            </b-link>
          </h3>
          <b-card-text class="text-muted">{{body}}</b-card-text>
          <div class="d-flex align-items-center pt-5 mt-auto">
            <span v-if="processedAvatar" class="avatar avatar-md" :style="processedAvatar"></span>
            <span v-else class="avatar avatar-md">{{processedAuthor}}</span>
            <div class="ml-3">
              <b-link :to="authorTo" class="text-body">
                {{author}}
              </b-link>
              <small class="d-block text-muted">{{date}}</small>
            </div>
            <div class="ml-auto">
              <b-link :to="actionTo" :class="actionClass" v-html="actionIcon">
              </b-link>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BCard, BCardText, BLink, BCardImg, BRow, BCol } from 'bootstrap-vue'

export default {
  name: 'THorizontalBlogCard',
  components: { BCard, BCardText, BLink, BCardImg, BRow, BCol },

  props: {
    'card-options': {
      type: Object,
      default: function () {
        return {
          'img-src': '../static/photos/9f36332564ca271d.jpg',
          'img-alt': 'And this isn&#39;t my nose. This is a false one.',
          'img-top': true,
          'tag': 'article'
        }
      }
    },

    author: {
      type: String,
      default: 'Dunn Slane'
    },

    'author-to': {
      type: Object,
      default: function () {
        return { name: 'profile' }
      }
    },
    date: {
      type: String,
      default: '3 days ago'
    },
    body: {
      type: String,
      default: 'Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr...'
    },
    title: {
      type: String,
      default: 'And this isn\'t my nose. This is a false one.'
    },

    'author-avatar': {
      type: [Object, String, Boolean],
      default: function () {
        return { 'background-image': 'url(../static/avatars/002m.jpg)' }
      }
    },
    to: {
      type: Object,
      default: function () {
        return { path: '#' }
      }
    },
    'action-to': {
      type: Object,
      default: function () {
        return { path: '#' }
      }
    },
    'action-icon': {
      type: String,
      default: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>'
    },
    'action-class': {
      type: String,
      default: 'icon d-none d-md-inline-block ml-3 text-red'
    }
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
      if (typeof this.authorAvatar === 'string') {
        return { 'background-image': 'url(' + this.authorAvatar + ')' }
      } else if (this.authorAvatar === null || this.authorAvatar === false || this.authorAvatar === undefined) {
        return false
      } else {
        return this.authorAvatar
      }
    },
    processedAuthor: function () {
      let author = ''
      let arr = this.author.split(' ')
      for (let i = 0; i < arr.length; i++) {
        author += arr[i].charAt(0).toUpperCase()
      }

      return author
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
