<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="subheader">MEM</div>
        <!-- <div class="ml-auto lh-1">
          <b-dropdown  variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
            <template v-slot:button-content>
              <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Last 7 days
              </a>
            </template>

            <b-dropdown-item active>
              Last 7 days
            </b-dropdown-item>

            <b-dropdown-item>
              Last 30 days
            </b-dropdown-item>

            <b-dropdown-item>
              Last 3 months
            </b-dropdown-item>
          </b-dropdown>

        </div> -->
      </div>
      <div class="h1 mb-3">{{percentage}}</div>
      <div class="d-flex mb-2">
        <div>Usage</div>
        <div class="ml-auto">
          <span class="text-green d-inline-flex align-items-center lh-1">
            7% <svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
          </span>
        </div>
      </div>
      <div class="progress progress-sm">
        <div class="progress-bar bg-blue" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <span class="sr-only">75% Complete</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:memory')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
import Pipeline from '@apps/hosts/pipelines/periodical'

import DataSourcesMixin from '@mixins/dataSources'

import { requests, store } from '@apps/hosts/sources/memory/index'

import { EventBus } from '@libs/eventbus'
import chartTabular from 'components/chart.tabular'
import chart from 'components/chart'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/vGauge'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/vGauge.derived'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.vGauge.derived.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.vueEasyPieChart.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.vueTrend.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.vueBars.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/frappeCharts'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.frappeCharts.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/memory.dbCharts.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/amcharts4'
// // import chartConfigDomains from 'mngr-ui-admin-charts/os/memory.amcharts4.barRace'
// import chartConfigDomains from 'mngr-ui-admin-charts/defaults/dygraph.line'
// // import chartConfigDomains from 'mngr-ui-admin-charts/educativa/domains.apexchart.bar'
// import chartConfigMemory from 'mngr-ui-admin-charts/os/memory.tabular'
// // import chartConfigMemory from 'mngr-ui-admin-charts/os/memory.peity.pie'
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
  name: 'AppHostsMemory',
  mixins: [DataSourcesMixin],

  components: {
    // BButton,
    // BDropdown,
    // BDropdownItem,
    // BModal,
    // chartTabular,
    // chart
  },

  watch: {
    'stat': {
      handler: function (oldVal, newVal) {
        debug('stat.data', oldVal, newVal)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    percentage: function () {
      let percentage = 0
      debug('percentage', this.stat)
      return percentage
    }
  },
  data () {
    return {
      // height: '0px',
      // percentage: 0,
      /**
      * dataSources
      **/
      store: false,
      pipeline_id: ['input.hosts.periodical'],

      id: 'input.hosts.memory.periodical',
      path: 'all',

      // host: 'draco',
      components: {
        'all': [
          {
            // some_data: {
            //   hosts: true
            // },
            source: {
              requests: requests,
              store: store
            }
          }

        ]
      },

      eventbus: EventBus,

      stat: {
        data: [],
        length: 1
      },

    }
  },
  methods: {
    /**
    * @start pipelines
    **/
    create_pipelines: function (create_id, next) {
      debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)))

      let template = Object.clone(Pipeline)

      let pipeline_id = template.input[0].poll.id

      if (!create_id || create_id === undefined || create_id === pipeline_id) {
        // template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components[pipeline_id], pipeline_id)
        let components_requests = {}

        if (this.$options.pipelines[pipeline_id]) {
          components_requests = this.__merge_requests(pipeline_id, this.__components_sources_to_requests(this.components, pipeline_id))

          this.destroy_pipelines(pipeline_id)
        } else {
          components_requests = this.__components_sources_to_requests(this.components, pipeline_id)
        }

        debug('create_pipelines REQUESTS %o', components_requests)

        Array.each(template.input[0].poll.conn, function (conn, index) {
          template.input[0].poll.conn[index].requests = components_requests
        })

        let pipe = new JSPipeline(template)

        this.$options.__pipelines_cfg[pipeline_id] = {
          ids: [],
          connected: [],
          suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
        }

        this.$options.pipelines[pipeline_id] = pipe
      }
      debug('create_pipelines %o', this.$options.pipelines)

      if (next) { next() }
    }

    /**
    * @end pipelines
    **/

  }
}
</script>
