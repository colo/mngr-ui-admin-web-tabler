<template>
  <q-page>

    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <!-- Page pre-title -->
          <div class="page-pretitle">
            <svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><path data-v-2a169e26="" d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path><path data-v-2a169e26="" d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path></svg>
            Logs
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
            split
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
        <periodical :selected_hosts="selected_hosts" :selected_domains="selected_domains" period="minute"/>
      </div>
    </div>

  </q-page>
</template>

<script>
// import Vue from 'vue'
import { BButton, BDropdown, BDropdownItem, BDropdownForm, BDropdownDivider, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BModal, VBModal } from 'bootstrap-vue'
// // Vue.directive('b-modal', VBModal)

import * as Debug from 'debug'
const debug = Debug('apps:logs')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
import Pipeline from '@libs/pipelines'
import { hosts_periodical } from '@apps/hosts/sources/requests'

import DataSourcesMixin from '@mixins/dataSources'
// import DashboardMixin from '@mixins/dashboard'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

import periodical from '@apps/logs/components/periodical'
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
  mixins: [DataSourcesMixin],
  name: 'AppLogsWeb',

  components: {
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownForm,
    BDropdownDivider,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormGroup,
    periodical,
    // BModal,
    // chartTabular,
    // chart,
    // /**
    // * web
    // **/
    // geoip,
    // traffic
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
  // watch: {
  //   hosts: function (val) {
  //     debug('watch hosts', val)
  //   }
  // },
  data () {
    return {
      // height: '0px',
      //
      hosts: [
      ],

      /**
      * search
      **/
      selected_domains: [],
      selected_hosts: [],

      /**
      * DataSourcesMixin
      **/
      store: false,
      pipeline_id: ['input.logs.hosts.periodical'],

      id: 'input.logs.hosts.periodical',
      path: 'all',

      refresh: SECOND * 5,
      // // host: 'perseus',
      components: {
        'all': [
          {
            source: {
              requests: {
                periodical: [hosts_periodical],
                once: [hosts_periodical]
              },
              // store: store
            }
          }

        ]
      },

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
  created: function () {
    debug('lifecycle created', this._uid)

    let selected_hosts = this.$route.query.selected_hosts
    debug('created selected_hosts', selected_hosts)
    if (selected_hosts) {
      if (!Array.isArray(selected_hosts)) selected_hosts = [selected_hosts]

      this.selected_hosts = selected_hosts
    } else {
      this.selected_hosts = []
    }

    let selected_domains = this.$route.query.selected_domains
    debug('created selected_domains', selected_domains)
    if (selected_domains) {
      if (!Array.isArray(selected_domains)) selected_domains = [selected_domains]

      this.selected_domains = selected_domains
    } else {
      this.selected_domains = []
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
    // allDomainsSelected: {
    //   get: function () {
    //     if (this.selected_domains.length === 0) { return true }
    //
    //     return false
    //   },
    //   set: function (val) {
    //     debug('allDomainsSelected', val)
    //     if (val === true) {
    //       this.$router.replace({ query: { ...this.$route.query, selected_domains: []}}).catch(err => { debug('allDomainsSelected set', err) })
    //       this.selected_domains = []
    //     }
    //   }
    // },
  },
  methods: {
    setHost: function (val) {
      this.$router.replace({query: { ...this.$route.query, selected_hosts: this.selected_hosts}}).catch(err => { debug('setHost', err) })
    },
    setDomain: function (val) {
      this.$router.replace({query: { ...this.$route.query, selected_domains: this.selected_domains}}).catch(err => { debug('setDomain', err) })
    },
    /**
    * @start pipelines
    **/
    create_pipelines: function (create_id, next) {
      debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)), create_id, this.components, this._uid)

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
