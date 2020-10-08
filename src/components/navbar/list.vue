<template>
  <b-navbar-nav >
    <!-- for vertical class="pt-lg-3" -->
    <b-nav-item :to="{name: 'index'}">
      <!-- <a class="nav-link" href="./index.html" > -->
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
        </span>
        <span class="nav-link-title">
          Home
        </span>
      <!-- </a> -->
    </b-nav-item>

    <b-nav-item-dropdown menu-class="dropdown-menu-columns dropdown-menu-columns-2">
      <!-- Using 'button-content' slot -->
      <template v-slot:button-content>
        <!-- <a class="nav-link dropdown-toggle" href="#navbar-base" data-toggle="dropdown" role="button" aria-expanded="false" > -->
          <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" /><line x1="12" y1="12" x2="20" y2="7.5" /><line x1="12" y1="12" x2="12" y2="21" /><line x1="12" y1="12" x2="4" y2="7.5" /><line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>
          </span>
          <!-- <span class="nav-link-title"> -->
            User Interface
          <!-- </span> -->
        <!-- </a> -->
      </template>
      <b-dropdown-item :to="{name: 'empty'}">
        <!-- <span class="nav-link-title"> -->
          Empty page
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'blank'}">
        <!-- <span class="nav-link-title"> -->
          Blank page
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'buttons'}">
        <!-- <span class="nav-link-title"> -->
          Buttons
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'cards'}">
        <!-- <span class="nav-link-title"> -->
          Cards
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'dropdowns'}">
        <!-- <span class="nav-link-title"> -->
          Dropdowns
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'icons'}">
        <!-- <span class="nav-link-title"> -->
          Icons
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'modals'}">
        <!-- <span class="nav-link-title"> -->
          Modals
        <!-- </span> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'tables'}">
          Tables
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'calendar'}">
          Calendar
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'carousel'}">
          Carousel
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'lists'}">
          Lists
      </b-dropdown-item>
    </b-nav-item-dropdown>

    <b-nav-item :to="{name: 'form-elements'}">
      <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 11 12 14 20 6" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
      </span>
      <span class="nav-link-title">
        Form elements
      </span>
    </b-nav-item>

    <b-nav-item-dropdown>
      <!-- menu-class="dropdown-menu-columns dropdown-menu-columns-2" -->
      <template v-slot:button-content>
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" /></svg>
        </span>
          Extra
      </template>
      <b-dropdown-item :to="{name: 'invoice'}">
          Invoice
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'blog'}">
          Blog cards
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'snippets'}">
          Snippets
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'search'}">
          Search results
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'pricing'}">
          Pricing cards
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'users'}">
          Users
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'gallery'}">
          Gallery
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'profile'}">
          Profile
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'music'}">
          Music
      </b-dropdown-item>

      <b-dropdown-item :to="{name: 'welcome'}">
          Welcome
      </b-dropdown-item>
    </b-nav-item-dropdown>

  </b-navbar-nav>

</template>

<script>
export default {
  name: 'NavBarList',
  // props: {
  //   // // // title: {
  //   // // //   type: String,
  //   // // //   required: true
  //   // // // },
  //   // // //
  //   // // // right: {
  //   // // //   type: Boolean,
  //   // // //   default: false
  //   // // // },
  //   // // //
  //   vertical: {
  //     type: Boolean,
  //     default: true
  //   },
  //   // // combined: {
  //   // //   type: Boolean,
  //   // //   default: false
  //   // // },
  //   // dark: {
  //   //   type: Boolean,
  //   //   default: false
  //   // }
  // },
  // computed: {
  //   ulClass: function () {
  //     let appendClass = ''
  //     appendClass += (this.vertical === true) ? 'pt-lg-3 ' : ''
  //
  //     return appendClass
  //   },
  //
  // }
}
</script>
