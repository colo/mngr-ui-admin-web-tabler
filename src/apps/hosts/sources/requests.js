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

import static_types from '@libs/web/static_extentions'

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
    * Traffic
    **/
    let host_counter = {}
    let domain_counter = {}
    let status_counter = {}
    let type_counter = {}

    let addr_counter = {}
    let user_agent_os_counter = {}
    let user_agent_os_family_counter = {}
    let user_agent_engine_counter = {}
    let user_agent_browser_counter = {}
    let user_agent_device_counter = {}
    let user_counter = {}
    let referer_counter = {}

    let unique_visitors_ip_uas = {}

    let total_bytes_sent = {}
    let total_requests = {}

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
        * Traffic
        **/
        if (!host_counter[host]) host_counter[host] = 0
        if (!domain_counter[domain]) domain_counter[domain] = 0

        host_counter[host] += 1
        domain_counter[domain] += 1

        /**
        * Traffic - status
        **/
        if (row.data.status) {
          if (!status_counter[row.metadata.timestamp]) status_counter[row.metadata.timestamp] = {}
          if (!status_counter[row.metadata.timestamp][row.data.status]) status_counter[row.metadata.timestamp][row.data.status] = 0
          status_counter[row.metadata.timestamp][row.data.status] += 1
        }

        /**
        * Traffic - type (static | dynamic)
        **/
        if (row.data.pathname) {
          let value = (static_types.test(row.data.pathname)) ? 'static' : 'dynamic'
          if (!type_counter[row.metadata.timestamp]) type_counter[row.metadata.timestamp] = {}
          if (!type_counter[row.metadata.timestamp][value]) type_counter[row.metadata.timestamp][value] = 0
          type_counter[row.metadata.timestamp][value] += 1
        }

        /**
        * Traffic - requests
        **/
        if (!total_requests[row.metadata.timestamp]) total_requests[row.metadata.timestamp] = 0
        total_requests[row.metadata.timestamp] += 1

        /**
        * Traffic - bytes
        **/
        if (row.data.body_bytes_sent) {
          if (!total_bytes_sent[row.metadata.timestamp]) total_bytes_sent[row.metadata.timestamp] = 0
          total_bytes_sent[row.metadata.timestamp] += row.data.body_bytes_sent
        }

        /**
        * Traffic - addr
        * UNIQUE VISITORS are calculated with remote_addr + user_agent
        **/
        if (row.data.remote_addr) {
          let ip = row.data.remote_addr
          if (!addr_counter[row.metadata.timestamp]) addr_counter[row.metadata.timestamp] = {}
          if (!addr_counter[row.metadata.timestamp][ip]) addr_counter[row.metadata.timestamp][ip] = 0
          addr_counter[row.metadata.timestamp][ip] += 1

          if (!unique_visitors_ip_uas[ip]) unique_visitors_ip_uas[ip] = []
          if (row.data.remote_user) unique_visitors_ip_uas[ip].combine([JSON.stringify(row.data.user_agent)])
        }

        /** user_agent **/
        if (row.data.user_agent) {
          // debug('user_agent %s', row.data.user_agent)

          let os = row.data.user_agent.os.family
          os = (row.data.user_agent.os.major) ? os + ' ' + row.data.user_agent.os.major : os

          let engine = row.data.user_agent.engine.family
          // engine = (row.data.user_agent.engine.major) ? engine + ' ' + row.data.user_agent.engine.major : engine
          // engine = (row.data.user_agent.engine.minor) ? engine + '.' + row.data.user_agent.engine.minor : engine
          // engine = (row.data.user_agent.engine.patch) ? engine + '.' + row.data.user_agent.engine.patch : engine

          let browser = row.data.user_agent.ua.family
          // browser = (row.data.user_agent.ua.major) ? browser + ' ' + row.data.user_agent.ua.major : browser
          // browser = (row.data.user_agent.ua.minor) ? browser + '.' + row.data.user_agent.ua.minor : browser
          // browser = (row.data.user_agent.ua.patch) ? browser + '.' + row.data.user_agent.ua.patch : browser
          // browser = (row.data.user_agent.ua.type) ? browser + ' ' + row.data.user_agent.ua.type : browser

          let device = (row.data.user_agent.device.brand) ? row.data.user_agent.device.brand : row.data.user_agent.device.family
          device = (row.data.user_agent.device.model) ? device + ' ' + row.data.user_agent.device.model : device
          device = (row.data.user_agent.device.type) ? device + ' - ' + row.data.user_agent.device.type : device

          if (!user_agent_os_counter[row.metadata.timestamp]) user_agent_os_counter[row.metadata.timestamp] = {}
          if (!user_agent_os_counter[row.metadata.timestamp][os]) user_agent_os_counter[row.metadata.timestamp][os] = 0
          user_agent_os_counter[row.metadata.timestamp][os] += 1

          if (!user_agent_engine_counter[row.metadata.timestamp]) user_agent_engine_counter[row.metadata.timestamp] = {}
          if (!user_agent_engine_counter[row.metadata.timestamp][engine]) user_agent_engine_counter[row.metadata.timestamp][engine] = 0
          user_agent_engine_counter[row.metadata.timestamp][engine] += 1

          if (!user_agent_browser_counter[row.metadata.timestamp]) user_agent_browser_counter[row.metadata.timestamp] = {}
          if (!user_agent_browser_counter[row.metadata.timestamp][browser]) user_agent_browser_counter[row.metadata.timestamp][browser] = 0
          user_agent_browser_counter[row.metadata.timestamp][browser] += 1

          if (!user_agent_device_counter[row.metadata.timestamp]) user_agent_device_counter[row.metadata.timestamp] = {}
          if (!user_agent_device_counter[row.metadata.timestamp][device]) user_agent_device_counter[row.metadata.timestamp][device] = 0
          user_agent_device_counter[row.metadata.timestamp][device] += 1
        }

        /**
        * Traffic - remote user
        **/
        if (row.data.remote_user) {
          if (!user_counter[row.metadata.timestamp]) user_counter[row.metadata.timestamp] = {}
          if (!user_counter[row.metadata.timestamp][row.data.remote_user]) user_counter[row.metadata.timestamp][row.data.remote_user] = 0
          user_counter[row.metadata.timestamp][row.data.remote_user] += 1
        }

        /**
        * Traffic - referer
        **/
        if (row.data.referer.referer || row.data.referer.medium) {
          // debug('PERIODICAL HOST CALLBACK referer %o', row.data.referer.referer, row.data.referer.medium)
          let value = (row.data.referer.referer) ? row.data.referer.referer + ' - ' + row.data.referer.medium : row.data.referer.medium
          if (!referer_counter[row.metadata.timestamp]) referer_counter[row.metadata.timestamp] = {}
          if (!referer_counter[row.metadata.timestamp][value]) referer_counter[row.metadata.timestamp][value] = 0
          referer_counter[row.metadata.timestamp][value] += 1
        }

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
    * Traffic
    **/

    /**
    * Traffic - host
    **/
    let top_host_counter = {}
    let _top_host_counter = []
    Object.each(host_counter, function (data, host) {
      _top_host_counter.push(data)
    })

    _top_host_counter = _top_host_counter.sort((a, b) => b - a)

    for (let i = 0; i < TOP; i++) {
      let value = _top_host_counter[i]

      Object.each(host_counter, function (data, host) {
        if (data === value) {
          top_host_counter[host] = data
        }
      })
    }

    /**
    * Traffic - domain
    **/

    let top_domain_counter = {}
    let _top_domain_counter = []
    Object.each(domain_counter, function (data, domain) {
      _top_domain_counter.push(data)
    })

    _top_domain_counter = _top_domain_counter.sort((a, b) => b - a)

    for (let i = 0; i < TOP; i++) {
      let value = _top_domain_counter[i]

      Object.each(domain_counter, function (data, domain) {
        if (data === value) {
          top_domain_counter[domain] = data
        }
      })
    }

    /**
    * Traffic - status
    **/
    let periodical_status_counter = []
    let periodical_status_counter_props = {}
    Object.each(status_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete status_counter[ts]
      } else {
        // Object.each(val, function (data, status) {
        //   if (!periodical_status_counter[status]) periodical_status_counter[status] = 0
        //   periodical_status_counter[status] += data
        // })
        periodical_status_counter_props = Object.merge(periodical_status_counter_props, val)

        periodical_status_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_status_counter_props, function (val, prop) {
      Array.each(periodical_status_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    /**
    * Traffic - bytes & requests
    **/
    let periodical_bytes_counter = []
    let periodical_requests_counter = []
    Object.each(total_bytes_sent, function (val, ts) {
      if (ts < smallest_start) {
        delete total_bytes_sent[ts]
        delete total_requests[ts]
      } else {
        let hit = total_requests[ts]
        // periodical_bytes_counter += val
        // periodical_requests_counter += hit
        periodical_bytes_counter.push({timestamp: ts, value: { bytes: val} })
        periodical_requests_counter.push({timestamp: ts, value: { hits: hit } })
      }
    })

    /**
    * Traffic - type (static | dynamic)
    **/
    let periodical_type_counter = []
    let periodical_type_counter_props = {}
    Object.each(type_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete type_counter[ts]
      } else {
        // Object.each(val, function (data, type) {
        //   if (!periodical_type_counter[type]) periodical_type_counter[type] = 0
        //   periodical_type_counter[type] += data
        // })
        periodical_type_counter_props = Object.merge(periodical_type_counter_props, val)
        periodical_type_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_type_counter_props, function (val, prop) {
      Array.each(periodical_type_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    /**
    * Traffic - addr
    **/

    // let periodical_addr_counter = []
    // Object.each(addr_counter, function (val, ts) {
    //   if (ts < smallest_start) {
    //     delete addr_counter[ts]
    //   } else {
    //     // Object.each(val, function (data, addr) {
    //     //   // if (!periodical_addr_counter[addr]) periodical_addr_counter[addr] = 0
    //     //   // periodical_addr_counter[addr] += data
    //     //   let value = {}
    //     //   value[addr] = data
    //     //   periodical_addr_counter.push({timestamp: ts, value: value })
    //     // })
    //     periodical_addr_counter.push({timestamp: ts, value: val })
    //   }
    // })
    let top_addr_counter_by_ts = {}
    let _top_addr_counter = []
    Object.each(addr_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete addr_counter[ts]
      } else {
        Object.each(val, function (data, addr) {
          _top_addr_counter.push({addr: addr, count: data})
        })
      }
    })

    _top_addr_counter = _top_addr_counter.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })

    for (let i = 0; i < TOP; i++) {
      let value = _top_addr_counter[i]

      Object.each(addr_counter, function (data, ts) {
        // if (data[value.addr]) {
        if (!top_addr_counter_by_ts[ts]) top_addr_counter_by_ts[ts] = {}
        top_addr_counter_by_ts[ts][value.addr] = data[value.addr] || 0
        // }
      })
    }

    debug('PERIODICAL WEB ADDR', addr_counter, _top_addr_counter, top_addr_counter_by_ts)
    let top_addr_counter = []
    Object.each(top_addr_counter_by_ts, function (value, ts) {
      top_addr_counter.push({timestamp: ts, value: value})
    })
    /**
    * Traffic - user
    **/
    let periodical_user_counter = []
    let periodical_user_counter_props = {}
    Object.each(user_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete user_counter[ts]
      } else {
        // Object.each(val, function (data, user) {
        //   if (!periodical_user_counter[user]) periodical_user_counter[user] = 0
        //   periodical_user_counter[user] += data
        //
        // })
        periodical_user_counter_props = Object.merge(periodical_user_counter_props, val)
        periodical_user_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_user_counter_props, function (val, prop) {
      Array.each(periodical_user_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    /**
    * Traffic - referer
    **/
    let periodical_referer_counter = []
    let periodical_referer_counter_props = {}
    Object.each(referer_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete referer_counter[ts]
      } else {
        periodical_referer_counter_props = Object.merge(periodical_referer_counter_props, val)
        // Object.each(val, function (data, referer) {
        //   if (!periodical_referer_counter[referer]) periodical_referer_counter[referer] = 0
        //   periodical_referer_counter[referer] += data
        //
        // })
        periodical_referer_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_referer_counter_props, function (val, prop) {
      Array.each(periodical_referer_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    /**
    * Traffic - user agent
    **/
    let periodical_user_agent_os_counter = []
    let periodical_user_agent_os_counter_props = {}
    Object.each(user_agent_os_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete user_agent_os_counter[ts]
      } else {
        // Object.each(val, function (data, os) {
        //   if (!periodical_user_agent_os_counter[os]) periodical_user_agent_os_counter[os] = 0
        //   periodical_user_agent_os_counter[os] += data
        //
        // })
        periodical_user_agent_os_counter_props = Object.merge(periodical_user_agent_os_counter_props, val)
        periodical_user_agent_os_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_user_agent_os_counter_props, function (val, prop) {
      Array.each(periodical_user_agent_os_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    debug('PERIODICAL WEB TYPE', periodical_type_counter)

    let periodical_user_agent_engine_counter = []
    let periodical_user_agent_engine_counter_props = {}
    Object.each(user_agent_engine_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete user_agent_engine_counter[ts]
      } else {
        // Object.each(val, function (data, engine) {
        //   if (!periodical_user_agent_engine_counter[engine]) periodical_user_agent_engine_counter[engine] = 0
        //   periodical_user_agent_engine_counter[engine] += data
        //
        // })

        periodical_user_agent_engine_counter_props = Object.merge(periodical_user_agent_engine_counter_props, val)
        periodical_user_agent_engine_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_user_agent_engine_counter_props, function (val, prop) {
      Array.each(periodical_user_agent_engine_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    let periodical_user_agent_device_counter = []
    let periodical_user_agent_device_counter_props = {}
    Object.each(user_agent_device_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete user_agent_device_counter[ts]
      } else {
        // Object.each(val, function (data, device) {
        //   if (!periodical_user_agent_device_counter[device]) periodical_user_agent_device_counter[device] = 0
        //   periodical_user_agent_device_counter[device] += data
        // })

        periodical_user_agent_device_counter_props = Object.merge(periodical_user_agent_device_counter_props, val)
        periodical_user_agent_device_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_user_agent_device_counter_props, function (val, prop) {
      Array.each(periodical_user_agent_device_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    let periodical_user_agent_browser_counter = []
    let periodical_user_agent_browser_counter_props = {}
    Object.each(user_agent_browser_counter, function (val, ts) {
      if (ts < smallest_start) {
        delete user_agent_browser_counter[ts]
      } else {
        // Object.each(val, function (data, browser) {
        //   if (!periodical_user_agent_browser_counter[browser]) periodical_user_agent_browser_counter[browser] = 0
        //   periodical_user_agent_browser_counter[browser] += data
        //
        // })

        periodical_user_agent_browser_counter_props = Object.merge(periodical_user_agent_browser_counter_props, val)
        periodical_user_agent_browser_counter.push({timestamp: ts, value: val})
      }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_user_agent_browser_counter_props, function (val, prop) {
      Array.each(periodical_user_agent_browser_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })
    /**
    * @end Traffic - user agent
    **/

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

    vm.traffic = {
      status_counter: periodical_status_counter,
      type_counter: periodical_type_counter,
      bytes_counter: periodical_bytes_counter,
      requests_counter: periodical_requests_counter,
      // addr_counter: periodical_addr_counter,
      top_addr_counter: top_addr_counter,
      user_counter: periodical_user_counter,
      referer_counter: periodical_referer_counter,
      user_agent_os_counter: periodical_user_agent_os_counter,
      user_agent_engine_counter: periodical_user_agent_engine_counter,
      user_agent_device_counter: periodical_user_agent_device_counter,
      user_agent_browser_counter: periodical_user_agent_browser_counter,
      host_counter: host_counter,
      domain_counter: domain_counter,
      top_host_counter: top_host_counter,
      top_domain_counter: top_domain_counter
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
                {'metadata': ['host', 'timestamp', 'path', 'domain']}
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
