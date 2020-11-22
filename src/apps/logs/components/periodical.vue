<template>
  <div>
    periodical
    <b-button variant="primary" class="ml-3 d-none d-sm-inline-block" @click="setData">
      set data
    </b-button>
    <div class="row row-deck row-cards">

      <logs-terminal v-for="(data, logs_id) in logs"
        :id="id + '.'+ logs_id + '.terminal'"
        :key="id + '.'+ logs_id + '.terminal'"
        :ref="id + '.'+ logs_id + '.terminal'"
        :logs="data"
        :groupBy="group_by"
      />

    </div>

  </div>

</template>

<script>
// import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
// // Vue.directive('b-modal', VBModal)

// import { Terminal } from 'xterm'
// import 'xterm/css/xterm.css'
// import { FitAddon } from 'xterm-addon-fit'
// import { WebLinksAddon } from 'xterm-addon-web-links'
// import { SearchAddon } from 'xterm-addon-search'
import LogsTerminal from '@apps/logs/components/terminal'

import * as Debug from 'debug'
const debug = Debug('apps:logs:components:periodical')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
import Pipeline from '@libs/pipelines'
import { requests, store } from '@apps/logs/sources/periodical/index'

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
import { EventBus } from '@libs/eventbus'
// import chartTabular from 'components/chart.tabular'
// import chart from 'components/chart'

export default {
  mixins: [DataSourcesMixin, DashboardMixin],
  name: 'AppLogsPeriodical',

  components: {
    BButton,
    LogsTerminal,
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
    // period: {
    //   type: String,
    //   default: 'minute'
    // },
    selected_hosts: {
      type: Array,
      default: function () { return [] }
    },
    selected_domains: {
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

  data () {
    return {
      // // height: '0px',
      // //
      // hosts: [
      // ],
      //
      // selected_domains: [],
      period: 'second',
      group_by: ['host', 'path'], // 'host', 'path', 'domain'
      logs: {},
      // terminals: [],
      // searchXterms: [],
      /**
      * search
      **/
      by: 'host', // domain
      data: { }, // remote_addr: ['51.79.19.235']

      id: 'input.logs.periodical',
      path: 'all',

      /**
      * DataSourcesMixin
      **/
      store: false,
      pipeline_id: ['input.logs.periodical'],

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

      refresh: SECOND,
      // current_time: undefined,
      EventBus: EventBus,
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

    let by = this.$route.query.by
    debug('created by', by)
    if (by && (by === 'host' || by === 'domain')) {
      this.by = by
    } else {
      this.by = 'host'
    }

    Object.each(this.$route.query, function (value, prop) {
      if (/^data\..*$/.test(prop)) {
        debug('PROP', prop, value)
        prop = prop.replace('data.', '')
        this.$set(this.data, prop, value)
      }
    }.bind(this))
  },
  mounted: function () {
    debug('lifecycle mounted', this._uid)

    // this.terminal = new Terminal()
    // this.terminal.loadAddon(new WebLinksAddon())
    // const fitAddon = new FitAddon()
    // this.terminal.loadAddon(fitAddon)
    // this.searchXterm = new SearchAddon()
    // this.terminal.loadAddon(this.searchXterm)
    // this.terminal.open(document.getElementById('terminal'))
    // fitAddon.fit()

    // terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    // terminal.write('http://localhost:8083')
  },
  watch: {
    logs: function (val) {
      debug('watch logs', val)
      // Object.each(val, function (data, name) {
      //   if (this.terminals[this.id + '.' + name + '.terminal']) {
      //     let terminal = this.terminals[this.id + '.' + name + '.terminal']
      //     Array.each(data, function (row) {
      //       terminal.writeln(row)
      //     })
      //   }
      // }.bind(this))
      // // if (this.terminal !== undefined && val) {
      // //   Array.each(val, function (row) {
      // //     this.terminal.writeln(row)
      // //   }.bind(this))
      // // }
    },
    selected_hosts: function (val, other) {
      debug('WATCH selected_hosts', val, other)
      if (val && Array.isArray(val) && val.length > 0) {
        // Array.each(this.val, function (host) {
        Object.each(this.logs, function (data, group) {
          if (!val.some(function (host) { return group.indexOf(host) > -1 })) {
            this.$delete(this.logs, group)
          }
        }.bind(this))
        // }.bind(this))
      }

      this.destroy_pipelines(this.id)
      this.create_pipelines(this.id)
      this.resume_pipelines(this.id)
    },
  },
  // computed: {
  //   terminals: function () {
  //     let terminals = {}
  //     if (this.group_by.length === 0) {
  //       terminals[this.id + '.all.terminal'] = this.create_terminal(this.id + '.all.terminal')
  //     }
  //
  //     return terminals
  //   }
  //
  //   // allHostsSelected: {
  //   //   get: function () {
  //   //     if (this.selected_hosts.length === 0) { return true }
  //   //
  //   //     return false
  //   //   },
  //   //   set: function (val) {
  //   //     debug('allHostsSelected', val)
  //   //     if (val === true) {
  //   //       this.$router.replace({ query: { ...this.$route.query, selected_hosts: []}}).catch(err => { debug('allHostsSelected set', err) })
  //   //       this.selected_hosts = []
  //   //     }
  //   //   }
  //   // },
  // },
  methods: {
    // create_terminal: function (id) {
    //   const terminal = new Terminal()
    //   terminal.loadAddon(new WebLinksAddon())
    //   // const fitAddon = new FitAddon()
    //   // terminal.loadAddon(fitAddon)
    //   // // searchXterm = new SearchAddon()
    //   // // terminal.loadAddon(searchXterm)
    //   // terminal.open(document.getElementById(id))
    //   // fitAddon.fit()
    //
    //   return terminal
    // },
    setBy: function (val) {
      this.$router.replace({query: { ...this.$route.query, by: this.by}}).catch(err => { debug('setBy', err) })
    },
    setData: function (val) {
      let data = {}
      Object.each(this.data, function (value, prop) {
        if (!data['data.' + prop]) {
          data['data.' + prop] = value
        } else {
          if (!Array.isArray(data['data.' + prop])) {
            let tmp = data['data.' + prop]
            data['data.' + prop] = []
            data['data.' + prop].push(tmp)
          }

          data['data.' + prop].push(value)
        }
      })
      this.$router.replace({query: { ...this.$route.query, ...data}}).catch(err => { debug('setData', err) })
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
