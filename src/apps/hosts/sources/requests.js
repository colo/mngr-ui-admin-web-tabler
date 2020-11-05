import * as Debug from 'debug'
const debug = Debug('apps:hosts:periodical:requests')
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

const os_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL OS CALLBACK data %s %o', key, data, metadata)

  /**
  * tabular
  **/
  // if(data.os){
  //   let arr = []
  //   Object.each(data.os['os.memory'], function (row, name) {
  //     if (name === 'cores') {
  //       arr = row
  //     } else {
  //       Array.each(row, function (column, index) {
  //         arr[index].push(column[1])
  //       })
  //     }
  //   })
  //
  //   debug('PERIODICAL OS CALLBACK data %s %o', key, data, arr)
  //   vm.$set(vm.memory_stat, 'data', [arr])
  // }
  /**
  * stat
  **/
  if (data.os) {
    let hosts_memory = {}
    let hosts_cpus = {}
    let hosts_loadavg = {}
    let hosts_uptime = {}
    let hosts_blocks = {}
    let hosts_net = {}

    Array.each(data.os, function (row) {
      let path = row.metadata.path
      let host = row.metadata.host

      /**
      * MEMORY
      **/
      if (path === 'os.memory') {
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.host === host) {
          if (!hosts_memory[host] || hosts_memory[host].metadata.timestamp < row.metadata.timestamp) {
            hosts_memory[host] = row
          }
        }
      }

      /**
      * CPUS
      **/

      if (path === 'os.cpus') {
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.host === host) {
          if (!hosts_cpus[host] || hosts_cpus[host].metadata.timestamp < row.metadata.timestamp) {
            hosts_cpus[host] = row
          }
        }
      }

      /**
      * Loadavg
      **/

      if (path === 'os.loadavg') {
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.host === host) {
          if (!hosts_loadavg[host] || hosts_loadavg[host].metadata.timestamp < row.metadata.timestamp) {
            hosts_loadavg[host] = row
          }
        }
      }

      /**
      * Uptime
      **/

      if (path === 'os.uptime') {
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.host === host) {
          if (!hosts_uptime[host] || hosts_uptime[host].metadata.timestamp < row.metadata.timestamp) {
            hosts_uptime[host] = row
          }
        }
      }

      /**
      * Blocks
      **/

      if (/^os\.mounts\..*\.blocks.*/.test(path)) {
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.host === host) {
          if (!hosts_blocks[host] || !hosts_blocks[host][path] || hosts_blocks[host][path].metadata.timestamp < row.metadata.timestamp) {
            if (!hosts_blocks[host]) hosts_blocks[host] = {}
            hosts_blocks[host][path] = row
          }
        }
      }

      /**
      * NET BYTES
      **/
      if (
        /^os\.networkInterfaces.*/.test(path) &&
        (/^os\.networkInterfaces\.eth.*\.bytes$/.test(path) ||
              /^os\.networkInterfaces\.eno.*\.bytes$/.test(path) ||
              /^os\.networkInterfaces\.enp.*\.bytes$/.test(path) ||
              /^os\.networkInterfaces\.vlan.*\.bytes$/.test(path) ||
              /^os\.networkInterfaces\.vnet.*\.bytes$/.test(path)
        )
      ) { // derived
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.host === host) {
          // if (!hosts_net[host] || !hosts_net[host][path] || hosts_net[host][path].metadata.timestamp < row.metadata.timestamp) {
          //   if (!hosts_net[host]) hosts_net[host] = {}
          //   hosts_net[host][path] = row
          // }

          /**
          * full range (all bytes from all seconds)
          **/
          if (!hosts_net[host] || !hosts_net[host][path]) {
            if (!hosts_net[host]) hosts_net[host] = {}
            hosts_net[host][path] = row
          } else {
            hosts_net[host][path].data.recived += row.data.recived
            hosts_net[host][path].data.transmited += row.data.transmited
          }
        }
      }
    })

    /**
    * MEMORY
    **/
    let memory = {timestamp: Date.now(), value: {freemem: 0, totalmem: 0}}
    Object.each(hosts_memory, function (row) {
      memory.value.freemem += row.data.freemem
      memory.value.totalmem += row.data.totalmem
    })

    /**
    * CPUS
    **/
    let cpus = {timestamp: Date.now(), value: {}}
    Object.each(hosts_cpus, function (row) {
      Object.each(row.data, function (val, prop) {
        if (!cpus.value[prop]) cpus.value[prop] = 0
        cpus.value[prop] += val
      })
    })

    /**
    * Loadavg
    **/
    let loadavg = {timestamp: Date.now(), value: {}}
    Object.each(hosts_loadavg, function (row) {
      Object.each(row.data, function (val, prop) {
        if (!loadavg.value[prop]) loadavg.value[prop] = 0
        loadavg.value[prop] += val
      })
    })

    /**
    * Uptime
    **/
    let uptime = {timestamp: Date.now(), value: {}}
    Object.each(hosts_uptime, function (row) {
      Object.each(row.data, function (val, prop) {
        if (!uptime.value[prop]) uptime.value[prop] = 0
        uptime.value[prop] += val
      })
    })

    /**
    * Blocks
    **/
    let blocks = {timestamp: Date.now(), value: {}}

    Object.each(hosts_blocks, function (row, host) {
      Object.each(row, function (data, path) {
        Object.each(data.data, function (val, prop) {
          if (!blocks.value[prop]) blocks.value[prop] = 0
          blocks.value[prop] += val
        })
      })
      // debug('hosts_blocks row', row.data.recived, row.data.transmited)

      // Object.each(row.data, function (val, prop) {
      //
      // //   if (!blocks.value[prop]) blocks.value[prop] = 0
      // //   blocks.value[prop] += val
      // })
    })
    /**
    * NET BYTES
    **/
    let net_in = {timestamp: Date.now(), value: 0}
    let net_out = {timestamp: Date.now(), value: 0}

    Object.each(hosts_net, function (row) {
      Object.each(row, function (iface) {
        net_in.value += (iface.data.recived && !isNaN(iface.data.recived)) ? iface.data.recived : 0
        net_out.value += (iface.data.recived && !isNaN(iface.data.recived)) ? iface.data.transmited : 0
      })
      // debug('hosts_net row', row.data.recived, row.data.transmited)

      // Object.each(row.data, function (val, prop) {
      //
      // //   if (!net.value[prop]) net.value[prop] = 0
      // //   net.value[prop] += val
      // })
    })

    // debug('PERIODICAL OS CALLBACK data %s %o', key, cpus, memory, net_in, net_out, hosts_blocks, blocks)
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
    // debug('PERIODICAL OS CALLBACK data %s %o', key, data, arr)
    vm.stat_memory = [memory]
    vm.stat_cpus = [cpus]
    vm.stat_loadavg = [loadavg]
    vm.stat_uptime = [uptime]
    vm.stat_blocks = [blocks]
    vm.stat_net_in = [net_in]
    vm.stat_net_out = [net_out]
  }
}

const web_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL WEB CALLBACK data %s %o', key, data, metadata)

  if (data.logs) {
    let _data
    if (data.logs) _data = data.logs // comes from 'Range'
    else _data = data // comes from 'register'

    // const END = vm.end()
    const TOP = vm.top
    let range = {start: undefined, end: undefined}
    let timestamp = _data[0].metadata.timestamp // comes sorted by timestamp in desc order, so first item has the biggest timestamp
    let smallest_start = roundMilliseconds(timestamp - (5 * SECOND))

    /**
    * GeoIP
    **/
    let city_counter = {}
    let country_counter = {}
    let continent_counter = {}
    let world_map_city_counter = {}
    let world_map_country_counter = {}
    let _tmp_periodical_world_map_city_counter = {}
    let _tmp_periodical_world_map_country_counter = {}

    let geoip = []

    Array.each(data.logs, function (row) {
      let start = row.metadata.timestamp
      let end = row.metadata.timestamp

      if (start >= smallest_start) { // discard any document that is previous to our smallest_start timestamp
        if (range.start === undefined || range.start > start) { range.start = start }
        if (range.end === undefined || range.end < end) { range.end = end }

        let host = row.metadata.host
        let domain = row.metadata.domain

        /**
        * GeoIP
        **/
        if (row.data.geoip) {
          geoip.push(row.data.geoip)

          let country = (row.data.geoip.country) ? (row.data.geoip.country.names) ? (row.data.geoip.country.names.en) ? row.data.geoip.country.names.en : row.data.geoip.country.names.es : undefined : undefined
          let continent = (row.data.geoip.continent) ? (row.data.geoip.continent.names) ? (row.data.geoip.continent.names.en) ? row.data.geoip.continent.names.en : row.data.geoip.continent.names.es : undefined : undefined
          let city = (row.data.geoip.city && country) ? (row.data.geoip.city.names) ? (row.data.geoip.city.names.en) ? row.data.geoip.city.names.en + ' - ' + country : row.data.geoip.city.names.es + ' - ' + country : undefined : undefined

          let world_map_city = (row.data.geoip.location && row.data.geoip.location.latitude && row.data.geoip.location.longitude) ? row.data.geoip.location + ':' + row.data.geoip.location.latitude : undefined
          let world_map_city_name = (row.data.geoip.city) ? (row.data.geoip.city.names) ? (row.data.geoip.city.names.en) ? row.data.geoip.city.names.en + ' - ' + country : row.data.geoip.city.names.es + ' - ' + country : undefined : undefined

          let world_map_country = (row.data.geoip.country && row.data.geoip.country.isoCode) ? row.data.geoip.country.isoCode : undefined

          if (city && !city_counter[row.metadata.timestamp]) city_counter[row.metadata.timestamp] = {}
          if (country && !country_counter[row.metadata.timestamp]) country_counter[row.metadata.timestamp] = {}
          if (continent && !continent_counter[row.metadata.timestamp]) continent_counter[row.metadata.timestamp] = {}

          if (world_map_city && world_map_city_name && !world_map_city_counter[row.metadata.timestamp]) world_map_city_counter[row.metadata.timestamp] = {}

          if (world_map_country && country && !world_map_country_counter[row.metadata.timestamp]) world_map_country_counter[row.metadata.timestamp] = {}

          if (city && country && !city_counter[row.metadata.timestamp][city]) city_counter[row.metadata.timestamp][city] = 0
          if (country && !country_counter[row.metadata.timestamp][country]) country_counter[row.metadata.timestamp][country] = 0
          if (continent && !continent_counter[row.metadata.timestamp][continent]) continent_counter[row.metadata.timestamp][continent] = 0

          if (world_map_city && world_map_city_name && !world_map_city_counter[row.metadata.timestamp][world_map_city]) world_map_city_counter[row.metadata.timestamp][world_map_city] = { name: world_map_city_name, count: 0, latitude: row.data.geoip.location.latitude, longitude: row.data.geoip.location.longitude }

          if (world_map_country && country && !world_map_city_counter[row.metadata.timestamp][world_map_country]) world_map_country_counter[row.metadata.timestamp][world_map_country] = {name: country, count: 0}

          if (city) { city_counter[row.metadata.timestamp][city] += 1 }
          if (country) country_counter[row.metadata.timestamp][country] += 1
          if (continent) continent_counter[row.metadata.timestamp][continent] += 1

          if (world_map_city && world_map_city_name) world_map_city_counter[row.metadata.timestamp][world_map_city].count += 1

          if (world_map_country && country) world_map_country_counter[row.metadata.timestamp][world_map_country].count = country_counter[row.metadata.timestamp][country]
        }
      }
    })

    /**
    * GeoIP
    **/
    let periodical_city_counter = {}
    let periodical_country_counter = {}
    let periodical_continent_counter = {}

    Object.each(city_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete city_counter[ts]
        delete country_counter[ts]
        delete continent_counter[ts]
        delete world_map_city_counter[ts]
        delete world_map_country_counter[ts]
      } else {
        let country_val = country_counter[ts]
        let continent_val = continent_counter[ts]
        let world_map_city_val = world_map_city_counter[ts]
        let world_map_country_val = world_map_country_counter[ts]

        Object.each(val, function (data, city) {
          if (!periodical_city_counter[city]) periodical_city_counter[city] = 0
          periodical_city_counter[city] += data
        })

        Object.each(country_val, function (data, country) {
          if (!periodical_country_counter[country]) periodical_country_counter[country] = 0
          periodical_country_counter[country] += data
        })

        Object.each(continent_val, function (data, continent) {
          if (!periodical_continent_counter[continent]) periodical_continent_counter[continent] = 0
          periodical_continent_counter[continent] += data
        })

        Object.each(world_map_city_val, function (data, world_map_city) {
          // if (!periodical_continent_counter[continent]) periodical_continent_counter[continent] = 0
          // periodical_continent_counter[continent] += data

          if (!_tmp_periodical_world_map_city_counter[world_map_city]) {
            _tmp_periodical_world_map_city_counter[world_map_city] = data
          } else {
            _tmp_periodical_world_map_city_counter[world_map_city].count += data.count
          }
        })

        Object.each(world_map_country_val, function (data, world_map_country) {
          // if (!periodical_continent_counter[continent]) periodical_continent_counter[continent] = 0
          // periodical_continent_counter[continent] += data

          if (!_tmp_periodical_world_map_country_counter[world_map_country]) {
            _tmp_periodical_world_map_country_counter[world_map_country] = data
          } else {
            _tmp_periodical_world_map_country_counter[world_map_country].count += data.count
          }
        })
      }
    })

    let periodical_world_map_city_counter = []

    let periodical_top_world_map_city_counter = []

    Object.each(_tmp_periodical_world_map_city_counter, function (data, world_map_city) {
      periodical_world_map_city_counter.push({
        title: data.name + ' ( hits: ' + data.count + ' )',
        latitude: data.latitude,
        longitude: data.longitude,
        count: data.count,
      })
    })

    periodical_world_map_city_counter = periodical_world_map_city_counter.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0))

    for (let i = 0; i < TOP; i++) {
      let data = periodical_world_map_city_counter[i]

      periodical_top_world_map_city_counter.push(data)
    }

    /**
    * COUNTRY
    **/
    let periodical_world_map_country_counter = []

    let periodical_top_world_map_country_counter = []

    Object.each(_tmp_periodical_world_map_country_counter, function (data, world_map_country) {
      periodical_world_map_country_counter.push({
        id: world_map_country,
        title: data.name + ' ( hits: ' + data.count + ' )',
        name: data.name,
        count: data.count,
      })
    })

    periodical_world_map_country_counter = periodical_world_map_country_counter.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0))

    for (let i = 0; i < TOP; i++) {
      let data = periodical_world_map_country_counter[i]

      periodical_top_world_map_country_counter.push(data)
    }

    let top_city_counter = {}
    let _top_city_counter = []
    Object.each(periodical_city_counter, function (data, city) {
      _top_city_counter.push(data)
    })

    _top_city_counter = _top_city_counter.sort((a, b) => b - a)

    for (let i = 0; i < TOP; i++) {
      let value = _top_city_counter[i]

      Object.each(periodical_city_counter, function (data, city) {
        if (data === value) {
          top_city_counter[city] = data
        }
      })
    }

    let top_country_counter = {}
    let _top_country_counter = []
    Object.each(periodical_country_counter, function (data, country) {
      _top_country_counter.push(data)
    })

    _top_country_counter = _top_country_counter.sort((a, b) => b - a)

    for (let i = 0; i < TOP; i++) {
      let value = _top_country_counter[i]

      Object.each(periodical_country_counter, function (data, country) {
        if (data === value) {
          top_country_counter[country] = data
        }
      })
    }

    debug('PERIODICAL WEB GEOIP',
      periodical_city_counter,
      periodical_country_counter,
      top_city_counter,
      top_country_counter,
      periodical_continent_counter,
      periodical_world_map_city_counter,
      periodical_top_world_map_city_counter,
      periodical_world_map_country_counter,
      periodical_top_world_map_country_counter
    )

    // vm.stat_world_map_country_counter = periodical_world_map_country_counter
    // vm.stat_world_map_city_counter = periodical_world_map_city_counter
    vm.geodata = {
      city_counter: periodical_city_counter,
      country_counter: periodical_country_counter,
      top_city_counter: top_city_counter,
      top_country_counter: top_country_counter,
      continent_counter: periodical_continent_counter,
      world_map_city_counter: periodical_world_map_city_counter,
      top_world_map_city_counter: periodical_top_world_map_city_counter,
      world_map_country_counter: periodical_world_map_country_counter,
      top_world_map_country_counter: periodical_top_world_map_country_counter
    }
  }
}

const generic_callback = function (data, metadata, key, vm) {
  debug('PERIODICAL HOST CALLBACK data %s %o', key, data, metadata)
  if (key === 'os.periodical') { os_callback(data, metadata, key, vm) }

  if (key === 'nginx.periodical') { web_callback(data, metadata, key, vm) }
}

const host_range_component = {
  params: function (_key, vm) {
    // debug('PERIODICAL host_range_component %o %o', _key, vm)

    // const MINUTE = 60000

    let source
    let key

    if (!_key) {
      // key = ['host.periodical', 'config.range', 'minute.range']
      key = ['os.periodical', 'nginx.periodical'] //, 'minute.range'
    }

    let filter = [
      // "this.r.row('metadata')('path').eq('os.memory').or(this.r.row('metadata')('path').eq('os.cpus'))"
    ]

    if (vm.host) {
      filter.push({ 'metadata': { 'host': vm.host } })
    }

    let os_filter = Array.clone(filter)
    let logs_nginx_filter = Array.clone(filter)
    logs_nginx_filter.push({ 'metadata': { 'path': 'logs.nginx' } })

    if (
      _key
    ) {
      switch (_key) {
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

        case 'nginx.periodical':
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
                {'metadata': ['host', 'timestamp', 'path']}
              ],
              'transformation': [
                {
                  'orderBy': { 'index': 'r.desc(timestamp)' }
                }
              ],
              'filter': logs_nginx_filter

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
