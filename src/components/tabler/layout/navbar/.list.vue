<template>
  <ul class="navbar-nav" :class="ulClass">
    <li class="nav-item">
      <a class="nav-link" href="./index.html" >
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
        </span>
        <span class="nav-link-title">
          Home
        </span>
      </a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" v-b-toggle href="#dropdown-interface" role="button" aria-expanded="false" @click.prevent>
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" /><line x1="12" y1="12" x2="20" y2="7.5" /><line x1="12" y1="12" x2="12" y2="21" /><line x1="12" y1="12" x2="4" y2="7.5" /><line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>
        </span>
        <span class="nav-link-title">
          Interface
        </span>
      </a>
      <b-collapse id="dropdown-interface" accordion="navbar" >
        <b-list-group flush tag="ul" :class="'dropdown-menu'">
          <b-list-group-item tag="li">
            <a class="dropdown-item" href="./empty.html" >
            Empty page
            </a>
          </b-list-group-item>
          <b-list-group-item tag="li">
            <a class="dropdown-item" href="./blank.html" >
            Blank page
            </a>
          </b-list-group-item>
        </b-list-group>
        <!-- <div>
          <ul class="dropdown-menu">
            <li >
              <a class="dropdown-item" href="./invoice.html" >
                Invoice
              </a>
            </li>
            <li >
              <a class="dropdown-item" href="./blog.html" >
                Blog cards
              </a>
            </li>
          </ul>
        </div> -->
      </b-collapse>

    </li>
    <li class="nav-item">
      <a class="nav-link" href="./form-elements.html" >
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 11 12 14 20 6" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
        </span>
        <span class="nav-link-title">
          Forms
        </span>
      </a>
    </li>
    <!-- <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#navbar-extra" data-toggle="dropdown" role="button" aria-expanded="false" >
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" /></svg>
        </span>
        <span class="nav-link-title">
          Extra
        </span>
      </a>
      <ul class="dropdown-menu">
        <li >
          <a class="dropdown-item" href="./invoice.html" >
            Invoice
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./blog.html" >
            Blog cards
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./snippets.html" >
            Snippets
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./search-results.html" >
            Search results
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./pricing.html" >
            Pricing cards
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./users.html" >
            Users
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./gallery.html" >
            Gallery
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./profile.html" >
            Profile
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./music.html" >
            Music
          </a>
        </li>
      </ul>
    </li> -->
    <li class="nav-item active dropdown">
      <a class="nav-link dropdown-toggle" v-b-toggle href="#dropdown-layout" role="button" @click.prevent >
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="6" height="5" rx="2" /><rect x="4" y="13" width="6" height="7" rx="2" /><rect x="14" y="4" width="6" height="7" rx="2" /><rect x="14" y="15" width="6" height="5" rx="2" /></svg>
        </span>
        <span class="nav-link-title">
          Layout
        </span>
      </a>
      <b-collapse id="dropdown-layout" visible accordion="navbar" >
        <b-list-group flush tag="ul" :class="'dropdown-menu'">
          <b-list-group-item tag="li">
            <a class="dropdown-item" href="./layout-horizontal.html" >
            Horizontal
            </a>
          </b-list-group-item>
          <b-list-group-item tag="li" >
            <a class="dropdown-item active" href="./layout-vertical.html" >
            Vertical
            </a>
          </b-list-group-item>
        </b-list-group>
      </b-collapse>
      <!-- <ul class="dropdown-menu show">
        <li >
          <a class="dropdown-item" href="./layout-horizontal.html" >
            Horizontal
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-vertical.html" >
            Vertical
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-vertical-right.html" >
            Right vertical
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-condensed.html" >
            Condensed
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-condensed-dark.html" >
            Condensed dark
          </a>
        </li>
        <li >
          <a class="dropdown-item active" href="./layout-combo.html" >
            Combined
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-navbar-dark.html" >
            Navbar dark
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-dark.html" >
            Dark mode
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-fluid.html" >
            Fluid
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./layout-fluid-vertical.html" >
            Fluid vertical
          </a>
        </li>
      </ul> -->
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#navbar-docs" data-toggle="dropdown" role="button" aria-expanded="false" >
        <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="14 3 14 8 19 8" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><line x1="9" y1="9" x2="10" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
        </span>
        <span class="nav-link-title">
          Docs
        </span>
      </a>
      <ul class="dropdown-menu dropdown-menu-columns  dropdown-menu-columns-3">
        <li >
          <a class="dropdown-item" href="./docs/index.html" >
            Introduction
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/alerts.html" >
            Alerts
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/autosize.html" >
            Autosize
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/avatars.html" >
            Avatars
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/badges.html" >
            Badges
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/breadcrumb.html" >
            Breadcrumb
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/buttons.html" >
            Buttons
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/cards.html" >
            Cards
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/carousel.html" >
            Carousel
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/colors.html" >
            Colors
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/countup.html" >
            Countup
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/cursors.html" >
            Cursors
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/charts.html" >
            Charts
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/dropdowns.html" >
            Dropdowns
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/divider.html" >
            Divider
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/empty.html" >
            Empty states
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/flags.html" >
            Flags
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/form-elements.html" >
            Form elements
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/form-helpers.html" >
            Form helpers
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/input-mask.html" >
            Form input mask
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/modals.html" >
            Modals
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/progress.html" >
            Progress
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/payments.html" >
            Payments
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/range-slider.html" >
            Range slider
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/ribbons.html" >
            Ribbons
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/spinners.html" >
            Spinners
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/steps.html" >
            Steps
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/tables.html" >
            Tables
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/tabs.html" >
            Tabs
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/timelines.html" >
            Timelines
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/toasts.html" >
            Toasts
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/tooltips.html" >
            Tooltips
          </a>
        </li>
        <li >
          <a class="dropdown-item" href="./docs/typography.html" >
            Typography
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavBarList',
  props: {
    // // // title: {
    // // //   type: String,
    // // //   required: true
    // // // },
    // // //
    // // // right: {
    // // //   type: Boolean,
    // // //   default: false
    // // // },
    // // //
    vertical: {
      type: Boolean,
      default: true
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
    ulClass: function () {
      let appendClass = ''
      appendClass += (this.vertical === true) ? 'pt-lg-3 ' : ''

      return appendClass
    },

  }
}
</script>
