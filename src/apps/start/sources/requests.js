import * as Debug from 'debug'
const debug = Debug('apps:start:sources:requests')
debug.log = console.log.bind(console) // don't forget to bind to console!

const nginx_vhosts_error = {
  params: {
    path: 'all',
    // query: {
    //   'from': 'os',
    //   'index': false,
    //   // 'filter': [
    //   //   "r.row('metadata')('tag').contains('enabled').and('nginx').and('vhost')",
    //   //   "r.row('data')('code').gt(399)",
    //   //   "r.row('metadata')('path').eq('educativa.checks.vhosts')",
    //   //   "r.row('metadata')('type').eq('check')"
    //   //   // "r.row('metadata')('host').eq('colo')"
    //   // ]
    // }
  },
  callback: function (tables, metadata, key, vm) {
    debug('All callback', tables, JSON.parse(JSON.stringify(this)))
  }
}

const periodical = undefined
const once = [
  nginx_vhosts_error
]

const requests = {
  periodical: periodical,
  once: once
}

export { periodical, once, nginx_vhosts_error }
export default requests
