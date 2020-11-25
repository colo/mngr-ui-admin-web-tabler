
/**
* Dynamic Layout
* https://dev.to/lampewebdev/vuejs-pages-with-dynamic-layouts-problems-and-a-solution-4460
*/

/**
* Avoid lazy loading or Apps get null $route (and breaks Dynamic Layout)
* https://forum.vuejs.org/t/this-route-only-returns-null-in-app-vue/64006/3
**/
import Index from '@apps/start/Index.vue'
import Hosts from '@apps/hosts/Index.vue'
import Logs from '@apps/logs/Index.vue'
import LogsWeb from '@apps/logs/web/Index.vue'

import Error from 'pages/Error.vue'

import Signin from '@apps/signin/Index.vue'
import Signout from '@apps/signout/Index.vue'

import Test from '@apps/test/Index.vue'

const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    name: 'index',
    // component: () => import('@apps/start/Index.vue'),
    component: Index
    // meta: { layout: 'VerticalLayout' },

  },
  {
    path: '/hosts',
    // component: () => import('layouts/MainLayout.vue'),
    name: 'hosts',
    // component: () => import('@apps/start/Index.vue'),
    component: Hosts
    // meta: { layout: 'VerticalLayout' },

  },
  {
    path: '/logs',
    // component: () => import('layouts/MainLayout.vue'),
    name: 'logs',
    // component: () => import('@apps/start/Index.vue'),
    component: Logs
    // meta: { layout: 'VerticalLayout' },

  },
  {
    path: '/logs/web',
    // component: () => import('layouts/MainLayout.vue'),
    name: 'logs_web',
    // component: () => import('@apps/start/Index.vue'),
    component: LogsWeb
    // meta: { layout: 'VerticalLayout' },

  },
  {
    path: '/test',
    // component: () => import('layouts/MainLayout.vue'),
    name: 'test',
    // component: () => import('@apps/start/Index.vue'),
    component: Test
    // meta: { layout: 'VerticalLayout' },

  },
  {
    path: '/signin',
    name: 'signin',
    // component: () => import('@apps/signin/Index.vue'),
    component: Signin,
    meta: { layout: 'EmptyLayout' },
  },
  {
    path: '/signout',
    name: 'signout',
    // component: () => import('@apps/signout/Index.vue'),
    component: Signout,
    meta: { layout: 'EmptyLayout' },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    // component: () => import('pages/Error.vue'),
    component: Error,
    props: { number: 404, title: 'Oops… You just found an error page', subtitle: 'We are sorry but the page you are looking for was not found'},
    meta: { layout: 'EmptyLayout' },
  }
]

export default routes
