import { LocalStorage, SessionStorage } from 'quasar'

const navBarList = [
  {
    label: 'Home',
    to: {name: 'index'},
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>',
  },
  {
    label: 'Hosts',
    to: {name: 'hosts'},
    icon: '<svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><rect data-v-2a169e26="" x="3" y="4" width="18" height="8" rx="3"></rect><rect data-v-2a169e26="" x="3" y="12" width="18" height="8" rx="3"></rect><line data-v-2a169e26="" x1="7" y1="8" x2="7" y2="8.01"></line><line data-v-2a169e26="" x1="7" y1="16" x2="7" y2="16.01"></line></svg>',
  },
  {
    label: 'Logs',
    icon: '<svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><path data-v-2a169e26="" d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"></path><line data-v-2a169e26="" x1="8" y1="8" x2="12" y2="8"></line><line data-v-2a169e26="" x1="8" y1="12" x2="12" y2="12"></line><line data-v-2a169e26="" x1="8" y1="16" x2="12" y2="16"></line></svg>',
    // columns: 2,
    list: [
      { label: 'Summary', to: {name: 'logs'}},
      { label: 'Web', to: {name: 'logs_web'}},
      // { label: 'Blank page', to: {name: 'blank'}},
      // { label: 'Buttons', to: {name: 'buttons'}},
      // { label: 'Cards', to: {name: 'cards'}},
      // { label: 'Dropdowns', to: {name: 'dropdowns'}},
      // { label: 'Icons', to: {name: 'icons'}},
      // { label: 'Modals', to: {name: 'modals'}},
      // { label: 'Tables', to: {name: 'tables'}},
      // { label: 'Calendar', to: {name: 'calendar'}},
      // { label: 'Carousel', to: {name: 'carousel'}},
      // { label: 'Lists', to: {name: 'lists'}}
    ]
  },
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
