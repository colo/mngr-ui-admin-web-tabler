<script>
import Vue from 'vue'

import { mapActions, mapState } from 'vuex'

import TopBar from 'components/TopBar'

export default Vue.extend({
  name: 'MainLayout',
  components: {
    TopBar
  },
  data () {
    return {
    }
  },
  props: {
    // topbar: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       available: true,
    //       combined: true,
    //       dark: false
    //     }
    //   }
    // },
    // navbar: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       available: true,
    //       right: false,
    //       dark: true
    //     }
    //   }
    // },
    // fluid: {
    //   type: Boolean,
    //   default: false
    // }
    // background: {
    //   type: String,
    //   default: '' // #7952b3
    // }
  },
  computed: {
    darkTopBar: function () {
      return this.dark || this.topbar.dark
    },
    darkNavBar: function () {
      return this.dark || this.navbar.dark
    },
    ...mapState({
      // menuAutoExpand: state => state.layout.menuAutoExpand
      dark: state => state.layout.dark,
      fluid: state => state.layout.fluid,
      mode: state => state.layout.mode,
    }),
    topbarContainerStyle: function () {
      let appendStyle = {}

      if (this.topbar.background !== '') appendStyle.background = this.topbar.background

      return appendStyle
    },
    navbarContainerStyle: function () {
      let appendStyle = {}

      if (this.navbar.background !== '') appendStyle.background = this.navbar.background

      return appendStyle
    },
    // dark: {
    //   get () {
    //     return this.$store.state.layout.dark
    //   },
    //   set (value) {
    //     this.setDark({ dark: value })
    //   }
    // }
  },
  methods: {
    // ...mapActions({
    //   setDark: 'layout/setDark',
    //   // setMenuMini: 'layout/setMenuMini'
    // }),
    // https://forum.vuejs.org/t/how-do-i-add-remove-classes-to-body/1219/12
    toggleBodyClass: function (addRemoveClass, className) {
      const el = document.body

      if (addRemoveClass === 'addClass') {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    },
    toggleBodyStyle: function (prop, value) {
      const el = document.body

      el.style[prop] = value
    }
  },
  watch: {
    dark: {
      handler: function (val) {
        // this.$q.dark.set(val)
        if (val === true) {
          this.toggleBodyClass('addClass', 'theme-dark')
        } else {
          this.toggleBodyClass('removeClass', 'theme-dark')
        }
      }
    }
  },
  mounted: function () {
    if (this.dark === true) {
      this.toggleBodyClass('addClass', 'theme-dark')
    } else {
      this.toggleBodyClass('removeClass', 'theme-dark')
    }
    this.toggleBodyClass('addClass', 'antialiased')
    this.toggleBodyStyle('display', 'block')
    // this.$q.dark.set(this.dark)
  },
  beforeDestroy: function () {
    this.toggleBodyClass('removeClass', 'theme-dark')
    this.toggleBodyClass('removeClass', 'antialiased')
    // this.toggleBodyStyle('display', 'block')
    // this.$q.dark.set(this.dark)
  }
})
</script>
