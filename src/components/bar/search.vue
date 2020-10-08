<template>
  <div class="input-icon">
    <span class="input-icon-addon">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15" y2="15" /></svg>
    </span>
    <b-form-input type="text" :class="searchClass" placeholder="Search…"></b-form-input>
  </div>
</template>

<script>
export default {
  name: 'BarSearch',
  props: {
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    searchClass: function () {
      let appendClass = ''
      appendClass += (this.rounded === true) ? 'form-control-rounded' : ''

      return appendClass
    }
    // logo: function () {
    //   return (this.dark === true) ? 'logo-white.svg' : 'logo.svg'
    // }
  }
}
</script>
