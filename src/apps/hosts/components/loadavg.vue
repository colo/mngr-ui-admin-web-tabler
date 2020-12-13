<template>
  <div class="col">
    <div class="card card-sm">
      <div class="card-body d-flex align-items-center">
        <span class="bg-blue text-white stamp mr-3"><svg class="icon icon-md" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path  stroke="none" d="M0 0h24v24H0z"></path><polyline  points="21 12 17 12 14 20 10 4 7 12 3 12"></polyline></svg>
        </span>
        <div class="mr-3 lh-sm">
          <div class="strong">
            {{loadavg['1_min']}} Load Avg.
          </div>
          <div class="text-muted">{{loadavg['5_min']}} | {{loadavg['15_min']}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:loadavg')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BProgress, BProgressBar } from 'bootstrap-vue'

// import JSPipeline from 'js-pipeline'
// import Pipeline from '@apps/hosts/pipelines/periodical'
//
// import DataSourcesMixin from '@mixins/dataSources'
//
// import { requests, store } from '@apps/hosts/sources/loadavg/index'
//
// import { EventBus } from '@libs/eventbus'
// import chartTabular from 'components/chart.tabular'
// import chart from 'components/chart'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/vGauge'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/vGauge.derived'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.vGauge.derived.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.vueEasyPieChart.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.vueTrend.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.vueBars.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/frappeCharts'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.frappeCharts.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/loadavg.dbCharts.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/amcharts4'
// // import chartConfigDomains from 'mngr-ui-admin-charts/os/loadavg.amcharts4.barRace'
// import chartConfigDomains from 'mngr-ui-admin-charts/defaults/dygraph.line'
// // import chartConfigDomains from 'mngr-ui-admin-charts/educativa/domains.apexchart.bar'
// import chartConfigCpus from 'mngr-ui-admin-charts/os/loadavg.tabular'
// // import chartConfigCpus from 'mngr-ui-admin-charts/os/loadavg.peity.pie'
//
// // import Wrapper from 'components/wrappers/dygraph'
// import dygraphBarWrapper from 'components/wrappers/dygraphBar'
// // import Wrapper from 'components/wrappers/dygraphDateTimeHistogram'
// // import Wrapper from 'components/wrappers/dygraphSparkLine'
// // import Wrapper from 'components/wrappers/vGauge'
// // import Wrapper from 'components/wrappers/vueEasyPieChart'
//
// import amchartsBarRaceWrapper from 'components/wrappers/amchartsBarRace'
// import vueApexChartsWrapper from 'components/wrappers/vueApexCharts'
// // import amchartsPieWrapper from 'components/wrappers/amchartsPie'
// // import amchartsWorldCityMapWrapper from 'components/wrappers/amchartsWorldCityMap'
// // import amchartsWorldCountryMapWrapper from 'components/wrappers/amchartsWorldCountryMap'
//
// // import Wrapper from 'components/wrappers/vueTrend'
// // import Wrapper from 'components/wrappers/vueBars'
// // import Wrapper from 'components/wrappers/frappeCharts'
// // import Wrapper from 'components/wrappers/dbChartsjs'
// import dygraphWrapper from 'components/wrappers/dygraph'
// import vuePeityWrapper from 'components/wrappers/vuePeity'

export default {
  name: 'AppHostsLoadavg',
  // mixins: [DataSourcesMixin],

  components: {
    BProgress,
    BProgressBar
    // BButton,
    // BDropdown,
    // BDropdownItem,
    // BModal,
    // chartTabular,
    // chart
  },

  props: {
    stat: {
      type: Object,
      default: function () {
        return {
          timestamp: 0,
          value: {
            '1_min': 0,
            '5_min': 0,
            '15_min': 0
          }
        }
      }
    }
  },
  watch: {
    'stat': {
      handler: function (newVal, oldVal) {
        // // let cores = 0
        let val = (newVal !== undefined && newVal && newVal.value) ? newVal : (oldVal !== undefined && oldVal && oldVal.value) ? oldVal : { timestamp: 0, value: { '1_min': 0, '5_min': 0, '15_min': 0 } }
        debug('stat.data', val)

        Object.each(val.value, function (value, prop) {
          this.$set(this.loadavg, prop, value.toFixed(1) * 1)
        }.bind(this))
        //
        // if (this.prev_value === undefined && val.timestamp !== undefined) {
        //   this.prev_value = val
        // } else if (this.prev_value !== undefined) {
        //   let cores = val.value.cores
        //   let timediff = (val.timestamp - this.prev_value.timestamp) / 1000
        //   let idle = (val.value.idle - this.prev_value.value.idle) / timediff// derive
        //   let percentage = ((((val.value.cores * 1000) - idle) * 100) / (val.value.cores * 1000)).toFixed(2) * 1
        //
        //   debug('stat.data', cores, timediff, idle, percentage)
        //
        //   this.prev_percentage = this.percentage
        //   this.percentage = (isNaN(percentage) || percentage < 0 || percentage > 100) ? this.percentage : percentage
        //   this.diff_percentage = this.percentage - this.prev_percentage
        //   this.diff_percentage = ((this.diff_percentage === this.percentage) ? 0 : this.diff_percentage).toFixed(2) * 1
        //
        //   this.prev_value = val
        // }
        //
        // this.cores = val.value.cores
      },
      deep: true,
      immediate: true
    }
  },
  // computed: {
  //   percentage: function () {
  //     let percentage = 0
  //     debug('percentage', this.stat)
  //     return percentage
  //   }
  // },
  data () {
    return {
      loadavg: {
        '1_min': 0,
        '5_min': 0,
        '15_min': 0,
      }
      // // height: '0px',
      // diff_percentage: 0,
      // prev_percentage: undefined,
      // prev_value: undefined,
      // percentage: 0,
      // cores: 0,
      // unit: 'cores',
      // /**
      // * dataSources
      // **/
      // // store: false,
      // // pipeline_id: ['input.hosts.periodical'],
      // //
      // // id: 'input.hosts.loadavg.periodical',
      // // path: 'all',
      // //
      // // // host: 'draco',
      // // components: {
      // //   'all': [
      // //     {
      // //       // some_data: {
      // //       //   hosts: true
      // //       // },
      // //       source: {
      // //         requests: requests,
      // //         store: store
      // //       }
      // //     }
      // //
      // //   ]
      // // },
      // //
      // // eventbus: EventBus,
      //
      // // stat: {
      // //   data: [],
      // //   length: 2
      // // },

    }
  },
  methods: {
    /**
    * @start pipelines
    **/
    // create_pipelines: function (create_id, next) {
    //   debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)))
    //
    //   let template = Object.clone(Pipeline)
    //
    //   let pipeline_id = template.input[0].poll.id
    //
    //   if (!create_id || create_id === undefined || create_id === pipeline_id) {
    //     // template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components[pipeline_id], pipeline_id)
    //     let components_requests = {}
    //
    //     if (this.$options.pipelines[pipeline_id]) {
    //       components_requests = this.__merge_requests(pipeline_id, this.__components_sources_to_requests(this.components, pipeline_id))
    //
    //       this.destroy_pipelines(pipeline_id)
    //     } else {
    //       components_requests = this.__components_sources_to_requests(this.components, pipeline_id)
    //     }
    //
    //     debug('create_pipelines REQUESTS %o', components_requests)
    //
    //     Array.each(template.input[0].poll.conn, function (conn, index) {
    //       template.input[0].poll.conn[index].requests = components_requests
    //     })
    //
    //     let pipe = new JSPipeline(template)
    //
    //     this.$options.__pipelines_cfg[pipeline_id] = {
    //       ids: [],
    //       connected: [],
    //       suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
    //     }
    //
    //     this.$options.pipelines[pipeline_id] = pipe
    //   }
    //   debug('create_pipelines %o', this.$options.pipelines)
    //
    //   if (next) { next() }
    // }

    /**
    * @end pipelines
    **/

  }
}
</script>
