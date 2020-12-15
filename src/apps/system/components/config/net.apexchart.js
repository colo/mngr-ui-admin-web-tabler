let DefaultApexchartBar = require('mngr-ui-admin-charts/defaults/apexchart.bar')

const mootools = require('mootools')

let debug = require('debug')('apps:hosts:components:net:config'),
  debug_internals = require('debug')('apps:hosts:components:net:config:Internals')

debug.log = console.log.bind(console)
debug_internals.log = console.log.bind(console)

// const roundMilliseconds = function (timestamp) {
//   let d = new Date(timestamp)
//   d.setMilliseconds(0)
//
//   return d.getTime()
// }
//
// const roundSeconds = function (timestamp) {
//   timestamp = roundMilliseconds(timestamp)
//   let d = new Date(timestamp)
//   d.setSeconds(0)
//
//   return d.getTime()
// }
//

module.exports = Object.merge(Object.clone(DefaultApexchartBar), {
  // skip: 15,

  watch: {
    // managed: true,
    /**
    * @trasnform: diff between each value against its prev one
    */
    transform: function (values, caller, chart, cb) {
      debug('transform', values, caller, chart, cb)

      let isWindow = !!((caller && caller.setInterval))
      /**
      * node-tabular-data/data_to_tabular (used on chart.vue) call this tranform too, avoid runnin it
      * Let it trasnform stat to tabular with generic methods
      * Run this one with only with tabular data
      **/
      if (isWindow === true) {
        // let series = {}
        // Object.each(values[0].value, function (count, domain) {
        //   if (!series[domain]) series[domain] = {name: domain, data: []}
        //
        //   // series[domain].data.push(count)
        // })
        //
        // chart.series = series
        //
        // debug('transformed', chart.series)
        return values
      } else {
        let series = {name: 'net', data: []}
        chart.options.labels = []
        Array.each(values, function (value, index) {
          chart.options.labels.push(value[0]) // timestamp

          series.data.push(value[1])
          // let series_index = 0
          // Object.each(chart.series, function (row, domain) {
          //   if (domain !== 'Total') {
          //     series[domain] = row
          //     series[domain].data.push(value[series_index + 1])
          //   }
          //   series_index++
          // })
        })

        debug('transformed', Object.values(series))
        return [series]
      }

      // return values
    }
  },

  init: function (vm, chart, name, stat, type) {
    debug('init', vm, chart, name, stat, type)
  },
  props: {
    height: 60
  },
  options: {
    chart: {
      type: 'area',
      fontFamily: 'inherit',
      height: 60.0,
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.16,
      type: 'solid'
    },
    stroke: {
      width: 2,
      lineCap: 'round',
      curve: 'smooth',
    },
    grid: {
      strokeDashArray: 4,
    },
    xaxis: {
      labels: {
        padding: 0
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: false,
      },
      type: 'datetime',
      // type: undefined,
      // labels: {
      //   padding: 0,
      //   formatter: function (value, timestamp) {
      //     // debug('formatter', value, timestamp)
      //     // return new Date(timestamp) // The formatter function overrides format property
      //     let d = new Date(timestamp * 1)
      //     // debug('transform %o', value)
      //     return [d.getMinutes(), d.getSeconds()].join(':')
      //   },
      // }
    },
    yaxis: {
      labels: {
        padding: 4
      },
    },
    labels: [
      // '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
    ],
    colors: ['#206bc4'],
    legend: {
      show: false,
    },
    // yaxis: {
    //   labels: {
    //     padding: 32
    //   },
    // },
    // labels: [
    //   // '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19', '2020-07-20', '2020-07-21', '2020-07-22', '2020-07-23', '2020-07-24', '2020-07-25', '2020-07-26'
    // ],
    // // colors: ['#206bc4', '#79a6dc', '#bfe399'],
    // legend: {
    //   show: true,
    //   position: 'right',
    //   height: 240,
    //   width: 160,
    //   offsetY: 8,
    //   markers: {
    //     width: 8,
    //     height: 8,
    //     radius: 100,
    //   },
    //   itemMargin: {
    //     horizontal: 8,
    //   },
    // },
    // xaxis: {
    //   type: undefined,
    //   labels: {
    //     // format: 'HH/mm/s',
    //     formatter: function (value, timestamp) {
    //       // debug('formatter', value, timestamp)
    //       // return new Date(timestamp) // The formatter function overrides format property
    //       let d = new Date(timestamp * 1)
    //       // debug('transform %o', value)
    //       return [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
    //     },
    //   }
    // },
  }

})
