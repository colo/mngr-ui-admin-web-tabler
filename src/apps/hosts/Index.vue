<template>
  <q-page>

    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <!-- Page pre-title -->
          <div class="page-pretitle">
            <svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><rect data-v-2a169e26="" x="3" y="4" width="18" height="8" rx="3"></rect><rect data-v-2a169e26="" x="3" y="12" width="18" height="8" rx="3"></rect><line data-v-2a169e26="" x1="7" y1="8" x2="7" y2="8.01"></line><line data-v-2a169e26="" x1="7" y1="16" x2="7" y2="16.01"></line></svg>
            Summary
          </div>
          <h2 class="page-title">
            Hosts: {{ (selected_hosts.length === 0 ) ? 'All' : selected_hosts.join(',')}}
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <!-- <span class="d-none d-sm-inline">
            <a href="#" class="btn btn-white">
              New view
            </a>
          </span> -->
          <!-- <b-button variant="primary" data-toggle="modal" v-b-modal="'modal-report'" class="ml-3 d-none d-sm-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Create new report
          </b-button>
          <a href="#" class="btn btn-primary ml-3 d-sm-none btn-icon" data-toggle="modal" data-target="#modal-report" aria-label="Create new report">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </a> -->
          <!-- {{selected_hosts}} -->
          <b-dropdown
            variant="primary"
            right
          >
            <template v-slot:button-content>
              <svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><rect data-v-2a169e26="" x="3" y="4" width="18" height="8" rx="3"></rect><rect data-v-2a169e26="" x="3" y="12" width="18" height="8" rx="3"></rect><line data-v-2a169e26="" x1="7" y1="8" x2="7" y2="8.01"></line><line data-v-2a169e26="" x1="7" y1="16" x2="7" y2="16.01"></line></svg>
              Hosts
            </template>

            <b-dropdown-form>
              <b-form-group>
                <b-form-checkbox v-model="allHostsSelected" plain>All</b-form-checkbox>
              </b-form-group>
            </b-dropdown-form>

            <!-- <b-dropdown-item :to="{ query: { ...$route.query, hosts: ''}}">All</b-dropdown-item> -->
            <b-dropdown-divider />
            <b-dropdown-form>
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selected_hosts"
                name="flavour-1"
                plain
                stacked
              >
                <b-form-checkbox v-for="host in hosts" :value="host" :key="host" @input="setHost">{{host}}</b-form-checkbox>
              </b-form-checkbox-group>
              <!-- <b-form-group>
                <b-form-checkbox plain>Perseus</b-form-checkbox>
                <b-form-checkbox plain>Draco</b-form-checkbox>
              </b-form-group> -->
            </b-dropdown-form>
            <!-- <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here...</b-dropdown-item> -->
          </b-dropdown>

        </div>
      </div>
    </div>
    <div class="row row-deck row-cards">
      <div class="col-sm-6 col-md-4 col-lg-2">
        <cpus :stat="stat_cpus" :key="'os.cpus.hosts:'+selected_hosts.join(',')"/>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <memory :stat="stat_memory" :key="'os.memory.hosts:'+selected_hosts.join(',')"/>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">

        <net :stat="stat_net_in" type="In" :key="'os.In.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">

        <net :stat="stat_net_out" type="Out" :key="'os.netOut.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="row">
          <loadavg :stat="stat_loadavg" :key="'os.loadavg.hosts:'+selected_hosts.join(',')"/>

          <div class="w-100 d-none d-md-block"></div>

          <uptime :stat="stat_uptime" :key="'os.uptime.hosts:'+selected_hosts.join(',')"/>
        </div>

      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">

        <blocks :stat="stat_blocks" :key="'os.blocks.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-lg-7">

        <traffic :stat="traffic" :dark="dark" :mode="mode" :fluid="fluid" :key="'web.traffic.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-lg-5">

        <geoip :stat="geodata" :dark="dark" :mode="mode" :fluid="fluid" :key="'web.geoip.hosts:'+selected_hosts.join(',')"/>

      </div>

      <div class="col-lg-12">
        <hosts-table :stat="hosts_data" :selected_hosts="selected_hosts" :dark="dark" :mode="mode" :fluid="fluid"/>
      </div>
    </div>

  </q-page>
</template>

<script>
import Vue from 'vue'
import { BButton, BDropdown, BDropdownItem, BDropdownForm, BDropdownDivider, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BModal, VBModal } from 'bootstrap-vue'
// Vue.directive('b-modal', VBModal)

import * as Debug from 'debug'
const debug = Debug('apps:hosts')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
// import Pipeline from '@apps/hosts/pipelines/periodical'
import Pipeline from '@libs/pipelines'
import { requests, store } from './sources/index'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'
import DataSourcesMixin from '@mixins/dataSources'
import DashboardMixin from '@mixins/dashboard'

/**
* System components
**/
import cpus from '@apps/hosts/components/cpus'
import memory from '@apps/hosts/components/memory'
import net from '@apps/hosts/components/net'
import loadavg from '@apps/hosts/components/loadavg'
import uptime from '@apps/hosts/components/uptime'
import blocks from '@apps/hosts/components/blocks'

/**
* Web components
**/
import geoip from '@apps/hosts/components/geoip'
import traffic from '@apps/hosts/components/traffic'

import hostsTable from '@apps/hosts/components/table'

import { EventBus } from '@libs/eventbus'
import chartTabular from 'components/chart.tabular'
import chart from 'components/chart'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/vGauge'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/vGauge.derived'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.vGauge.derived.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.vueEasyPieChart.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.vueTrend.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.vueBars.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/frappeCharts'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.frappeCharts.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/os/cpus.dbCharts.tabular'
// // import chartConfig from 'mngr-ui-admin-charts/defaults/amcharts4'
// // import chartConfigDomains from 'mngr-ui-admin-charts/os/cpus.amcharts4.barRace'
// import chartConfigDomains from 'mngr-ui-admin-charts/defaults/dygraph.line'
// // import chartConfigDomains from 'mngr-ui-admin-charts/educativa/domains.apexchart.bar'
// import chartConfigCpus from 'mngr-ui-admin-charts/os/cpus.tabular'
// // import chartConfigCpus from 'mngr-ui-admin-charts/os/cpus.peity.pie'
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
  mixins: [DataSourcesMixin, DashboardMixin],
  name: 'AppHosts',

  components: {
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownForm,
    BDropdownDivider,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormGroup,
    BModal,
    chartTabular,
    chart,
    /**
    * os
    **/
    cpus,
    memory,
    net,
    loadavg,
    uptime,
    blocks,
    /**
    * web
    **/
    geoip,
    traffic,
    hostsTable
  },

  props: {
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
  data () {
    return {
      height: '0px',

      hosts: [
      ],

      selected_hosts: [],
      /**
      * dataSources
      **/
      store: false,
      pipeline_id: ['input.hosts.periodical'],

      id: 'input.hosts.periodical',
      path: 'all',

      // host: 'perseus',
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

      EventBus: EventBus,
      stat_memory: [],
      stat_cpus: [],
      stat_loadavg: [],
      stat_uptime: [],
      stat_blocks: [],
      stat_net_in: [],
      stat_net_out: [],

      // stat_world_map_country_counter: [],
      // stat_world_map_city_counter: [],
      geodata: {
        city_counter: [],
        country_counter: [],
        top_city_counter: [],
        top_country_counter: [],
        continent_counter: [],
        world_map_city_counter: [],
        top_world_map_city_counter: [],
        world_map_country_counter: [],
        top_world_map_country_counter: []
      },

      traffic: {
        host_counter: [],
        domain_counter: [],
        top_host_counter: [],
        top_domain_counter: []
      },

      hosts_data: [],

      top: 5,

      refresh: SECOND * 5,
      period: 'second',
      // // chart: Object.merge(chartConfig, {skip: 5}),
      // /**
      // * vGauge
      // **/
      // domains_chart: chartConfigDomains,
      // cpus_chart: chartConfigCpus,
      //
      // domainsWrapper: dygraphBarWrapper,
      // cpusWrapper: dygraphWrapper,
      // // cpusWrapper: vuePeityWrapper,
      // cpus_stat: {
      //   data: [],
      //   length: 360
      // },
      //
      // domains_stat: {
      //   data: [],
      //   length: 360
      // }
    }
  },
  created: function () {
    let selected_hosts = this.$route.query.selected_hosts
    debug('created selected_hosts', selected_hosts)
    if (selected_hosts) {
      if (!Array.isArray(selected_hosts)) selected_hosts = [selected_hosts]

      this.selected_hosts = selected_hosts
    } else {
      this.selected_hosts = []
    }
  },
  computed: {
    allHostsSelected: {
      get: function () {
        if (this.selected_hosts.length === 0) { return true }

        return false
      },
      set: function (val) {
        debug('allHostsSelected', val)
        if (val === true) {
          this.$router.replace({ query: { ...this.$route.query, selected_hosts: []}}).catch(err => { debug('allHostsSelected set', err) })
          this.selected_hosts = []
        }
      }
    },
  },
  methods: {
    setHost: function (val) {
      this.$router.replace({ query: { ...this.$route.query, selected_hosts: this.selected_hosts}}).catch(err => { debug('setHost', err) })
    },
    // setAllHosts: function (val) {
    //   debug('setAllHosts', val)
    //   // if (true) {
    //   //   this.selected_hosts = []
    //   // }
    //   // // else{
    //   // //
    //   // // }
    // },
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

        let keys = this.components_to_keys(this.components)

        debug('create_pipelines REQUESTS %o', components_requests, keys)

        Array.each(keys, function (key) {
          if (
            EventBus &&
            (
              !EventBus._events['sent:' + this.id + '[' + key + ']'] ||
              (EventBus._events['sent:' + this.id + '[' + key + ']'] && EventBus._events['sent:' + this.id + '[' + key + ']'].length === 0)
              // (EventBus._events[pipeline_id + '.' + this.path] && !EventBus._events[pipeline_id + '.' + this.path].contains(this.__process_input_data))
            )
          ) {
            EventBus.$on('sent:' + this.id + '[' + key + ']', function (emit_query) {
              debug('start loader for', emit_query.params.id, emit_query)
            })
            EventBus.$on('received:' + this.id + '[' + key + ']', function (payload) {
              debug('stop loader for', payload)
            })
          }
        }.bind(this))

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
