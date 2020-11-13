<template>
  <div>historical</div>
</template>

<script>
// import Vue from 'vue'
// import { BButton, BDropdown, BDropdownItem, BDropdownForm, BDropdownDivider, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BModal, VBModal } from 'bootstrap-vue'
// // Vue.directive('b-modal', VBModal)

import * as Debug from 'debug'
const debug = Debug('apps:logs:web:components:historical')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
import Pipeline from '@libs/pipelines'
import { requests, store } from '@apps/logs/web/sources/historical/index'

import DataSourcesMixin from '@mixins/dataSources'
import DashboardMixin from '@mixins/dashboard'

// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

/**
* Web components
**/
// import geoip from '@apps/logs/web/components/geoip'
// import traffic from '@apps/logs/web/components/traffic'
//
// import { requests, store } from './sources/index'
//
// import { EventBus } from '@libs/eventbus'
// import chartTabular from 'components/chart.tabular'
// import chart from 'components/chart'

export default {
  mixins: [DataSourcesMixin, DashboardMixin],
  name: 'AppLogsWebHistorical',

  components: {
    // BButton,
    // BDropdown,
    // BDropdownItem,
    // BDropdownForm,
    // BDropdownDivider,
    // BFormCheckbox,
    // BFormCheckboxGroup,
    // BFormGroup,
    // // BModal,
    // // chartTabular,
    // // chart,
    // // /**
    // // * web
    // // **/
    // // geoip,
    // // traffic
  },

  props: {
    period: {
      type: String,
      default: 'minute'
    },
    selected_hosts: {
      type: Array,
      default: function () { return [] }
    },
    dark: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: '',
    },
  },
  // watch: {
  //   hosts: function (val) {
  //     debug('watch hosts', val)
  //   }
  // },
  data () {
    return {
      // // height: '0px',
      // //
      // hosts: [
      // ],
      //
      // selected_hosts: [],

      id: 'input.logs.web.historical',
      path: 'all',

      /**
      * DataSourcesMixin
      **/
      store: false,
      pipeline_id: ['input.logs.web.historical'],

      // // host: 'perseus',
      components: {
        'all': [
          {
            source: {
              requests: requests,
              store: store
            }
          }

        ]
      },

      refresh: MINUTE,
      // current_time: undefined,
      // EventBus: EventBus,
      // stat_memory: [],
      // stat_cpus: [],
      // stat_loadavg: [],
      // stat_uptime: [],
      // stat_blocks: [],
      // stat_net_in: [],
      // stat_net_out: [],
      //
      // // stat_world_map_country_counter: [],
      // // stat_world_map_city_counter: [],
      // geodata: {
      //   city_counter: [],
      //   country_counter: [],
      //   top_city_counter: [],
      //   top_country_counter: [],
      //   continent_counter: [],
      //   world_map_city_counter: [],
      //   top_world_map_city_counter: [],
      //   world_map_country_counter: [],
      //   top_world_map_country_counter: []
      // },
      //
      // traffic: {
      //   host_counter: [],
      //   domain_counter: [],
      //   top_host_counter: [],
      //   top_domain_counter: []
      // },
      //
      // top: 5,
      //
      //
    }
  },
  // created: function () {
  //   debug('lifecycle created', this._uid)
  //
  //   let selected_hosts = this.$route.query.selected_hosts
  //   debug('created selected_hosts', selected_hosts)
  //   if (selected_hosts) {
  //     if (!Array.isArray(selected_hosts)) selected_hosts = [selected_hosts]
  //
  //     this.selected_hosts = selected_hosts
  //   } else {
  //     this.selected_hosts = []
  //   }
  // },

  // computed: {
  //   allHostsSelected: {
  //     get: function () {
  //       if (this.selected_hosts.length === 0) { return true }
  //
  //       return false
  //     },
  //     set: function (val) {
  //       debug('allHostsSelected', val)
  //       if (val === true) {
  //         this.$router.replace({ query: { ...this.$route.query, selected_hosts: []}}).catch(err => { debug('allHostsSelected set', err) })
  //         this.selected_hosts = []
  //       }
  //     }
  //   },
  // },
  methods: {

    /**
    * @start pipelines
    **/
    create_pipelines: function (create_id, next) {
      debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)), create_id, this.components)

      let template = Object.clone(Pipeline)
      template.input[0].poll.id = this.id
      template.input[0].poll.requests.periodical = this.refresh

      // let pipeline_id = template.input[0].poll.id
      // let pipeline_id = this.id

      if (!create_id || create_id === undefined || create_id === this.id) {
        // template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components[this.id], this.id)
        let components_requests = {}

        if (this.$options.pipelines[this.id]) {
          components_requests = this.__merge_requests(this.id, this.__components_sources_to_requests(this.components, this.id))

          this.destroy_pipelines(this.id)
        } else {
          components_requests = this.__components_sources_to_requests(this.components, this.id)
        }

        debug('create_pipelines REQUESTS %o', components_requests)

        Array.each(template.input[0].poll.conn, function (conn, index) {
          template.input[0].poll.conn[index].requests = components_requests
        })

        let pipe = new JSPipeline(template)

        this.$options.__pipelines_cfg[this.id] = {
          ids: [],
          connected: [],
          suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
        }

        this.$options.pipelines[this.id] = pipe
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
