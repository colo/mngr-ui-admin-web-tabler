import * as Debug from 'debug'
const debug = Debug('apps:logs:web:sources:historical:requests')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

let init = false

// import hosts_callback from '@apps/hosts/libs/periodical'
//
// import os_callback from '@apps/system/libs/periodical'
//
import web_callback from '@apps/logs/web/libs/historical'

const generic_callback = function (data, metadata, key, vm) {
  debug('HISTORICAL GENERIC CALLBACK data %s %o', key, data, metadata)
  // if (key === 'hosts.periodical') { hosts_callback(data, metadata, key, vm) }
  //
  // if (key === 'os.periodical') { os_callback(data, metadata, key, vm) }
  //
  if (/^logs\.web\.historical\..*$/.test(key)) { web_callback(data, metadata, key, vm) }
}

const logs_web_summary_periodical = {
  params: function (_key, vm) {
    // debug('HISTORICAL logs_web_summary_periodical %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['host.periodical', 'config.range', 'minute.range']
      key = ['logs.web.historical.' + vm.period]
    }

    if (
      _key
    ) {
      const END = vm.end()
      const START = vm.start()

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

      // let os_filter = Array.clone(filter)
      let logs_filter = Array.clone(filter)
      logs_filter.push({ 'metadata': { 'path': 'logs.nginx' } })

      // END = Date.now() - (2 * DAY)

      // if (vm.period === 'minute') {
      //   START = (END - (5 * MINUTE) >= 0) ? END - (5 * MINUTE) : 0
      // } else if (vm.period === 'hour') {
      //   START = (END - (2 * HOUR) >= 0) ? END - (2 * HOUR) : 0
      // } else {
      //   START = (END - DAY >= 0) ? END - DAY : 0
      // }

      logs_filter.push("r.row('metadata')('type').eq('" + vm.period + "')")
      logs_filter.push("r.row('metadata')('tag').contains('host')")
      logs_filter.push("r.row('data')('user_agent').hasFields('os.detailed')")

      debug('logs_web_summary_periodical FILTER ', logs_filter)

      source = [{
        params: { id: _key },
        path: 'all',
        range: 'posix ' + START + '-' + END + '/*',
        query: {
          'from': 'logs_historical_' + vm.period,
          'index': false,
          /**
          * right now needed to match OUTPUT 'id' with this query (need to @fix)
          **/
          'q': [
            // 'id',
            {'data': 'user_agent'},
            'metadata'
          ],
          'transformation': [
            {
              'orderBy': { 'index': 'r.desc(timestamp)' }
            }
          ],
          filter: logs_filter

        }
      }]
    }

    debug('HISTORICAL logs_web_summary_periodical %s %o', _key, source)

    return { key, source }
  },
  callback: generic_callback

}

const once = [
  // logs_web_periodical,
  logs_web_summary_periodical
]

const periodical = [
  // logs_web_periodical,
  logs_web_summary_periodical
]

const requests = {
  periodical: periodical,
  once: once
}

export { logs_web_summary_periodical, periodical, once }
export default requests
