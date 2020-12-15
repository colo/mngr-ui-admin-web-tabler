<template>

  <div class="col-lg-12">
    <host-card v-for="(host) in computed_hosts" :host="host" :stats="stats[host]" :key="'system.hostCard:'+host"/>
  </div>

</template>

<script>
// import Vue from 'vue'
import { BButton, BButtonGroup, BButtonToolbar, BFormCheckbox, BFormCheckboxGroup } from 'bootstrap-vue'
// // Vue.directive('b-modal', VBModal)

// import SystemTerminal from '@apps/system/components/terminal'

import * as Debug from 'debug'
const debug = Debug('apps:system:components:periodical')
debug.log = console.log.bind(console) // don't forget to bind to console!

import hostCard from '@apps/system/components/hostCard'

import JSPipeline from 'js-pipeline'
import Pipeline from '@libs/pipelines'
import { requests, store } from '@apps/system/sources/periodical/index'

import DataSourcesMixin from '@mixins/dataSources'
import DashboardMixin from '@mixins/dashboard'

// import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

/**
* Web components
**/
// import geoip from '@apps/system/web/components/geoip'
// import traffic from '@apps/system/web/components/traffic'
//
// import { requests, store } from './sources/index'
//
import { EventBus } from '@libs/eventbus'
// import chartTabular from 'components/chart.tabular'
// import chart from 'components/chart'

export default {
  mixins: [DataSourcesMixin, DashboardMixin],
  name: 'AppSystemPeriodical',

  components: {
    hostCard,
    // BButton,
    // BButtonGroup,
    // BButtonToolbar,
    // BFormCheckbox,
    // BFormCheckboxGroup,
    // // SystemTerminal,
    // // BDropdown,
    // // BDropdownItem,
    // // BDropdownForm,
    // // BDropdownDivider,
    // // BFormCheckbox,
    // // BFormCheckboxGroup,
    // // BFormGroup,
    // // // BModal,
    // // // chartTabular,
    // // // chart,
    // // // /**
    // // // * web
    // // // **/
    // // // geoip,
    // // // traffic
  },

  props: {
    // period: {
    //   type: String,
    //   default: 'minute'
    // },
    hosts_data: {
      type: Array,
      default: function () { return [] }
    },
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
      stats: {},
      stats_hosts: [],
      // hosts_stats: undefined,

      // // height: '0px',
      // //
      // hosts: [
      // ],
      //
      // selected_domains: [],
      period: 'second',

      // selected_paths: [],

      // group_by: ['host'], // 'host', 'path', 'domain'
      // layout: 'grid',
      // layout_prev: undefined,
      // coloured: true,
      // rows: 24,

      // layoutBtns: [
      //   {
      //     type: 'grid',
      //     icon: '<svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><rect data-v-2a169e26="" x="4" y="4" width="6" height="6" rx="1"></rect><rect data-v-2a169e26="" x="14" y="4" width="6" height="6" rx="1"></rect><rect data-v-2a169e26="" x="4" y="14" width="6" height="6" rx="1"></rect><rect data-v-2a169e26="" x="14" y="14" width="6" height="6" rx="1"></rect></svg>',
      //     state: false
      //   },
      //   {
      //     type: 'row',
      //     icon: '<svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><rect data-v-2a169e26="" x="4" y="4" width="16" height="16" rx="2"></rect><line data-v-2a169e26="" x1="4" y1="12" x2="20" y2="12"></line></svg>',
      //     state: false
      //   }
      // ],
      // logs: {},
      // logs_paths: [],

      /**
      * search
      **/
      // by: 'host', // domain
      // data: { }, // remote_addr: ['51.79.19.235']

      id: 'input.system.periodical',
      path: 'all',

      /**
      * DataSourcesMixin
      **/
      store: false,
      pipeline_id: ['input.system.periodical'],

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

    // let group_by = this.$route.query.group_by
    //
    // if (group_by) {
    //   if (!Array.isArray(group_by)) group_by = [group_by]
    //
    //   this.group_by = group_by
    // } else if (group_by === null) {
    //   debug('created group_by', group_by)
    //   this.group_by = []
    // }
    //
    // let selected_paths = this.$route.query.selected_paths
    //
    // if (selected_paths) {
    //   if (!Array.isArray(selected_paths)) selected_paths = [selected_paths]
    //
    //   this.selected_paths = selected_paths
    // } else if (selected_paths === null) {
    //   debug('created selected_paths', selected_paths)
    //   this.selected_paths = []
    // }
    //
    // let coloured = this.$route.query.coloured
    // debug('created coloured', coloured)
    // if (coloured) {
    //   this.coloured = !((coloured === 'false' || coloured === false))
    // }

    // let layout = this.$route.query.layout
    // debug('created layout', layout)
    // if (layout && (layout === 'grid' || layout === 'row')) {
    //   this.layout = layout
    // }
    //
    // this.layout_prev = this.layout

    // let by = this.$route.query.by
    // debug('created by', by)
    // if (by && (by === 'host' || by === 'domain')) {
    //   this.by = by
    // } else {
    //   this.by = 'host'
    // }

    // Object.each(this.$route.query, function (value, prop) {
    //   if (/^data\..*$/.test(prop)) {
    //     debug('PROP', prop, value)
    //     prop = prop.replace('data.', '')
    //     this.$set(this.data, prop, value)
    //   }
    // }.bind(this))
  },
  mounted: function () {
    debug('lifecycle mounted', this._uid)

    // Array.each(this.layoutBtns, function (btn) {
    //   if (btn.type === this.layout) {
    //     btn.state = true
    //   } else {
    //     btn.state = false
    //   }
    // }.bind(this))
  },
  watch: {
    stats: function (val) {
      debug('watch stats', val)
    },
    // system_paths: function (val) {
    //   if (this.selected_paths.length === 0) this.selected_paths = val
    // },
    // selected_paths: function (val) {
    //   debug('watch selected_paths', val)
    //   if (val && Array.isArray(val) && val.length > 0) {
    //     // // Array.each(this.val, function (path) {
    //     // Object.each(this.logs, function (data, group) {
    //     //   if (!this.group_by.contains('path') || !val.some(function (path) { return group.indexOf(path) > -1 })) {
    //     //     this.$delete(this.logs, group)
    //     //   }
    //     // }.bind(this))
    //     // // }.bind(this))
    //   }
    //   this.$router.replace({ query: { ...this.$route.query, selected_paths: val}}).catch(err => { debug('selected_paths set', err) })
    // },
    // logs: function (val) {
    //   debug('watch logs', val)
    //   if (val && Object.getLength(val) === 1 && this.rows !== 36) {
    //     this.rows = 44
    //   } else if (Object.getLength(val) > 1 && this.rows !== 24) {
    //     this.rows = 24
    //   }
    //
    //   debug('watch rows logs', this.rows)
    //
    //   if (val && Object.getLength(val) === 1 && this.layout === 'grid') {
    //     this.layout_prev = this.layout
    //     this.layout = 'row'
    //     Array.each(this.layoutBtns, function (btn) {
    //       if (btn.type === this.layout) {
    //         btn.state = true
    //       } else {
    //         btn.state = false
    //       }
    //     }.bind(this))
    //   } else if (Object.getLength(val) > 1 && this.layout !== this.layout_prev) {
    //     this.layout = this.layout_prev
    //     Array.each(this.layoutBtns, function (btn) {
    //       if (btn.type === this.layout) {
    //         btn.state = true
    //       } else {
    //         btn.state = false
    //       }
    //     }.bind(this))
    //   }
    //   // Object.each(val, function (data, name) {
    //   //   if (this.terminals[this.id + '.' + name + '.terminal']) {
    //   //     let terminal = this.terminals[this.id + '.' + name + '.terminal']
    //   //     Array.each(data, function (row) {
    //   //       terminal.writeln(row)
    //   //     })
    //   //   }
    //   // }.bind(this))
    //   // // if (this.terminal !== undefined && val) {
    //   // //   Array.each(val, function (row) {
    //   // //     this.terminal.writeln(row)
    //   // //   }.bind(this))
    //   // // }
    // },

    // hosts_data: function (val, other) {
    //   debug('WATCH hosts_data', val, other)
    // },
    selected_hosts: function (val, other) {
      debug('WATCH selected_hosts', val, other)
      if (val && Array.isArray(val) && val.length > 0) {
        // // Array.each(this.val, function (host) {
        // Object.each(this.logs, function (data, group) {
        //   if (!this.group_by.contains('host') || !val.some(function (host) { return group.indexOf(host) > -1 })) {
        //     this.$delete(this.logs, group)
        //   }
        // }.bind(this))
        // // }.bind(this))
      }

      this.destroy_pipelines(this.id)
      this.create_pipelines(this.id)
      this.resume_pipelines(this.id)
    },
    // group_by: function (val, other) {
    //   debug('WATCH group_by', val, other)
    //
    //   if (val && Array.isArray(val) && val.length > 0) {
    //     this.setGroupBy(this.group_by)
    //     // Array.each(this.val, function (host) {
    //     Object.each(this.logs, function (data, group) {
    //       this.$delete(this.logs, group)
    //       // if (!val.some(function (by) { return group.indexOf(by) > -1 })) {
    //       //   this.$delete(this.logs, group)
    //       // }
    //     }.bind(this))
    //     // }.bind(this))
    //   } else {
    //     this.setGroupBy(null)
    //   }
    //
    //   this.destroy_pipelines(this.id)
    //   this.create_pipelines(this.id)
    //   this.resume_pipelines(this.id)
    // },
  },
  computed: {
    computed_hosts: function () {
      debug('computed_hosts', this.stats_hosts, this.stats_hosts.length)
      if (this.stats_hosts.length === 2) { // 0 idx is 'all'
        return [this.stats_hosts[1]]
      } else {
        return this.stats_hosts
      }
    },
  },
  methods: {

    // setGroupBy: function (val) {
    //   this.$router.replace({query: { ...this.$route.query, group_by: val}}).catch(err => { debug('setGroupBy', err) })
    // },
    // switchColoured: function () {
    //   debug('switchColoured', this.coloured)
    //   // this.coloured = this.coloured !== true
    //   this.$router.replace({ query: { ...this.$route.query, coloured: this.coloured}}).catch(err => { debug('switchColoured', err) })
    // },
    //
    // setLayout: function (type) {
    //   this.layout = type
    //   this.layout_prev = type
    //   Array.each(this.layoutBtns, function (btn) {
    //     if (btn.type === this.layout) {
    //       btn.state = true
    //     } else {
    //       btn.state = false
    //     }
    //   }.bind(this))
    //   this.$router.replace({ query: { ...this.$route.query, layout: this.layout}}).catch(err => { debug('setLayout', err) })
    // },
    // setData: function (val) {
    //   let data = {}
    //   Object.each(this.data, function (value, prop) {
    //     if (!data['data.' + prop]) {
    //       data['data.' + prop] = value
    //     } else {
    //       if (!Array.isArray(data['data.' + prop])) {
    //         let tmp = data['data.' + prop]
    //         data['data.' + prop] = []
    //         data['data.' + prop].push(tmp)
    //       }
    //
    //       data['data.' + prop].push(value)
    //     }
    //   })
    //   this.$router.replace({query: { ...this.$route.query, ...data}}).catch(err => { debug('setData', err) })
    // },
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
