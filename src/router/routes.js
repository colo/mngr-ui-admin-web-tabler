// import HorizontalLayout from '../layouts/HorizontalLayout.vue'

/**
* Dynamic Layout
* https://dev.to/lampewebdev/vuejs-pages-with-dynamic-layouts-problems-and-a-solution-4460
*/
// import VerticalLayout from '../layouts/VerticalLayout.vue'

const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    name: 'index',
    component: () => import('@apps/start/Index.vue'),
    // meta: { layout: 'VerticalLayout' },

  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@apps/signin/Index.vue'),
    meta: { layout: 'EmptyLayout' },
  },
  // {
  //   path: '/empty',
  //   name: 'empty',
  //   component: () => import('pages/Empty.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/blank',
  //   name: 'blank',
  //   component: () => import('pages/Blank.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/buttons',
  //   name: 'buttons',
  //   component: () => import('pages/Buttons.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/cards',
  //   name: 'cards',
  //   component: () => import('pages/Cards.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/dropdowns',
  //   name: 'dropdowns',
  //   component: () => import('pages/Dropdowns.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/icons',
  //   name: 'icons',
  //   component: () => import('pages/Icons.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/modals',
  //   name: 'modals',
  //   component: () => import('pages/Modals.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/tables',
  //   name: 'tables',
  //   component: () => import('pages/Tables.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/calendar',
  //   name: 'calendar',
  //   component: () => import('pages/Calendar.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/carousel',
  //   name: 'carousel',
  //   component: () => import('pages/Carousel.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/lists',
  //   name: 'lists',
  //   component: () => import('pages/Lists.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/form-elements',
  //   name: 'form-elements',
  //   component: () => import('pages/Form.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // /**
  // * Extras
  // **/
  // {
  //   path: '/invoice',
  //   name: 'invoice',
  //   component: () => import('pages/Invoice.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/blog',
  //   name: 'blog',
  //   component: () => import('pages/Blog.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/snippets',
  //   name: 'snippets',
  //   component: () => import('pages/Snippets.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/search',
  //   name: 'search',
  //   component: () => import('pages/Search.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/pricing',
  //   name: 'pricing',
  //   component: () => import('pages/Pricing.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/users',
  //   name: 'users',
  //   component: () => import('pages/Users.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/gallery',
  //   name: 'gallery',
  //   component: () => import('pages/Gallery.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('pages/Profile.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/music',
  //   name: 'music',
  //   component: () => import('pages/Music.vue'),
  //   // meta: { layout: 'VerticalLayout' },
  // },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   component: () => import('pages/Welcome.vue'),
  //   meta: { layout: 'EmptyLayout' },
  // },
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: () => import('pages/Signup.vue'),
  //   meta: { layout: 'EmptyLayout' },
  // },
  // {
  //   path: '/tos',
  //   name: 'tos',
  //   component: () => import('pages/Tos.vue'),
  // },
  // {
  //   path: '/typography',
  //   name: 'typography',
  //   component: () => import('pages/Typography.vue'),
  // },
  // {
  //   path: '/tabs',
  //   name: 'tabs',
  //   component: () => import('pages/Tabs.vue'),
  // },
  // {
  //   path: '/ribbons',
  //   name: 'ribbons',
  //   component: () => import('pages/Ribbons.vue'),
  // },
  // {
  //   path: '/maintenance',
  //   name: 'maintenance',
  //   component: () => import('pages/Maintenance.vue'),
  //   meta: { layout: 'EmptyLayout' },
  // },
  // {
  //   path: '/lookup',
  //   name: 'lookup',
  //   component: () => import('pages/Lookup.vue'),
  // },
  // {
  //   path: '/forgot-password',
  //   name: 'forgot-password',
  //   component: () => import('pages/ForgotPassword.vue'),
  //   meta: { layout: 'EmptyLayout' },
  // },
  // {
  //   path: '/email',
  //   name: 'email',
  //   component: () => import('pages/Email.vue'),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error.vue'),
    props: { number: 404, title: 'Oops… You just found an error page', subtitle: 'We are sorry but the page you are looking for was not found'},
    meta: { layout: 'EmptyLayout' },
  }
]

export default routes
