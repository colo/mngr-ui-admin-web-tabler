
import * as Debug from 'debug'
const debug = Debug('apps:system:libs:periodical')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'
// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'

export default function (data, metadata, key, vm) {
  try {
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

      let memory = {timestamp: Date.now(), value: {freemem: 0, totalmem: 0}}
      let cpus = {timestamp: Date.now(), value: {}}
      let loadavg = {timestamp: Date.now(), value: {}}
      let uptime = {timestamp: Date.now(), value: {}}
      let blocks = {timestamp: Date.now(), value: {}}

      let net_in = {timestamp: Date.now(), value: 0}
      let net_out = {timestamp: Date.now(), value: 0}

      let stats = {
        all: {}
      }

      Array.each(data.os, function (row) {
        let path = row.metadata.path
        let host = row.metadata.host

        if (!stats[host]) stats[host] = {}
        // hosts.combine([host])
        /**
        * MEMORY
        **/
        if (path === 'os.memory') {
          if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
            if (!stats[host][path]) stats[host][path] = {timestamp: 0, value: {}}

            if (stats[host][path].timestamp < row.metadata.timestamp) {
              stats[host][path].timestamp = row.metadata.timestamp
              stats[host][path].value = row.data
              // // stats[host][path].value.totalmem = row.data.totalmem
              // Object.each(row.data, function (val, prop) {
              //   // if (!stats[host][path].value[prop]) cpus.value[prop] = 0
              //   stats[host][path].value[prop] += val
              // })
            }

            // if (!hosts_memory[host] || hosts_memory[host].metadata.timestamp < row.metadata.timestamp) {
            //   hosts_memory[host] = row
            //
            //   memory.value.freemem += row.data.freemem
            //   memory.value.totalmem += row.data.totalmem
            // }
          }
        } else if (path === 'os.cpus') {
          if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
            if (!stats[host][path]) stats[host][path] = {timestamp: 0, value: {}}

            if (stats[host][path].timestamp < row.metadata.timestamp) {
              stats[host][path].timestamp = row.metadata.timestamp
              stats[host][path].value = row.data
              // // stats[host][path].value.totalmem = row.data.totalmem
              // Object.each(row.data, function (val, prop) {
              //   // if (!stats[host][path].value[prop]) cpus.value[prop] = 0
              //   stats[host][path].value[prop] += val
              // })
            }

            // if (!hosts_cpus[host] || hosts_cpus[host].metadata.timestamp < row.metadata.timestamp) {
            //   hosts_cpus[host] = row
            //
            //   Object.each(row.data, function (val, prop) {
            //     if (!cpus.value[prop]) cpus.value[prop] = 0
            //     cpus.value[prop] += val
            //   })
            // }
          }
        } else if (path === 'os.loadavg') {
          if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
            if (!stats[host][path]) stats[host][path] = {timestamp: 0, value: {}}

            if (stats[host][path].timestamp < row.metadata.timestamp) {
              stats[host][path].timestamp = row.metadata.timestamp
              stats[host][path].value = row.data
              // // stats[host][path].value.totalmem = row.data.totalmem
              // Object.each(row.data, function (val, prop) {
              //   // if (!stats[host][path].value[prop]) cpus.value[prop] = 0
              //   stats[host][path].value[prop] += val
              // })
            }

            // if (!hosts_loadavg[host] || hosts_loadavg[host].metadata.timestamp < row.metadata.timestamp) {
            //   hosts_loadavg[host] = row
            //
            //   Object.each(row.data, function (val, prop) {
            //     if (!loadavg.value[prop]) loadavg.value[prop] = 0
            //     loadavg.value[prop] += val
            //   })
            // }
          }
        } else if (path === 'os.uptime') {
          if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
            if (!stats[host][path]) stats[host][path] = {timestamp: 0, value: {}}

            if (stats[host][path].timestamp < row.metadata.timestamp) {
              stats[host][path].timestamp = row.metadata.timestamp
              stats[host][path].value = row.data
              // // stats[host][path].value.totalmem = row.data.totalmem
              // Object.each(row.data, function (val, prop) {
              //   // if (!stats[host][path].value[prop]) cpus.value[prop] = 0
              //   stats[host][path].value[prop] += val
              // })
            }
            // if (!hosts_uptime[host] || hosts_uptime[host].metadata.timestamp < row.metadata.timestamp) {
            //   hosts_uptime[host] = row
            //
            //   Object.each(row.data, function (val, prop) {
            //     if (!uptime.value[prop]) uptime.value[prop] = 0
            //     uptime.value[prop] += val
            //   })
            // }
          }
        } else if (/^os\.mounts\..*\.blocks.*/.test(path)) {
          if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
            if (!stats[host][path]) stats[host][path] = {timestamp: 0, value: {}}

            if (stats[host][path].timestamp < row.metadata.timestamp) {
              stats[host][path].timestamp = row.metadata.timestamp
              stats[host][path].value = row.data
              // // stats[host][path].value.totalmem = row.data.totalmem
              // Object.each(row.data, function (val, prop) {
              //   // if (!stats[host][path].value[prop]) cpus.value[prop] = 0
              //   stats[host][path].value[prop] += val
              // })
            }

            // if (!hosts_blocks[host] || !hosts_blocks[host][path] || hosts_blocks[host][path].metadata.timestamp < row.metadata.timestamp) {
            //   if (!hosts_blocks[host]) hosts_blocks[host] = {}
            //   hosts_blocks[host][path] = row
            //
            //   // Object.each(row, function (data, path) {
            //   Object.each(row.data, function (val, prop) {
            //     if (!blocks.value[prop]) blocks.value[prop] = 0
            //     blocks.value[prop] += val
            //   })
            //   // })
            // }
          }
        } else if (
          /^os\.networkInterfaces.*/.test(path) &&
          (/^os\.networkInterfaces\.eth.*\.bytes$/.test(path) ||
                /^os\.networkInterfaces\.eno.*\.bytes$/.test(path) ||
                /^os\.networkInterfaces\.enp.*\.bytes$/.test(path) ||
                /^os\.networkInterfaces\.vlan.*\.bytes$/.test(path) ||
                /^os\.networkInterfaces\.vnet.*\.bytes$/.test(path)
          )
        ) {
          if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
            if (!stats[host][path]) stats[host][path] = {timestamp: 0, value: {}}

            if (stats[host][path].timestamp < row.metadata.timestamp) {
              stats[host][path].timestamp = row.metadata.timestamp
              stats[host][path].value = row.data
              // // stats[host][path].value.totalmem = row.data.totalmem
              // Object.each(row.data, function (val, prop) {
              //   // if (!stats[host][path].value[prop]) cpus.value[prop] = 0
              //   stats[host][path].value[prop] += val
              // })
            }

            // if (!hosts_net[host]) hosts_net[host] = {}
            //
            // if (!hosts_net[host][path] || hosts_net[host][path].metadata.timestamp < row.metadata.timestamp) {
            //   hosts_net[host][path] = row
            //
            //   // debug('NET', row.data)
            //   // Object.each(row.data, function (iface) {
            //   net_in.value += (row.data.recived && !isNaN(row.data.recived)) ? row.data.recived : 0
            //   net_out.value += (row.data.transmited && !isNaN(row.data.transmited)) ? row.data.transmited : 0
            //   // })
            // }
          }
        }
      })

      /**
      * MEMORY
      **/
      // let memory = {timestamp: Date.now(), value: {freemem: 0, totalmem: 0}}
      // Object.each(hosts_memory, function (row) {
      //   memory.value.freemem += row.data.freemem
      //   memory.value.totalmem += row.data.totalmem
      // })

      /**
      * CPUS
      **/
      // let cpus = {timestamp: Date.now(), value: {}}
      // Object.each(hosts_cpus, function (row) {
      //   Object.each(row.data, function (val, prop) {
      //     if (!cpus.value[prop]) cpus.value[prop] = 0
      //     cpus.value[prop] += val
      //   })
      // })

      /**
      * Loadavg
      **/
      // let loadavg = {timestamp: Date.now(), value: {}}
      // Object.each(hosts_loadavg, function (row) {
      //   Object.each(row.data, function (val, prop) {
      //     if (!loadavg.value[prop]) loadavg.value[prop] = 0
      //     loadavg.value[prop] += val
      //   })
      // })

      /**
      * Uptime
      **/
      // let uptime = {timestamp: Date.now(), value: {}}
      // Object.each(hosts_uptime, function (row) {
      //   Object.each(row.data, function (val, prop) {
      //     if (!uptime.value[prop]) uptime.value[prop] = 0
      //     uptime.value[prop] += val
      //   })
      // })

      /**
      * Blocks
      **/
      // let blocks = {timestamp: Date.now(), value: {}}
      //
      // Object.each(hosts_blocks, function (row, host) {
      //   Object.each(row, function (data, path) {
      //     Object.each(data.data, function (val, prop) {
      //       if (!blocks.value[prop]) blocks.value[prop] = 0
      //       blocks.value[prop] += val
      //     })
      //   })
      // })
      /**
      * NET BYTES
      **/
      // let net_in = {timestamp: Date.now(), value: 0}
      // let net_out = {timestamp: Date.now(), value: 0}
      //
      // debug('hosts_net', JSON.parse(JSON.stringify(hosts_net)))
      //
      // Object.each(hosts_net, function (row) {
      //   Object.each(row, function (iface) {
      //     net_in.value += (iface.data.recived && !isNaN(iface.data.recived)) ? iface.data.recived : 0
      //     net_out.value += (iface.data.transmited && !isNaN(iface.data.transmited)) ? iface.data.transmited : 0
      //   })
      //   // debug('hosts_net row', row.data.recived, row.data.transmited)
      //
      //   // Object.each(row.data, function (val, prop) {
      //   //
      //   // //   if (!net.value[prop]) net.value[prop] = 0
      //   // //   net.value[prop] += val
      //   // })
      // })

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

      // vm.stat_memory = [memory]
      // vm.stat_cpus = [cpus]
      // vm.stat_loadavg = [loadavg]
      // vm.stat_uptime = [uptime]
      // vm.stat_blocks = [blocks]
      // vm.stat_net_in = [net_in]
      // vm.stat_net_out = [net_out]
      // vm.stats['all']['memory'] = [stats['all']['os.memory']]
      Object.each(stats, function (data, host) {
        Object.each(data, function (stat, path) {
          if (
            /^os\.networkInterfaces.*/.test(path) &&
            (/^os\.networkInterfaces\.eth.*\.bytes$/.test(path) ||
                  /^os\.networkInterfaces\.eno.*\.bytes$/.test(path) ||
                  /^os\.networkInterfaces\.enp.*\.bytes$/.test(path) ||
                  /^os\.networkInterfaces\.vlan.*\.bytes$/.test(path) ||
                  /^os\.networkInterfaces\.vnet.*\.bytes$/.test(path)
            )
          ) {
            let _path = 'os.networkInterfaces.bytes'

            // if (!stats['all'][_path]) stats['all'][_path] = { timestamp: Date.now(), value: {} }
            // if (!stats[host][_path]) stats[host][_path] = { timestamp: Date.now(), value: {} }

            Object.each(stat.value, function (val, prop) {
              if (!stats['all'][_path + '.' + prop]) stats['all'][_path + '.' + prop] = { timestamp: Date.now(), value: 0 }
              if (!stats[host][_path + '.' + prop]) stats[host][_path + '.' + prop] = { timestamp: Date.now(), value: 0 }

              // if (!stats['all'][_path].value[prop]) stats['all'][_path].value[prop] = 0
              // if (!stats[host][_path].value[prop]) stats[host][_path].value[prop] = 0

              // stats['all'][_path].value[prop] += val
              // stats[host][_path].value[prop] += val
              stats['all'][_path + '.' + prop].value += val
              stats[host][_path + '.' + prop].value += val
            })
            // if (!stats[host]['os.networkInterfaces.bytes']) stats[host]['os.networkInterfaces.bytes'] = { timestamp: Date.now(), value: stat.value }
            //

            delete stats[host][path]
          } else if (/^os\.mounts\..*\.blocks.*/.test(path)) {
            let _path = 'os.blocks'

            if (!stats['all'][_path]) stats['all'][_path] = { timestamp: Date.now(), value: {} }
            if (!stats[host][_path]) stats[host][_path] = { timestamp: Date.now(), value: {} }

            Object.each(stat.value, function (val, prop) {
              if (!stats['all'][_path].value[prop]) stats['all'][_path].value[prop] = 0
              if (!stats[host][_path].value[prop]) stats[host][_path].value[prop] = 0

              stats['all'][_path].value[prop] += val
              stats[host][_path].value[prop] += val
            })

            delete stats[host][path]
          } else {
            if (!stats['all'][path]) stats['all'][path] = { timestamp: Date.now(), value: {} }

            Object.each(stat.value, function (val, prop) {
              if (!stats['all'][path].value[prop]) stats['all'][path].value[prop] = 0

              stats['all'][path].value[prop] += val
            })
          }
        })
      })

      debug('PERIODICAL OS CALLBACK STATS %o', stats)
      vm.stats = stats
      // vm.stats['all']['memory'] = [memory]
      // vm.stats['all']['cpus'] = [cpus]
      // vm.stats['all']['loadavg'] = [loadavg]
      // vm.stats['all']['uptime'] = [uptime]
      // vm.stats['all']['blocks'] = [blocks]
      // vm.stats['all']['net_in'] = [net_in]
      // vm.stats['all']['net_out'] = [net_out]
    }
  } catch (e) { debug('PERIODICAL OS CALLBACK ERROR %o', e) }
}
