<template>

  <b-nav-item-dropdown  variant="link" toggle-class="text-decoration-none" no-caret right>
    <!-- class="d-none d-md-flex mr-1" -->
    <!-- Using 'button-content' slot -->
    <template v-slot:button-content>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg> -->
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="6" height="5" rx="2" /><rect x="4" y="13" width="6" height="7" rx="2" /><rect x="14" y="4" width="6" height="7" rx="2" /><rect x="14" y="15" width="6" height="5" rx="2" /></svg>
      <!-- Action -->
    </template>

    <b-dropdown-form>

      <b-form-group>
        <!-- <b-form-checkbox-group
          plain
          stacked
        > -->
            <b-form-checkbox plain class="form-switch" v-model="dark">Dark Mode</b-form-checkbox>
            <b-form-checkbox :disabled="disabledNavBar" v-model="darkNavbar" plain class="form-switch">Dark Nav Bar</b-form-checkbox>
            <b-form-checkbox :disabled="disabledTopBar" v-model="darkTopbar" plain class="form-switch">Dark Top Bar</b-form-checkbox>
        <!-- </b-form-checkbox-group> -->
      </b-form-group>

    </b-dropdown-form>

    <b-dropdown-divider />
    <b-dropdown-form>
      <div class="form-label">Layout</div>
      <b-form-group>
        <!-- <b-form-checkbox-group
          plain
          stacked
        > -->
          <b-form-radio v-model="mode" name="VerticalLayout" value="VerticalLayout" plain>Vertical</b-form-radio>
          <b-form-radio v-model="mode" name="HorizontalLayout" value="HorizontalLayout" plain>Horizontal</b-form-radio>
          <b-form-checkbox class="form-switch" v-model="fluid" plain>Fluid</b-form-checkbox>
          <b-form-checkbox v-if="mode === 'HorizontalLayout'" class="form-switch" v-model="condensed" plain>Condensed</b-form-checkbox>
        <!-- </b-form-checkbox-group> -->
      </b-form-group>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="icon dropdown-item-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> -->
      <!-- <div class="mb-3">
        <div class="form-label">Layout</div>
        <div>
          <label class="form-check form-check-inline">
            <input class="form-check-input" type="radio" checked>
            <span class="form-check-label">Vertical</span>
          </label>
          <label class="form-check form-check-inline">
            <input class="form-check-input" type="radio">
            <span class="form-check-label">Horizontal</span>
          </label>
          <label class="form-check">
            <input class="form-check-input" type="checkbox" checked>
            <span class="form-check-label">Fluid</span>
          </label>
        </div>
      </div> -->
    </b-dropdown-form>

    <!-- <b-dropdown-divider />

    <b-dropdown-form>

      <div class="mb-3">
        <div class="form-label">Dashboard Color Scheme</div>
        <b-button v-b-toggle.collapse-1 tag="div" variant="white">
          Default
        </b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-button v-b-toggle.collapse-1 tag="div" variant="outline-light">
            <b-card>
              <p class="card-text">Collapse contents Here</p>
            </b-card>
          </b-button>
        </b-collapse>
      </div>

    </b-dropdown-form> -->
  </b-nav-item-dropdown>

</template>

<script>
import { mapActions } from 'vuex'

import { BNavItemDropdown, BDropdownForm, BDropdownDivider, BFormGroup, BFormCheckbox, BFormRadio } from 'bootstrap-vue'

export default {
  name: 'BarDropdownsSettings',
  components: { BNavItemDropdown, BDropdownForm, BDropdownDivider, BFormGroup, BFormCheckbox, BFormRadio },
  // props: {
  //   vertical: {
  //     type: Boolean,
  //     default: false,
  //   }
  // },
  data () {
    return {
      lightColors: [],
      darkColors: [],

      selected: 'E', // Must be an array reference!

    }
  },
  computed: {
    darkNavbar: {
      get () {
        // console.log(this.$store.state.layout.fluid)
        let mode = this.$store.state.layout.mode
        return this.$store.state.layout[mode].navbar.dark
      },
      set (value) {
        let mode = this.$store.state.layout.mode
        let layout = JSON.parse(JSON.stringify(this.$store.state.layout[mode]))// create a copy to avoid "Error: [vuex] do not mutate vuex store state outside mutation handlers."
        layout.navbar.dark = value
        let payload = {}
        payload[mode] = layout
        this.$store.dispatch('layout/set' + mode, payload)
      }
    },
    darkTopbar: {
      get () {
        // console.log(this.$store.state.layout.fluid)
        let mode = this.$store.state.layout.mode
        return this.$store.state.layout[mode].topbar.dark
      },
      set (value) {
        let mode = this.$store.state.layout.mode
        let layout = JSON.parse(JSON.stringify(this.$store.state.layout[mode]))// create a copy to avoid "Error: [vuex] do not mutate vuex store state outside mutation handlers."
        layout.topbar.dark = value
        let payload = {}
        payload[mode] = layout
        this.$store.dispatch('layout/set' + mode, payload)
      }
    },
    condensed: {
      get () {
        return this.$store.state.layout.HorizontalLayout.condensed
      },
      set (value) {
        let layout = JSON.parse(JSON.stringify(this.$store.state.layout.HorizontalLayout))// create a copy to avoid "Error: [vuex] do not mutate vuex store state outside mutation handlers."
        layout.condensed = value
        let payload = {}
        payload.HorizontalLayout = layout
        this.$store.dispatch('layout/setHorizontalLayout', payload)
      }
    },
    disabledNavBar: function () {
      return this.dark
    },
    disabledTopBar: function () {
      return this.dark
    },
    dark: {
      get () {
        return this.$store.state.layout.dark
      },
      set (value) {
        this.setDark({ dark: value })
      }
    },
    mode: {
      get () {
        return this.$store.state.layout.mode
      },
      set (value) {
        this.setMode({ mode: value })
      }
    },
    fluid: {
      get () {
        return this.$store.state.layout.fluid
      },
      set (value) {
        this.setFluid({ fluid: value })
      }
    },
    // menuAutoExpand: {
    //   get () {
    //     return this.$store.state.layout.menuAutoExpand
    //   },
    //   set (value) {
    //     this.setMenuAutoExpand({ menuAutoExpand: value })
    //   }
    // },
    // menuMini: {
    //   get () {
    //     return this.$store.state.layout.menuMini
    //   },
    //   set (value) {
    //     this.setMenuMini({ menuMini: value })
    //   }
    // },
    // dashboardColorScheme: {
    //   get () {
    //     return this.$store.state.layout.dashboardColorScheme
    //   },
    //   set (value) {
    //     this.setDashboardColorScheme({ dashboardColorScheme: value })
    //   }
    // }
  },
  // methods: {
  //   setDark: function (val) {
  //     // val = JSON.parse(JSON.stringify(val))
  //     // this.$refs['navbar'].disabled = true
  //     this.disabledNavBar = val
  //     this.disabledTopBar = val
  //     // console.log(val)
  //   }
  // },
  methods: {
    ...mapActions({
      setDark: 'layout/setDark',
      setMode: 'layout/setMode',
      setFluid: 'layout/setFluid',
      // setMenuAutoExpand: 'layout/setMenuAutoExpand',
      // setMenuMini: 'layout/setMenuMini',
      // setDashboardColorScheme: 'layout/setDashboardColorScheme'
    }),
    // initColors () {
    //   let colorScheme = dbColors.getColorScheme(this.dashboardColorScheme)
    //   this.lightColors = colorScheme.light.slice(0, 5)
    //   this.darkColors = colorScheme.dark.slice(0, 5)
    // },
    // onClose () {
    //   this.$emit('close')
    // }
  },

}
</script>
