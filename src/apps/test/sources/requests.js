import * as Debug from 'debug'
const debug = Debug('apps:test:periodical:requests')
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

const generic_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL HOST CALLBACK data %s %o', key, data)

  /**
  * tabular
  **/
  // let arr = []
  // Object.each(data.os['os.cpus'], function (row, name) {
  //   if (name === 'cores') {
  //     arr = row
  //   } else {
  //     Array.each(row, function (column, index) {
  //       arr[index].push(column[1])
  //     })
  //   }
  // })
  //
  // debug('PERIODICAL HOST CALLBACK data %s %o', key, data, arr)
  // vm.$set(vm.stat, 'data', [arr])

  /**
  * stat
  **/
  let arr = []
  // let index = 0
  Object.each(data.os['os.cpus'], function (row, name) {
    // if (name === 'cores') {
    //   arr = row
    // } else {
    Array.each(row, function (column, index) {
      if (!arr[index]) arr[index] = {timestamp: column.timestamp, value: {}}
      arr[index].value[name] = column.value
      // arr[index] = {timestamp}
    })
    // }
    // index++
  })

  debug('PERIODICAL HOST CALLBACK data %s %o', key, data, arr)
  vm.$set(vm.stat, 'data', [arr])
}

const host_once_component = {
  params: function (_key, vm) {
    debug('PERIODICAL host_range_component %o %o', _key, vm)

    let source
    let key

    if (!_key) {
      key = ['periodical.once']// , 'minute.once' 'config.once',
    }

    if (
      _key
    ) {
      switch (_key) {
        case 'periodical.once':
          source = [{
            params: { id: _key, init: true },
            path: 'all',
            range: 'posix ' + roundMilliseconds(Date.now() - (6 * MINUTE)) + '-' + roundMilliseconds(Date.now()) + '/*',
            // range: 'posix ' + (Date.now() - MINUTE) + '-' + Date.now() + '/*',
            query: {
              'from': 'os',
              // 'register': 'changes',
              'format': 'stat',
              'index': false,
              /**
              * right now needed to match OUTPUT 'id' with this query (need to @fix)
              **/
              'q': [
                'data'
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.desc(timestamp)' }
                }
              ],
              'filter': [
                { 'metadata': { 'host': vm.host } },
                "r.row('metadata')('path').eq('os.cpus')"
                // "r.row('metadata')('path').ne('os.procs')"
              ]

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

const host_range_component = {
  params: function (_key, vm) {
    debug('PERIODICAL host_range_component %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['periodical.range', 'config.range', 'minute.range']
      key = ['periodical.range'] //, 'minute.range'
    }

    // debug('MyChart periodical CURRENT', this.prev.range[1], this.current.keys)

    if (
      _key
    ) {
      switch (_key) {
        case 'periodical.range':
          source = [{
            params: { id: _key },
            path: 'all',
            range: 'posix ' + roundMilliseconds(Date.now() - (6 * SECOND)) + '-' + roundMilliseconds(Date.now() - SECOND) + '/*',
            query: {
              'from': 'os',
              // 'register': 'changes',
              'format': 'stat',
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
                'data'
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.desc(timestamp)' }
                }
              ],
              'filter': [
                { 'metadata': { 'host': vm.host } },
                "r.row('metadata')('path').eq('os.cpus')"
                // "r.row('metadata')('path').ne('os.procs')"
              ]

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
  // host_once_register,
  host_once_component
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
