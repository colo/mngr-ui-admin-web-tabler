<template>

  <b-nav-item-dropdown  variant="link" toggle-class="text-decoration-none" no-caret right class="d-none d-md-flex mr-1">
    <!-- Using 'button-content' slot -->
    <template v-slot:button-content>
      <!-- <a href="#" class="nav-link px-0" tabindex="-1"> -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
        <span class="badge bg-red"></span>
      <!-- </a> -->
    </template>
    <b-dropdown-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet consectetur exercitationem fugiat in ipsa ipsum, natus odio quidem quod repudiandae sapiente. Amet debitis et magni maxime necessitatibus ullam.</b-dropdown-text>
  </b-nav-item-dropdown>

</template>

<script>
import { BNavItemDropdown, BDropdownText } from 'bootstrap-vue'

export default {
  name: 'BarDropdownsAlerts',
  components: { BNavItemDropdown, BDropdownText },
  // props: {
  //   vertical: {
  //     type: Boolean,
  //     default: false,
  //   }
  // },
  data () {
    return {

    }
  },
  computed: {

  }
}
</script>
