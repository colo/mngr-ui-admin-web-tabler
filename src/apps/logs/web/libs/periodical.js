
import * as Debug from 'debug'
const debug = Debug('apps:web:libs:periodical')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'
// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'

import static_types from '@libs/web/static_extentions'

export default function (data, metadata, key, vm) {
  // debug('PERIODICAL WEB CALLBACK data %s %o', key, data, metadata, vm)

  if (data.logs) {
    let _data
    if (data.logs) _data = data.logs // comes from 'Range'
    else _data = data // comes from 'register'

    // const END = vm.end()
    const TOP = vm.top
    let range = {start: undefined, end: undefined}
    let timestamp = _data[0].metadata.timestamp // comes sorted by timestamp in desc order, so first item has the biggest timestamp
    // let smallest_start = roundMilliseconds(timestamp - (5 * SECOND))
    // let smallest_start = vm.round(timestamp - vm.refresh)

    /**
    * Traffic
    **/
    let hosts_counter = {}
    let hosts_counter_ts = {}
    let domains_counter = {}
    let domains_counter_ts = {}
    let status_counter = {}
    let methods_counter = {}
    let pathnames_counter = {}
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
      let path = row.metadata.path

      let start = row.metadata.timestamp
      let end = row.metadata.timestamp

      if (/nginx|apache/.test(path)) { //  && start >= smallest_start discard any document that is previous to our smallest_start timestamp
        if (range.start === undefined || range.start > start) { range.start = start }
        if (range.end === undefined || range.end < end) { range.end = end }

        let host = row.metadata.host
        let domain = row.metadata.domain

        // hosts.combine([host])

        /**
        * Traffic
        **/
        if (!hosts_counter[host]) hosts_counter[host] = 0
        if (!domains_counter[domain]) domains_counter[domain] = 0

        hosts_counter[host] += 1
        if (!hosts_counter_ts[row.metadata.timestamp]) hosts_counter_ts[row.metadata.timestamp] = {}
        if (!hosts_counter_ts[row.metadata.timestamp][host]) hosts_counter_ts[row.metadata.timestamp][host] = 0
        hosts_counter_ts[row.metadata.timestamp][host] += 1

        domains_counter[domain] += 1

        if (!domains_counter_ts[row.metadata.timestamp]) domains_counter_ts[row.metadata.timestamp] = {}
        if (!domains_counter_ts[row.metadata.timestamp][domain]) domains_counter_ts[row.metadata.timestamp][domain] = 0
        domains_counter_ts[row.metadata.timestamp][domain] += 1

        /**
        * Traffic - status
        **/
        if (row.data.status) {
          if (!status_counter[row.metadata.timestamp]) status_counter[row.metadata.timestamp] = {}
          if (!status_counter[row.metadata.timestamp][row.data.status]) status_counter[row.metadata.timestamp][row.data.status] = 0
          status_counter[row.metadata.timestamp][row.data.status] += 1
        }

        /**
        * Traffic - method
        **/
        if (row.data.method) {
          if (!methods_counter[row.metadata.timestamp]) methods_counter[row.metadata.timestamp] = {}
          if (!methods_counter[row.metadata.timestamp][row.data.method]) methods_counter[row.metadata.timestamp][row.data.method] = 0
          methods_counter[row.metadata.timestamp][row.data.method] += 1
        }

        /**
        * Traffic - pathname
        **/
        if (row.data.pathname) {
          if (!pathnames_counter[row.metadata.timestamp]) pathnames_counter[row.metadata.timestamp] = {}
          if (!pathnames_counter[row.metadata.timestamp][row.data.pathname]) pathnames_counter[row.metadata.timestamp][row.data.pathname] = 0
          pathnames_counter[row.metadata.timestamp][row.data.pathname] += 1
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

          let world_map_city = (row.data.geoip.location && row.data.geoip.location.latitude && row.data.geoip.location.longitude) ? row.data.geoip.location.latitude + ':' + row.data.geoip.location.longitude : undefined
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

          debug('PERIODICAL WEB CALLBACK CITY %o', row, world_map_city_counter, world_map_city)
          if (world_map_city && world_map_city_name) world_map_city_counter[row.metadata.timestamp][world_map_city].count += 1

          debug('PERIODICAL WEB CALLBACK COUNTRY %o', row, world_map_country_counter, world_map_country, country_counter)
          if (world_map_country && country) world_map_country_counter[row.metadata.timestamp][world_map_country].count = country_counter[row.metadata.timestamp][country]
        }
      }
    })

    debug('PERIODICAL WEB CALLBACK data %s %o', key, data, metadata, vm)
    /**
    * Traffic
    **/

    /**
    * Traffic - host
    **/
    // let top_hosts_counter = {}
    // let _top_hosts_counter = []
    // Object.each(hosts_counter, function (data, host) {
    //   _top_hosts_counter.push(data)
    // })
    //
    // _top_hosts_counter = _top_hosts_counter.sort((a, b) => b - a)
    //
    // for (let i = 0; i < TOP; i++) {
    //   let value = _top_hosts_counter[i]
    //
    //   Object.each(hosts_counter, function (data, host) {
    //     if (data === value) {
    //       top_hosts_counter[host] = data
    //     }
    //   })
    // }
    let top_hosts_counter_by_ts = {}
    let _top_hosts_counter = []
    let _top_hosts_counter_tmp = {}
    let periodical_hosts_counter_props = {}
    Object.each(hosts_counter_ts, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete hosts_counter_ts[ts]
      // } else {
      Object.each(val, function (data, hosts) {
        // _top_hosts_counter.push({hosts: hosts, count: data})
        if (!_top_hosts_counter_tmp[hosts]) _top_hosts_counter_tmp[hosts] = 0
        _top_hosts_counter_tmp[hosts] += data
      })
      // }
    })
    Object.each(_top_hosts_counter_tmp, function (val, pathname) {
      _top_hosts_counter.push({hosts: pathname, count: val})
    })

    _top_hosts_counter = _top_hosts_counter.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })

    let _top_host = (_top_hosts_counter.length > TOP) ? TOP : _top_hosts_counter.length

    for (let i = 0; i < _top_host; i++) {
      let value = _top_hosts_counter[i]

      Object.each(hosts_counter_ts, function (data, ts) {
        // if (data[value.hosts]) {
        if (!top_hosts_counter_by_ts[ts]) top_hosts_counter_by_ts[ts] = {}
        top_hosts_counter_by_ts[ts][value.hosts] = data[value.hosts] || 0
        // }
      })
    }

    let top_hosts_counter = []
    Object.each(top_hosts_counter_by_ts, function (value, ts) {
      periodical_hosts_counter_props = Object.merge(periodical_hosts_counter_props, value)
      top_hosts_counter.push({timestamp: ts, value: value})
    })

    debug('PERIODICAL WEB HOSTS', hosts_counter_ts, _top_hosts_counter)

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_hosts_counter_props, function (val, prop) {
      Array.each(top_hosts_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    /**
    * Traffic - domain
    **/
    // let top_domains_counter = {}
    // let _top_domains_counter = []
    // Object.each(domains_counter, function (data, domain) {
    //   _top_domains_counter.push(data)
    // })
    //
    // _top_domains_counter = _top_domains_counter.sort((a, b) => b - a)
    //
    // for (let i = 0; i < TOP; i++) {
    //   let value = _top_domains_counter[i]
    //
    //   Object.each(domains_counter, function (data, domain) {
    //     if (data === value) {
    //       top_domains_counter[domain] = data
    //     }
    //   })
    // }

    let top_domains_counter_by_ts = {}
    let _top_domains_counter = []
    let _top_domains_counter_tmp = {}
    let periodical_domains_counter_props = {}
    Object.each(domains_counter_ts, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete domains_counter_ts[ts]
      // } else {
      Object.each(val, function (data, domains) {
        // _top_domains_counter.push({domains: domains, count: data})
        if (!_top_domains_counter_tmp[domains]) _top_domains_counter_tmp[domains] = 0
        _top_domains_counter_tmp[domains] += data
      })
      // }
    })
    Object.each(_top_domains_counter_tmp, function (val, pathname) {
      _top_domains_counter.push({domains: pathname, count: val})
    })

    _top_domains_counter = _top_domains_counter.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })

    let _top_domains = (_top_domains_counter.length > TOP) ? TOP : _top_domains_counter.length

    for (let i = 0; i < _top_domains; i++) {
      let value = _top_domains_counter[i]

      Object.each(domains_counter_ts, function (data, ts) {
        // if (data[value.domains]) {
        if (!top_domains_counter_by_ts[ts]) top_domains_counter_by_ts[ts] = {}
        top_domains_counter_by_ts[ts][value.domains] = data[value.domains] || 0
        // }
      })
    }

    let top_domains_counter = []
    Object.each(top_domains_counter_by_ts, function (value, ts) {
      periodical_domains_counter_props = Object.merge(periodical_domains_counter_props, value)
      top_domains_counter.push({timestamp: ts, value: value})
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_domains_counter_props, function (val, prop) {
      Array.each(top_domains_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    debug('PERIODICAL WEB DOMAINS', domains_counter_ts, top_domains_counter)
    /**
    * Traffic - status
    **/
    let periodical_status_counter = []
    let periodical_status_counter_props = {}
    Object.each(status_counter, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete status_counter[ts]
      // } else {
      // Object.each(val, function (data, status) {
      //   if (!periodical_status_counter[status]) periodical_status_counter[status] = 0
      //   periodical_status_counter[status] += data
      // })
      periodical_status_counter_props = Object.merge(periodical_status_counter_props, val)

      periodical_status_counter.push({timestamp: ts, value: val})
      // }
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
    * Traffic - method
    **/
    let periodical_methods_counter = []
    let periodical_methods_counter_props = {}
    Object.each(methods_counter, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete methods_counter[ts]
      // } else {
      // Object.each(val, function (data, method) {
      //   if (!periodical_methods_counter[method]) periodical_methods_counter[method] = 0
      //   periodical_methods_counter[method] += data
      // })
      periodical_methods_counter_props = Object.merge(periodical_methods_counter_props, val)

      periodical_methods_counter.push({timestamp: ts, value: val})
      // }
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_methods_counter_props, function (val, prop) {
      Array.each(periodical_methods_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    /**
    * Traffic - pathname
    **/
    // let periodical_pathnames_counter = []
    // let periodical_pathnames_counter_props = {}
    // Object.each(pathnames_counter, function (val, ts) {
    //   if (ts < smallest_start) {
    //     delete pathnames_counter[ts]
    //   } else {
    //     // Object.each(val, function (data, pathname) {
    //     //   if (!periodical_pathnames_counter[pathname]) periodical_pathnames_counter[pathname] = 0
    //     //   periodical_pathnames_counter[pathname] += data
    //     // })
    //     periodical_pathnames_counter_props = Object.merge(periodical_pathnames_counter_props, val)
    //
    //     periodical_pathnames_counter.push({timestamp: ts, value: val})
    //   }
    // })
    /**
    * add missing properties with 0 value
    **/
    // Object.each(periodical_pathnames_counter_props, function (val, prop) {
    //   Array.each(periodical_pathnames_counter, function (row) {
    //     if (!row.value[prop]) row.value[prop] = 0
    //   })
    // })
    //
    let top_pathnames_counter_by_ts = {}
    let _top_pathnames_counter = []
    let _top_pathnames_counter_tmp = {}
    let periodical_pathnames_counter_props = {}
    Object.each(pathnames_counter, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete pathnames_counter[ts]
      // } else {
      Object.each(val, function (data, pathnames) {
        // _top_pathnames_counter.push({pathnames: pathnames, count: data})
        if (!_top_pathnames_counter_tmp[pathnames]) _top_pathnames_counter_tmp[pathnames] = 0
        _top_pathnames_counter_tmp[pathnames] += data
      })
      // }
    })
    Object.each(_top_pathnames_counter_tmp, function (val, pathname) {
      _top_pathnames_counter.push({pathnames: pathname, count: val})
    })

    _top_pathnames_counter = _top_pathnames_counter.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })

    let _top_pathnames = (_top_pathnames_counter.length > TOP) ? TOP : _top_pathnames_counter.length

    for (let i = 0; i < _top_pathnames; i++) {
      let value = _top_pathnames_counter[i]

      Object.each(pathnames_counter, function (data, ts) {
        // if (data[value.pathnames]) {
        if (!top_pathnames_counter_by_ts[ts]) top_pathnames_counter_by_ts[ts] = {}
        top_pathnames_counter_by_ts[ts][value.pathnames] = data[value.pathnames] || 0
        // }
      })
    }

    let top_pathnames_counter = []
    Object.each(top_pathnames_counter_by_ts, function (value, ts) {
      periodical_pathnames_counter_props = Object.merge(periodical_pathnames_counter_props, value)
      top_pathnames_counter.push({timestamp: ts, value: value})
    })

    /**
    * add missing properties with 0 value
    **/
    Object.each(periodical_pathnames_counter_props, function (val, prop) {
      Array.each(top_pathnames_counter, function (row) {
        if (!row.value[prop]) row.value[prop] = 0
      })
    })

    // debug('PERIODICAL WEB PATHNAMES', pathnames_counter, _top_pathnames_counter, top_pathnames_counter_by_ts, top_pathnames_counter)
    /**
    * Traffic - bytes & requests
    **/
    let periodical_bytes_counter = []
    let periodical_requests_counter = []
    Object.each(total_bytes_sent, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete total_bytes_sent[ts]
      //   delete total_requests[ts]
      // } else {
      let hit = total_requests[ts]
      // periodical_bytes_counter += val
      // periodical_requests_counter += hit
      periodical_bytes_counter.push({timestamp: ts, value: { bytes: val} })
      periodical_requests_counter.push({timestamp: ts, value: { hits: hit } })
      // }
    })

    /**
    * Traffic - type (static | dynamic)
    **/
    let periodical_type_counter = []
    let periodical_type_counter_props = {}
    Object.each(type_counter, function (val, ts) {
      // if (ts < smallest_start) {
      //   delete type_counter[ts]
      // } else {
      // Object.each(val, function (data, type) {
      //   if (!periodical_type_counter[type]) periodical_type_counter[type] = 0
      //   periodical_type_counter[type] += data
      // })
      periodical_type_counter_props = Object.merge(periodical_type_counter_props, val)
      periodical_type_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete addr_counter[ts]
      // } else {
      Object.each(val, function (data, addr) {
        _top_addr_counter.push({addr: addr, count: data})
      })
      // }
    })

    _top_addr_counter = _top_addr_counter.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })

    let _top_addr = (_top_addr_counter.length > TOP) ? TOP : _top_addr_counter.length

    for (let i = 0; i < _top_addr; i++) {
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
      // if (ts < smallest_start) {
      //   delete user_counter[ts]
      // } else {
      // Object.each(val, function (data, user) {
      //   if (!periodical_user_counter[user]) periodical_user_counter[user] = 0
      //   periodical_user_counter[user] += data
      //
      // })
      periodical_user_counter_props = Object.merge(periodical_user_counter_props, val)
      periodical_user_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete referer_counter[ts]
      // } else {
      periodical_referer_counter_props = Object.merge(periodical_referer_counter_props, val)
      // Object.each(val, function (data, referer) {
      //   if (!periodical_referer_counter[referer]) periodical_referer_counter[referer] = 0
      //   periodical_referer_counter[referer] += data
      //
      // })
      periodical_referer_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete user_agent_os_counter[ts]
      // } else {
      // Object.each(val, function (data, os) {
      //   if (!periodical_user_agent_os_counter[os]) periodical_user_agent_os_counter[os] = 0
      //   periodical_user_agent_os_counter[os] += data
      //
      // })
      periodical_user_agent_os_counter_props = Object.merge(periodical_user_agent_os_counter_props, val)
      periodical_user_agent_os_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete user_agent_engine_counter[ts]
      // } else {
      // Object.each(val, function (data, engine) {
      //   if (!periodical_user_agent_engine_counter[engine]) periodical_user_agent_engine_counter[engine] = 0
      //   periodical_user_agent_engine_counter[engine] += data
      //
      // })

      periodical_user_agent_engine_counter_props = Object.merge(periodical_user_agent_engine_counter_props, val)
      periodical_user_agent_engine_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete user_agent_device_counter[ts]
      // } else {
      // Object.each(val, function (data, device) {
      //   if (!periodical_user_agent_device_counter[device]) periodical_user_agent_device_counter[device] = 0
      //   periodical_user_agent_device_counter[device] += data
      // })

      periodical_user_agent_device_counter_props = Object.merge(periodical_user_agent_device_counter_props, val)
      periodical_user_agent_device_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete user_agent_browser_counter[ts]
      // } else {
      // Object.each(val, function (data, browser) {
      //   if (!periodical_user_agent_browser_counter[browser]) periodical_user_agent_browser_counter[browser] = 0
      //   periodical_user_agent_browser_counter[browser] += data
      //
      // })

      periodical_user_agent_browser_counter_props = Object.merge(periodical_user_agent_browser_counter_props, val)
      periodical_user_agent_browser_counter.push({timestamp: ts, value: val})
      // }
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
      // if (ts < smallest_start) {
      //   delete city_counter[ts]
      //   delete country_counter[ts]
      //   delete continent_counter[ts]
      //   delete world_map_city_counter[ts]
      //   delete world_map_country_counter[ts]
      // } else {
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
      // }
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

    let _top_periodical_world_map_city = (periodical_world_map_city_counter.length > TOP) ? TOP : periodical_world_map_city_counter.length

    for (let i = 0; i < _top_periodical_world_map_city; i++) {
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

    let _top_periodical_world_map_country = (periodical_world_map_country_counter.length > TOP) ? TOP : periodical_world_map_country_counter.length

    for (let i = 0; i < _top_periodical_world_map_country; i++) {
      let data = periodical_world_map_country_counter[i]

      periodical_top_world_map_country_counter.push(data)
    }

    let top_city_counter = {}
    let _top_city_counter = []
    Object.each(periodical_city_counter, function (data, city) {
      _top_city_counter.push(data)
    })

    _top_city_counter = _top_city_counter.sort((a, b) => b - a)

    let _top_city = (_top_city_counter.length > TOP) ? TOP : _top_city_counter.length

    for (let i = 0; i < _top_city; i++) {
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

    let _top_country = (_top_country_counter.length > TOP) ? TOP : _top_country_counter.length

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
      methods_counter: periodical_methods_counter,
      // pathnames_counter: periodical_pathnames_counter,
      top_pathnames_counter: top_pathnames_counter,
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
      hosts_counter: hosts_counter,
      domains_counter: domains_counter,
      top_hosts_counter: top_hosts_counter,
      top_domains_counter: top_domains_counter
    }
  }
}
