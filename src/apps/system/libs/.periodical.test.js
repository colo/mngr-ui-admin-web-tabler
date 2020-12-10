
import * as Debug from 'debug'
const debug = Debug('apps:system:libs:periodical')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'
// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'

export default function (data, metadata, key, vm) {
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
    let hosts_stats = {}

    let stats = {
      memory: {timestamp: Date.now(), value: {freemem: 0, totalmem: 0}},
    }
    let hosts_memory = {}
    let hosts_cpus = {}
    let hosts_loadavg = {}
    let hosts_uptime = {}
    let hosts_blocks = {}
    let hosts_net = {}

    Array.each(data.os, function (row) {
      let path = row.metadata.path
      let host = row.metadata.host

      if (!hosts_stats[host]) hosts_stats[host] = {}

      // hosts.combine([host])
      /**
      * MEMORY
      **/
      if (
        path === 'os.memory' ||
        path === 'os.cpus' ||
        path === 'os.loadavg' ||
        path === 'os.uptime' ||
        /^os\.mounts\..*\.blocks.*/.test(path) ||
        (/^os\.networkInterfaces.*/.test(path) &&
        (/^os\.networkInterfaces\.eth.*\.bytes$/.test(path) ||
            /^os\.networkInterfaces\.eno.*\.bytes$/.test(path) ||
            /^os\.networkInterfaces\.enp.*\.bytes$/.test(path) ||
            /^os\.networkInterfaces\.vlan.*\.bytes$/.test(path) ||
            /^os\.networkInterfaces\.vnet.*\.bytes$/.test(path)
        ))
      ) {
        if (/^(?!.*(caelum|lynx)).*$/.test(host) || vm.selected_hosts.contains(host)) {
          if (!hosts_stats[host][path] || hosts_stats[host][path].metadata.timestamp < row.metadata.timestamp) {
            hosts_stats[host][path] = row
          }
        }
      }
    })

    /**
    * MEMORY
    **/
    let memory =
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

    debug('hosts_net', JSON.parse(JSON.stringify(hosts_net)))
    Object.each(hosts_net, function (row, host) {
      if (!hosts_stats[host]) hosts_stats[host] = {}
      if (!hosts_stats[host]['net_in']) hosts_stats[host]['net_in'] = {timestamp: Date.now(), value: 0}
      if (!hosts_stats[host]['net_out']) hosts_stats[host]['net_out'] = {timestamp: Date.now(), value: 0}

      Object.each(row, function (iface) {
        net_in.value += (iface.data.recived && !isNaN(iface.data.recived)) ? iface.data.recived : 0
        net_out.value += (iface.data.transmited && !isNaN(iface.data.transmited)) ? iface.data.transmited : 0

        hosts_stats[host]['net_in'].value += (iface.data.recived && !isNaN(iface.data.recived)) ? iface.data.recived : 0
        hosts_stats[host]['net_out'].value += (iface.data.transmited && !isNaN(iface.data.transmited)) ? iface.data.transmited : 0
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

    vm.hosts_stats = hosts_stats

    vm.stat_memory = [memory]
    vm.stat_cpus = [cpus]
    vm.stat_loadavg = [loadavg]
    vm.stat_uptime = [uptime]
    vm.stat_blocks = [blocks]
    vm.stat_net_in = [net_in]
    vm.stat_net_out = [net_out]
  }
}
