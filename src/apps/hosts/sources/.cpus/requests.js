import * as Debug from 'debug'
const debug = Debug('apps:hosts:cpus:requests')
debug.log = console.log.bind(console) // don't forget to bind to console!

const roundMilliseconds = function (timestamp) {
  let d = new Date(timestamp)
  d.setMilliseconds(0)

  return d.getTime()
}

const roundSeconds = function (timestamp) {
  timestamp = roundMilliseconds(timestamp)
  let d = new Date(timestamp)
  d.setSeconds(0)

  return d.getTime()
}

const roundMinutes = function (timestamp) {
  timestamp = roundSeconds(timestamp)
  let d = new Date(timestamp)
  d.setMinutes(0)

  return d.getTime()
}
const roundHours = function (timestamp) {
  timestamp = roundMinutes(timestamp)
  let d = new Date(timestamp)
  d.setHours(0)

  return d.getTime()
}
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = HOUR * 24
const WEEK = DAY * 7

let init = false

let _top_domains = []
let top_domains = {}

const generic_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL HOST CALLBACK data %s %o', key, data, metadata)

  /**
  * tabular
  **/
  // if(data.os){
  //   let arr = []
  //   Object.each(data.os['os.cpus'], function (row, name) {
  //     if (name === 'cores') {
  //       arr = row
  //     } else {
  //       Array.each(row, function (column, index) {
  //         arr[index].push(column[1])
  //       })
  //     }
  //   })
  //
  //   debug('PERIODICAL HOST CALLBACK data %s %o', key, data, arr)
  //   vm.$set(vm.cpus_stat, 'data', [arr])
  // }
  /**
  * stat
  **/
  if (data.os) {
    let hosts = {}
    Array.each(data.os, function (row) {
      let host = row.metadata.host
      if (/^(?!.*(caelum|lynx)).*$/.test(host)) {
        if (!hosts[host] || hosts[host].metadata.timestamp < row.metadata.timestamp) {
          hosts[host] = row
        }
      }
    })

    let cpus = {timestamp: Date.now(), value: {}}
    Object.each(hosts, function (row) {
      Object.each(row.data, function (val, prop) {
        if (!cpus.value[prop]) cpus.value[prop] = 0
        cpus.value[prop] += val
      })
    })

    debug('PERIODICAL HOST CALLBACK data CPUS %s %o', key, hosts, cpus, vm)
    // let arr = []
    // // let index = 0
    // Object.each(data.os['os.memory'], function (row, name) {
    //   // if (name === 'cores') {
    //   //   arr = row
    //   // } else {
    //   Array.each(row, function (column, index) {
    //     if (!arr[index]) arr[index] = {timestamp: column.timestamp, value: {}}
    //     arr[index].value[name] = column.value
    //     // arr[index] = {timestamp}
    //   })
    //   // }
    //   // index++
    // })
    //
    // debug('PERIODICAL HOST CALLBACK data %s %o', key, data, arr)
    vm.$set(vm.stat, 'data', [cpus])
  }
  // if (data.os) {
  //   let arr = []
  //   // let index = 0
  //   Object.each(data.os['os.cpus'], function (row, name) {
  //     // if (name === 'cores') {
  //     //   arr = row
  //     // } else {
  //     Array.each(row, function (column, index) {
  //       if (!arr[index]) arr[index] = {timestamp: column.timestamp, value: {}}
  //       arr[index].value[name] = column.value
  //       // arr[index] = {timestamp}
  //     })
  //     // }
  //     // index++
  //   })
  //
  //   debug('PERIODICAL HOST CALLBACK data %s %o', key, data, arr)
  //   vm.$set(vm.stat, 'data', [arr])
  // }

  // if (data.logs) {
  //   let domains_count = {}
  //   Array.each(data.logs, function (row, index) {
  //     let domain = row.metadata.domain
  //
  //     if (!domains_count[domain]) domains_count[domain] = 0
  //     domains_count[domain]++
  //   })
  //
  //   // moved global
  //   // let _top_domains = []
  //   Object.each(domains_count, function (count, domain) {
  //     _top_domains.push({domain: domain, count: count})
  //   })
  //
  //   _top_domains.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })
  //
  //   // _top_domains = _top_domains.slice(0, 4) // TOP 5
  //
  //   debug('PERIODICAL HOST CALLBACK domains %o', _top_domains)
  //
  //   // moved global
  //   // let top_domains = {}
  //   Array.each(data.logs, function (row, index) {
  //     let ts = roundMilliseconds(row.metadata.timestamp)
  //     let domain = row.metadata.domain
  //     if (!top_domains[ts]) top_domains[ts] = {}
  //     if (!top_domains[ts]['Total']) top_domains[ts]['Total'] = 0
  //     top_domains[ts]['Total']++
  //
  //     if (Object.some(_top_domains, function (row) { return row.domain === domain })) {
  //       if (!top_domains[ts][domain]) top_domains[ts][domain] = 0
  //       top_domains[ts][domain]++
  //     }
  //   })
  //
  //   /**
  //   * add missing domains on each ts, as dygraph.line needs it to determine "labels"
  //   * also clean top_domains old data
  //   **/
  //   Object.each(top_domains, function (value, ts) {
  //     if (ts < Date.now() - (MINUTE * 6)) {
  //       delete top_domains[ts]
  //     } else {
  //       Array.each(_top_domains, function (row) {
  //         if (!value[row.domain]) value[row.domain] = 0
  //       })
  //     }
  //   })
  //   debug('PERIODICAL HOST CALLBACK domains %o', top_domains)
  //
  //   let top_domains_stat = []
  //   Object.each(top_domains, function (value, ts) {
  //     top_domains_stat.push({timestamp: ts, value: value})
  //   })
  //
  //   debug('PERIODICAL HOST CALLBACK domains %o', top_domains_stat)
  //   vm.$set(vm.domains_stat, 'data', [top_domains_stat])
  // }
}

// const host_once_component = {
//   params: function (_key, vm) {
//     debug('PERIODICAL host_range_component %o %o', _key, vm)
//
//     let source
//     let key
//
//     if (!_key) {
//       key = ['periodical.once']// , 'minute.once' 'config.once',
//     }
//
//     if (
//       _key
//     ) {
//       switch (_key) {
//         case 'periodical.once':
//           source = [
//             {
//               params: { id: _key, init: true },
//               path: 'all',
//               range: 'posix ' + roundMilliseconds(Date.now() - (6 * MINUTE)) + '-' + roundMilliseconds(Date.now()) + '/*',
//               // range: 'posix ' + (Date.now() - MINUTE) + '-' + Date.now() + '/*',
//               query: {
//                 'from': 'os',
//                 // 'register': 'changes',
//                 'format': 'stat',
//                 'index': false,
//                 /**
//               * right now needed to match OUTPUT 'id' with this query (need to @fix)
//               **/
//                 'q': [
//                   'data'
//                 ],
//                 'transformation': [
//                   {
//                     'orderBy': { 'index': 'r.desc(timestamp)' }
//                   }
//                 ],
//                 'filter': [
//                   { 'metadata': { 'host': vm.host } },
//                   "r.row('metadata')('path').eq('os.cpus')"
//                 // "r.row('metadata')('path').ne('os.procs')"
//                 ]
//
//               }
//             },
//             {
//               params: { id: _key, init: true },
//               path: 'all',
//               range: 'posix ' + roundMilliseconds(Date.now() - (6 * MINUTE)) + '-' + roundMilliseconds(Date.now()) + '/*',
//               // range: 'posix ' + (Date.now() - MINUTE) + '-' + Date.now() + '/*',
//               query: {
//                 'from': 'logs',
//                 // 'register': 'changes',
//                 // 'format': 'stat',
//                 'index': false,
//                 /**
//               * right now needed to match OUTPUT 'id' with this query (need to @fix)
//               **/
//                 'q': [
//                   // 'data'
//                   'metadata'
//                 ],
//                 'transformation': [
//                   {
//                     'orderBy': { 'index': 'r.desc(timestamp)' }
//                   }
//                 ],
//                 'filter': [
//                   { 'metadata': { 'host': vm.host } },
//                   "r.row('metadata')('path').eq('logs.educativa')",
//                   "r.row('metadata')('type').eq('periodical')"
//                 // "r.row('metadata')('path').ne('os.procs')"
//                 ]
//
//               }
//             }]
//           break
//       }
//     }
//
//     // debug('MyChart periodical KEY ', key, source)
//
//     return { key, source }
//   },
//   callback: generic_callback
//
// }

const host_range_component = {
  params: function (_key, vm) {
    debug('PERIODICAL host_range_component %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['cpus.periodical', 'config.range', 'minute.range']
      key = ['cpus.periodical'] //, 'minute.range'
    }

    let filter = [
      "r.row('metadata')('path').eq('os.cpus')"
    ]

    if (vm.host) {
      filter({ 'metadata': { 'host': vm.host } })
    }

    if (
      _key
    ) {
      switch (_key) {
        case 'cpus.periodical':
          source = [{
            params: { id: _key },
            path: 'all',
            range: 'posix ' + roundMilliseconds(Date.now() - (5 * SECOND)) + '-' + roundMilliseconds(Date.now() - SECOND) + '/*',
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
                {'metadata': ['host']}
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.desc(timestamp)' }
                }
              ],
              'filter': filter

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
