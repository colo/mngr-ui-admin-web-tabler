<template>
  <b-link :to="to" :class="(dark) ? 'text-white' : 'text-black'">
    <!-- class="card-link" -->
    <b-card tag="a" class="card-sm" body-class="d-flex align-items-center">
      <slot><span v-if="icon !== ''" class="mr-3" :class="iconClass" v-html="icon"></span></slot>

      <div class="mr-3 lh-sm">
        <div class="strong">{{title}}</div>
        <div class="text-muted">{{subtitle}}</div>
      </div>
      <div class="ml-auto">
        <slot name="right"></slot>
      </div>
    </b-card>
  </b-link>
</template>

<script>
import { BCard, BLink } from 'bootstrap-vue'

import { mapState } from 'vuex'

export default {
  name: 'TCardMini',
  components: { BCard, BLink },

  props: {
    title: {
      type: String,
      default: '132 Sales'
    },
    subtitle: {
      type: String,
      default: '12 waiting payments'
    },
    icon: {
      type: String,
      default: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>'
    },
    'icon-class': {
      type: String,
      default: 'bg-blue text-white stamp'
    },
    to: {
      type: Object,
      default: function () {
        return { path: '#' }
      }
    },

  },

  computed: {
    ...mapState({
      dark: state => state.layout.dark,
    }),
  }
}
</script>
