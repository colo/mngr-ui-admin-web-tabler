<template>

  <div :class="searchClass" id="navbar-menu">
    <div>
      <form action="." method="get">
        <div class="input-icon">
          <span class="input-icon-addon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15" y2="15" /></svg>
          </span>
          <input type="text" class="form-control" placeholder="Search…">
        </div>
      </form>
    </div>
  </div>

  <!-- <div class="">
                  <form action="." method="get">
                    <div class="input-icon">
                      <span class="input-icon-addon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15" y2="15" /></svg>
                      </span>
                      <input type="text" class="form-control" placeholder="Search…">
                    </div>
                  </form>
                </div> -->
</template>

<script>
export default {
  name: 'BarSearch',
  props: {
    // // title: {
    // //   type: String,
    // //   required: true
    // // },
    // //
    // // right: {
    // //   type: Boolean,
    // //   default: false
    // // },
    // //
    navbar: {
      type: Boolean,
      default: false
    },
    condensed: {
      type: Boolean,
      default: false
    },
    // // combined: {
    // //   type: Boolean,
    // //   default: false
    // // },
    // dark: {
    //   type: Boolean,
    //   default: false
    // }
  },
  computed: {
    searchClass: function () {
      let appendClass = ''
      appendClass += (this.navbar === false) ? 'collapse navbar-collapse ' : (this.condensed) ? 'ml-md-auto pl-md-4 py-2 py-md-0 mr-md-4 order-first order-md-last flex-grow-1 flex-md-grow-0 ' : 'my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last '

      return appendClass
    }
    // logo: function () {
    //   return (this.dark === true) ? 'logo-white.svg' : 'logo.svg'
    // }
  }
}
</script>
