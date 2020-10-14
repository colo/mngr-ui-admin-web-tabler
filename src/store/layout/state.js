import { LocalStorage, SessionStorage } from 'quasar'

const navBarList = [
  {
    label: 'Home',
    to: {name: 'index'},
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>',
  },
  // {
  //   label: 'User Interface',
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" /><line x1="12" y1="12" x2="20" y2="7.5" /><line x1="12" y1="12" x2="12" y2="21" /><line x1="12" y1="12" x2="4" y2="7.5" /><line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>',
  //   columns: 2,
  //   list: [
  //     { label: 'Empty page', to: {name: 'empty'}},
  //     { label: 'Blank page', to: {name: 'blank'}},
  //     { label: 'Buttons', to: {name: 'buttons'}},
  //     { label: 'Cards', to: {name: 'cards'}},
  //     { label: 'Dropdowns', to: {name: 'dropdowns'}},
  //     { label: 'Icons', to: {name: 'icons'}},
  //     { label: 'Modals', to: {name: 'modals'}},
  //     { label: 'Tables', to: {name: 'tables'}},
  //     { label: 'Calendar', to: {name: 'calendar'}},
  //     { label: 'Carousel', to: {name: 'carousel'}},
  //     { label: 'Lists', to: {name: 'lists'}}
  //   ]
  // },
  // {
  //   label: 'Form elements',
  //   to: {name: 'form-elements'},
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 11 12 14 20 6" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>'
  // },
  // {
  //   label: 'Extra',
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" /></svg>',
  //   columns: 2,
  //   list: [
  //     { label: 'Invoice', to: {name: 'invoice'}},
  //     { label: 'Blog cards', to: {name: 'blog'}},
  //     { label: 'Snippets', to: {name: 'snippets'}},
  //     { label: 'Search results', to: {name: 'search'}},
  //     { label: 'Pricing cards', to: {name: 'pricing'}},
  //     { label: 'Users', to: {name: 'users'}},
  //     { label: 'Gallery', to: {name: 'gallery'}},
  //     { label: 'Profile', to: {name: 'profile'}},
  //     { label: 'Music', to: {name: 'music'}},
  //     { label: 'Welcome', to: {name: 'welcome'}},
  //     { label: 'Sign in', to: {name: 'signin'}},
  //     { label: 'Sign up', to: {name: 'signup'}},
  //     { label: 'Term of Service', to: {name: 'tos'}},
  //     { label: 'Typography', to: {name: 'typography'}},
  //     { label: 'Tabs', to: {name: 'tabs'}},
  //     { label: 'Ribbons', to: {name: 'ribbons'}},
  //     { label: 'Maintenance', to: {name: 'maintenance'}},
  //     { label: 'Lookup company', to: {name: 'lookup'}},
  //     { label: 'Forgot password', to: {name: 'forgot-password'}},
  //     { label: 'Email', to: {name: 'email'}},
  //   ]
  // }
]
const vertical = {
  topbar: {
    available: true,
    combined: true,
    dark: false,
    background: '', // #7952b3
    grow: false,
  },
  navbar: {
    available: true,
    right: false,
    dark: true,
    background: '', // #8055b3
    list: navBarList
  },
  smallLogo: false,
  logo: true,
  search: false,
  alerts: false,
  user: false,
  settings: true
}

const horizontal = {
  topbar: {
    available: true,
    combined: false,
    dark: false,
    background: '', // #7952b3
    grow: false,
  },
  navbar: {
    available: true,
    // right: false,
    dark: false,
    background: '', // #8055b3
    list: navBarList
  },
  condensed: false,
  smallLogo: false,
  logo: true,
  search: false,
  alerts: false,
  user: false,
  settings: true
}

export default function () {
  return {
    dark: (LocalStorage.getItem('tabler-dark-mode') || false) === true,
    mode: LocalStorage.getItem('tabler-mode'), // || 'MainLayout'
    fluid: (LocalStorage.getItem('tabler-fluid') || false) === true,
    VerticalLayout: LocalStorage.getItem('tabler-vertical') || vertical,
    HorizontalLayout: LocalStorage.getItem('tabler-horizontal') || horizontal,
    // menuAutoExpand: (localStorage['tabler-menu-auto-expand'] || 'false') === 'true',
    // menuMini: (localStorage['tabler-menu-mini'] || 'false') === 'true',
    dashboardColorScheme: LocalStorage.getItem('tabler-dashboard-color-scheme') || 'Standard'
  }
}
