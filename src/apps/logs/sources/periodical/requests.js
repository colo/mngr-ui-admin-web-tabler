import * as Debug from 'debug'
const debug = Debug('apps:logs:sources:periodical:requests')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

let init = false

// import hosts_callback from '@apps/hosts/libs/periodical'
//
// import os_callback from '@apps/system/libs/periodical'
//
// import web_callback from '@apps/logs/web/libs/historical'

// let grouped_logs = {}
// let group_by = []
// let selected_hosts = []
// let selected_paths = []
// let logs_paths = []

let vms = {}
const generic_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL LOGS GENERIC CALLBACK data %s %o', key, data, metadata)
  // if (key === 'hosts.periodical') { hosts_callback(data, metadata, key, vm) }
  //
  // if (key === 'os.periodical') { os_callback(data, metadata, key, vm) }
  //
  // if (/^logs\.web\.historical\..*$/.test(key)) { web_callback(data, metadata, key, vm) }
  let id = vm.id
  if (!vms[id]) {
    vms[id] = {
      grouped_logs: {},
      group_by: [],
      selected_hosts: [],
      selected_paths: [],
      logs_paths: [],
    }
  }

  let _data
  if (data.logs) _data = data.logs // comes from 'Range'
  else _data = data // comes from 'register'

  if (vms[id].group_by !== vm.group_by || vms[id].selected_hosts !== vm.selected_hosts || vms[id].selected_paths !== vm.selected_paths) {
    Object.each(vms[id].grouped_logs, function (data, group) {
      vm.$delete(vm.logs, group)
      delete vms[id].grouped_logs[group]
    })
  }

  vms[id].group_by = vm.group_by
  vms[id].selected_hosts = vm.selected_hosts
  vms[id].selected_paths = vm.selected_paths

  let all_logs = {all: []}
  Object.each(vms[id].grouped_logs, function (data, group) {
    if (vm.selected_hosts.length > 0) {
      Array.each(vm.selected_hosts, function (host) {
        if (group.indexOf(host) > -1) {
          vms[id].grouped_logs[group] = []
        }
        // else {
        //   // delete vms[id].grouped_logs[group]
        // }
      })
    } else {
      vms[id].grouped_logs[group] = []
    }
  })

  Array.each(_data, function (row) {
    let path = row.metadata.path
    let host = row.metadata.host
    let domain = row.metadata.domain
    let timestamp = row.metadata.timestamp

    if (!vms[id].logs_paths.contains(path)) vms[id].logs_paths.push(path)

    if (vm.selected_paths.length === 0 || vm.selected_paths.contains(path)) {
      if (vm.group_by.length === 0) {
        all_logs.all.push({ timestamp: timestamp, domain: domain, host: host, path: path, log: row.data.log})
      } else {
        // try {
        // let group = vm.group_by.joing('.')
        let props_values = []
        Array.each(vm.group_by, function (prop) {
          props_values.push(row.metadata[prop])
        })

        let group = props_values.join('.')

        debug('PERIODICAL GROUP %s', group)

        if (!vms[id].grouped_logs[group]) vms[id].grouped_logs[group] = []
        vms[id].grouped_logs[group].push({ timestamp: timestamp, domain: domain, host: host, path: path, log: row.data.log})
        // } catch (e) {
        //   debug('PERIODICAL GROUP ERR %o', e)
        // }
      }
      // if (row && row.data && row.data.log) { logs.push(row.data.log) }
    }
  })
  debug('PERIODICAL LOGS GROUPED data %o %o', all_logs, vms[id].grouped_logs)

  if (vm.group_by.length === 0) {
    vm.logs = all_logs
  } else {
    // Object.each(vms[id].grouped_logs, function (data, group) {
    //   vm.$set(vm.logs, group, data)
    // })
    Object.each(vms[id].grouped_logs, function (data, group) {
      if (vm.selected_hosts.length > 0 && vm.group_by.contains('host')) {
        if (vm.selected_hosts.some(function (host) { return group.indexOf(host) > -1 })) {
          vm.$set(vm.logs, group, data)
        } else {
          vm.$delete(vm.logs, group)
        }
        // Array.each(vm.selected_hosts, function (host) {
        //   if (group.indexOf(host) > -1) {
        //     vm.$set(vm.logs, group, data)
        //   } else {
        //     vm.$delete(vm.logs, group)
        //   }
        // })
      } else if (vm.selected_paths.length > 0 && vm.group_by.contains('path')) {
        if (vm.selected_paths.some(function (path) { return group.indexOf(path) > -1 })) {
          vm.$set(vm.logs, group, data)
        } else {
          vm.$delete(vm.logs, group)
        }
      } else {
        vm.$set(vm.logs, group, data)
      }
    })
  }

  vm.logs_paths = vms[id].logs_paths
}

const logs_summary_periodical = {
  params: function (_key, vm) {
    debug('PERIODICAL logs_summary_periodical %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['host.periodical', 'config.range', 'minute.range']
      key = ['logs.periodical']
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

      debug('logs_summary_periodical FILTER ', filter)

      source = [{
        params: { id: _key },
        path: 'all',
        // range: 'posix ' + START + '-' + END + '/*',
        query: {
          'from': 'logs',
          /**
          * changesfeed looks like eats too much rethinkdb mem
          * 'register': 'changes',
          **/
          'register': 'changes',
          // 'format': 'stat',
          'index': false,
          // 'opts': { includeTypes: true, squash: 1 },
          /**
          * right now needed to match OUTPUT 'id' with this query (need to @fix)
          **/
          'q': [
            // 'id',
            {'data': ['log']},
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

    debug('PERIODICAL logs_summary_periodical %s %o', _key, source)

    return { key, source }
  },
  callback: generic_callback

}

const once = [
  logs_summary_periodical
]

const periodical = [
  // logs_summary_periodical
]

const requests = {
  periodical: periodical,
  once: once
}

export { logs_summary_periodical, periodical, once }
export default requests
