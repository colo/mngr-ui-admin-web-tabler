import * as Debug from 'debug'
const debug = Debug('apps:logs:web:sources:periodical:requests')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

let init = false

// import hosts_callback from '@apps/hosts/libs/periodical'
//
// import os_callback from '@apps/system/libs/periodical'
//
import web_callback from '@apps/logs/web/libs/periodical'

const logs_summary_periodical = {
  params: function (_key, vm) {
    debug('PERIODICAL LOGS WEB logs_summary_periodical %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['host.periodical', 'config.range', 'minute.range']
      key = ['logs.web.periodical']
    }

    if (
      _key
    ) {
      const END = vm.end()
      const START = vm.start()

      let filter = []

      // filter.push("r.row('metadata')('type').eq('" + vm.period + "')")

      /**
      * don't use hasFields in this periodicals, it consume too much rethinkdb mem
      **/
      // filter.push("r.row('data').hasFields('log')")

      /**
      * Data
      **/
      // if (vm.data && Object.getLength(vm.data) > 0) {
      //   debug('SEARCH DATA', vm.data)
      //   Object.each(vm.data, function (value, prop) {
      //     let single_value_op = 'hasFields' // usually on historical docs the value you are searching is a field with a counter value
      //
      //     if (Array.isArray(value)) {
      //       let value_filter
      //
      //       Array.each(value, function (single_value) {
      //         if (value_filter === undefined) {
      //           value_filter = "this.r.row('data')('" + prop + "')." + single_value_op + "('" + single_value + "')"
      //         } else {
      //           value_filter += ".or(this.r.row('data')('" + prop + "')." + single_value_op + "('" + single_value + "')"
      //         }
      //       })
      //
      //       if (value.length > 1) { // close each 'or'
      //         Array.each(value, function (single_value, index) {
      //           if (index < value.length - 1) { value_filter += ')' }
      //         })
      //       }
      //
      //       filter.push(value_filter)
      //     } else {
      //       filter.push("this.r.row('data')(" + prop + ').' + single_value_op + "('" + value + "')")
      //     }
      //   })
      // }

      /**
      * Hosts
      **/
      let hosts_op = 'eq'
      // if (vm.by === 'host') {
      //   filter.push("this.r.row('metadata')('tag').contains('host')")
      // } else {
      //   hosts_op = 'contains'
      //   filter.push("this.r.row('metadata')('tag').contains('domain')")
      // }

      if (vm.selected_hosts && vm.selected_hosts.length > 0) {
        let hosts_filter
        Array.each(vm.selected_hosts, function (host) {
          if (hosts_filter === undefined) {
            hosts_filter = "this.r.row('metadata')('host')." + hosts_op + "('" + host + "')"
          } else {
            hosts_filter += ".or(this.r.row('metadata')('host')." + hosts_op + "('" + host + "')"
          }
        })

        if (vm.selected_hosts.length > 1) { // close each 'or'
          Array.each(vm.selected_hosts, function (host, index) {
            if (index < vm.selected_hosts.length - 1) { hosts_filter += ')' }
          })
        }
        filter.push(hosts_filter)
      }

      /**
      * Domains
      */
      let domains_op = 'eq'
      if (vm.by !== 'domain') {
        domains_op = 'contains'
      }

      if (vm.selected_domains && vm.selected_domains.length > 0) {
        let domains_filter
        Array.each(vm.selected_domains, function (domain) {
          if (domains_filter === undefined) {
            domains_filter = "this.r.row('metadata')('domain')." + domains_op + "('" + domain + "')"
          } else {
            domains_filter += ".or(this.r.row('metadata')('domain')." + domains_op + "('" + domain + "')"
          }
        })

        if (vm.selected_domains.length > 1) { // close each 'or'
          Array.each(vm.selected_domains, function (domain, index) {
            if (index < vm.selected_domains.length - 1) { domains_filter += ')' }
          })
        }
        filter.push(domains_filter)
      }

      if (vm.filters && vm.filters.length > 0) {
        Array.each(vm.filters, function (_filter) {
          filter.push(_filter)
        })
      }

      // let os_filter = Array.clone(filter)
      // let logs_filter = Array.clone(filter)
      // filter.push({ 'metadata': { 'path': 'logs.nginx' } })

      // END = Date.now() - (2 * DAY)

      // if (vm.period === 'minute') {
      //   START = (END - (5 * MINUTE) >= 0) ? END - (5 * MINUTE) : 0
      // } else if (vm.period === 'hour') {
      //   START = (END - (2 * HOUR) >= 0) ? END - (2 * HOUR) : 0
      // } else {
      //   START = (END - DAY >= 0) ? END - DAY : 0
      // }

      debug('PERIODICAL LOGS WEB logs_summary_periodical FILTER ', filter)

      source = [{
        params: { id: _key },
        path: 'all',
        range: 'posix ' + START + '-' + END + '/*',
        query: {
          'from': 'logs',
          /**
          * changesfeed looks like eats too much rethinkdb mem
          * 'register': 'changes',
          **/
          // 'register': 'changes',
          // 'format': 'stat',
          'index': false,
          // 'opts': { includeTypes: true, squash: 1 },
          /**
          * right now needed to match OUTPUT 'id' with this query (need to @fix)
          **/
          'q': [
            // 'id',
            'data',
            /**
            * looks like searching for nested props makes rethinkdb consume too much mem (maybe pluck)??
            * {'data': ['log']},
            **/
            // {'data': 'user_agent'},
            'metadata'
          ],
          // 'transformation': [
          //   {
          //     'orderBy': { 'index': 'r.desc(timestamp)' }
          //   },
          //   // { limit: 1},
          // ],
          filter: filter

        }
      }]
    }

    debug('PERIODICAL LOGS WEB logs_summary_periodical %s %o', _key, source)

    return { key, source }
  },
  callback: web_callback

}

const once = [
  logs_summary_periodical
]

const periodical = [
  logs_summary_periodical
]

const requests = {
  periodical: periodical,
  once: once
}

export { logs_summary_periodical, periodical, once }
export default requests
