import * as Debug from 'debug'
const debug = Debug('apps:hosts:periodical:requests')
debug.log = console.log.bind(console) // don't forget to bind to console!

import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, WEEK, MONTH} from '@libs/time/const'

let init = false

// let _top_domains = []
// let top_domains = {}

import hosts_callback from '@apps/hosts/libs/periodical'

import os_callback from '@apps/system/libs/periodical'

import web_callback from '@apps/web/libs/periodical'

const generic_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL GENERIC CALLBACK data %s %o', key, data, metadata)
  if (key === 'hosts.periodical') { hosts_callback(data, metadata, key, vm) }

  if (key === 'os.periodical') { os_callback(data, metadata, key, vm) }

  if (key === 'logs.periodical') { web_callback(data, metadata, key, vm) }
}

const host_range_component = {
  params: function (_key, vm) {
    // debug('PERIODICAL host_range_component %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['host.periodical', 'config.range', 'minute.range']
      key = ['hosts.periodical', 'os.periodical', 'logs.periodical'] //, 'minute.range'
    }

    let filter = [
      // "this.r.row('metadata')('path').eq('os.memory').or(this.r.row('metadata')('path').eq('os.cpus'))"
    ]

    if (vm.selected_hosts && vm.selected_hosts.length > 0) {
      let hosts_filter
      Array.each(vm.selected_hosts, function (host) {
        if (hosts_filter === undefined) {
          hosts_filter = "this.r.row('metadata')('host').eq('" + host + "')"
        } else {
          hosts_filter += ".or(this.r.row('metadata')('host').eq('" + host + "')"
        }
      })

      if (vm.selected_hosts.length > 1) { // close each 'or'
        Array.each(vm.selected_hosts, function (host, index) {
          if (index < vm.selected_hosts.length - 1) { hosts_filter += ')' }
        })
      }
      filter.push(hosts_filter)
    }

    debug('host_range_component FILTER ', filter)

    let os_filter = Array.clone(filter)
    let logs_filter = Array.clone(filter)
    logs_filter.push({ 'metadata': { 'path': 'logs.nginx' } })

    if (
      _key
    ) {
      switch (_key) {
        case 'hosts.periodical':
          source = [{
            params: { id: _key },
            path: 'all',
            // range: 'posix ' + roundMilliseconds(Date.now() - (6 * SECOND)) + '-' + roundMilliseconds(Date.now() - SECOND) + '/*',
            query: {
              'from': 'hosts',
              'index': false,
              /**
              * right now needed to match OUTPUT 'id' with this query (need to @fix)
              **/
              'q': [
                'data',
                'metadata'
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.asc(host)' }
                }
              ],
              // 'filter': os_filter

            }
          }]
          break

        case 'os.periodical':
          source = [{
            params: { id: _key },
            path: 'all',
            range: 'posix ' + roundMilliseconds(Date.now() - (6 * SECOND)) + '-' + roundMilliseconds(Date.now() - SECOND) + '/*',
            query: {
              'from': 'os',
              // 'register': 'changes',
              // 'format': 'stat',
              'index': false,
              /**
              * right now needed to match OUTPUT 'id' with this query (need to @fix)
              **/
              'q': [
                // {
                //   'metadata': [
                //     'timestamp',
                //     'path'
                //   ]
                // },
                // 'metadata',
                'data',
                {'metadata': ['host', 'timestamp', 'path']}
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.desc(timestamp)' }
                }
              ],
              'filter': os_filter

            }
          }]
          break

        case 'logs.periodical':
          source = [{
            params: { id: _key },
            path: 'all',
            range: 'posix ' + roundMilliseconds(Date.now() - (6 * SECOND)) + '-' + roundMilliseconds(Date.now() - SECOND) + '/*',
            query: {
              'from': 'logs',
              // 'register': 'changes',
              // 'format': 'stat',
              'index': false,
              /**
                * right now needed to match OUTPUT 'id' with this query (need to @fix)
                **/
              'q': [
                // {
                //   'metadata': [
                //     'timestamp',
                //     'path'
                //   ]
                // },
                // 'metadata',
                'data',
                {'metadata': ['host', 'timestamp', 'path', 'domain']}
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.desc(timestamp)' }
                }
              ],
              'filter': logs_filter

            }
          }]
          break
      }
    }

    // debug('MyChart periodical KEY ', key, source)

    return { key, source }
  },
  callback: generic_callback

}

const once = [
  host_range_component
]

const periodical = [
  host_range_component
]

const requests = {
  periodical: periodical,
  once: once
}

export { periodical, once }
export default requests
