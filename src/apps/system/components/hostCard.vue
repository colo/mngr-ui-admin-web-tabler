<template>
  <div class="card">
    <div class="card-body">
      <!-- <div class="d-flex align-items-center"> -->
        <div class="row row-deck row-cards">
          <div class="subheader">{{host}}</div>
          <div class="col-sm-4 col-md-4 col-lg-2">
            <cpus :stat="stats['os.cpus']" :key="'os.cpus.hosts:'+host"/>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2">
            <memory :stat="stats['os.memory']" :key="'os.memory.hosts:'+host"/>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2">
            <div class="row">
              <net :stat="stats['os.networkInterfaces.bytes.recived']" type="In" :key="'os.In.hosts:'+host"/>

              <div class="w-100 d-none d-md-block"></div>

              <net :stat="stats['os.networkInterfaces.bytes.transmited']" type="Out" :key="'os.netOut.hosts:'+host"/>
            </div>
          </div>
          <!-- <div class="col-sm-6 col-md-4 col-lg-2">

            <net :stat="stat_net_in" type="In" :key="'os.In.hosts:'+host"/>

          </div>
          <div class="col-sm-6 col-md-4 col-lg-2">

            <net :stat="stat_net_out" type="Out" :key="'os.netOut.hosts:'+host"/>

          </div> -->
          <div class="col-md-4 col-lg-3">
            <div class="row">
              <loadavg :stat="stats['os.loadavg']" :key="'os.loadavg.hosts:'+host"/>

              <div class="w-100 d-none d-md-block"></div>

              <uptime :stat="stats['os.uptime']" :key="'os.uptime.hosts:'+host"/>
            </div>

          </div>

          <!-- <div class="col-sm-6">
            <loadavg :stat="stat_loadavg" :key="'os.loadavg.hosts:'+host"/>
          </div>
          <div class="col-sm-6">
            <uptime :stat="stat_uptime" :key="'os.uptime.hosts:'+host"/>
          </div> -->

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">

            <blocks :stat="stats['os.blocks']" :key="'os.blocks.hosts:'+host"/>

          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>

</template>

<script>
import * as Debug from 'debug'
const debug = Debug('apps:system:components:hostCard')
debug.log = console.log.bind(console) // don't forget to bind to console!

/**
* System components
**/
import cpus from '@apps/system/components/cpus'
import memory from '@apps/system/components/memory'
import net from '@apps/system/components/net'
import loadavg from '@apps/system/components/loadavg'
import uptime from '@apps/system/components/uptime'
import blocks from '@apps/system/components/blocks'

export default {

  name: 'AppSystemHostCard',

  components: {
    cpus,
    memory,
    net,
    loadavg,
    uptime,
    blocks,
  },

  props: {
    stats: {
      type: Object,
      default: function () { return {} }
    },
    host: {
      type: String,
      default: ''
    },
    // selected_hosts: {
    //   type: Array,
    //   default: function () { return [] }
    // },
    // selected_domains: {
    //   type: Array,
    //   default: function () { return [] }
    // },
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
    }
  },
  // created: function () {
  //   debug('lifecycle created', this._uid)
  //
  //   // let group_by = this.$route.query.group_by
  //   //
  //   // if (group_by) {
  //   //   if (!Array.isArray(group_by)) group_by = [group_by]
  //   //
  //   //   this.group_by = group_by
  //   // } else if (group_by === null) {
  //   //   debug('created group_by', group_by)
  //   //   this.group_by = []
  //   // }
  //   //
  //   // let selected_paths = this.$route.query.selected_paths
  //   //
  //   // if (selected_paths) {
  //   //   if (!Array.isArray(selected_paths)) selected_paths = [selected_paths]
  //   //
  //   //   this.selected_paths = selected_paths
  //   // } else if (selected_paths === null) {
  //   //   debug('created selected_paths', selected_paths)
  //   //   this.selected_paths = []
  //   // }
  //   //
  //   // let coloured = this.$route.query.coloured
  //   // debug('created coloured', coloured)
  //   // if (coloured) {
  //   //   this.coloured = !((coloured === 'false' || coloured === false))
  //   // }
  //
  //   // let layout = this.$route.query.layout
  //   // debug('created layout', layout)
  //   // if (layout && (layout === 'grid' || layout === 'row')) {
  //   //   this.layout = layout
  //   // }
  //   //
  //   // this.layout_prev = this.layout
  //
  //   // let by = this.$route.query.by
  //   // debug('created by', by)
  //   // if (by && (by === 'host' || by === 'domain')) {
  //   //   this.by = by
  //   // } else {
  //   //   this.by = 'host'
  //   // }
  //
  //   // Object.each(this.$route.query, function (value, prop) {
  //   //   if (/^data\..*$/.test(prop)) {
  //   //     debug('PROP', prop, value)
  //   //     prop = prop.replace('data.', '')
  //   //     this.$set(this.data, prop, value)
  //   //   }
  //   // }.bind(this))
  // },
  // mounted: function () {
  //   debug('lifecycle mounted', this._uid)
  //
  //   // Array.each(this.layoutBtns, function (btn) {
  //   //   if (btn.type === this.layout) {
  //   //     btn.state = true
  //   //   } else {
  //   //     btn.state = false
  //   //   }
  //   // }.bind(this))
  // },
  // watch: {
  //   stats: function (val) {
  //     debug('watch stats', val)
  //   },
  //   // system_paths: function (val) {
  //   //   if (this.selected_paths.length === 0) this.selected_paths = val
  //   // },
  //   // selected_paths: function (val) {
  //   //   debug('watch selected_paths', val)
  //   //   if (val && Array.isArray(val) && val.length > 0) {
  //   //     // // Array.each(this.val, function (path) {
  //   //     // Object.each(this.logs, function (data, group) {
  //   //     //   if (!this.group_by.contains('path') || !val.some(function (path) { return group.indexOf(path) > -1 })) {
  //   //     //     this.$delete(this.logs, group)
  //   //     //   }
  //   //     // }.bind(this))
  //   //     // // }.bind(this))
  //   //   }
  //   //   this.$router.replace({ query: { ...this.$route.query, selected_paths: val}}).catch(err => { debug('selected_paths set', err) })
  //   // },
  //   // logs: function (val) {
  //   //   debug('watch logs', val)
  //   //   if (val && Object.getLength(val) === 1 && this.rows !== 36) {
  //   //     this.rows = 44
  //   //   } else if (Object.getLength(val) > 1 && this.rows !== 24) {
  //   //     this.rows = 24
  //   //   }
  //   //
  //   //   debug('watch rows logs', this.rows)
  //   //
  //   //   if (val && Object.getLength(val) === 1 && this.layout === 'grid') {
  //   //     this.layout_prev = this.layout
  //   //     this.layout = 'row'
  //   //     Array.each(this.layoutBtns, function (btn) {
  //   //       if (btn.type === this.layout) {
  //   //         btn.state = true
  //   //       } else {
  //   //         btn.state = false
  //   //       }
  //   //     }.bind(this))
  //   //   } else if (Object.getLength(val) > 1 && this.layout !== this.layout_prev) {
  //   //     this.layout = this.layout_prev
  //   //     Array.each(this.layoutBtns, function (btn) {
  //   //       if (btn.type === this.layout) {
  //   //         btn.state = true
  //   //       } else {
  //   //         btn.state = false
  //   //       }
  //   //     }.bind(this))
  //   //   }
  //   //   // Object.each(val, function (data, name) {
  //   //   //   if (this.terminals[this.id + '.' + name + '.terminal']) {
  //   //   //     let terminal = this.terminals[this.id + '.' + name + '.terminal']
  //   //   //     Array.each(data, function (row) {
  //   //   //       terminal.writeln(row)
  //   //   //     })
  //   //   //   }
  //   //   // }.bind(this))
  //   //   // // if (this.terminal !== undefined && val) {
  //   //   // //   Array.each(val, function (row) {
  //   //   // //     this.terminal.writeln(row)
  //   //   // //   }.bind(this))
  //   //   // // }
  //   // },
  //
  //   hosts_data: function (val, other) {
  //     debug('WATCH hosts_data', val, other)
  //   },
  //   selected_hosts: function (val, other) {
  //     debug('WATCH selected_hosts', val, other)
  //     if (val && Array.isArray(val) && val.length > 0) {
  //       // // Array.each(this.val, function (host) {
  //       // Object.each(this.logs, function (data, group) {
  //       //   if (!this.group_by.contains('host') || !val.some(function (host) { return group.indexOf(host) > -1 })) {
  //       //     this.$delete(this.logs, group)
  //       //   }
  //       // }.bind(this))
  //       // // }.bind(this))
  //     }
  //
  //     this.destroy_pipelines(this.id)
  //     this.create_pipelines(this.id)
  //     this.resume_pipelines(this.id)
  //   },
  //   // group_by: function (val, other) {
  //   //   debug('WATCH group_by', val, other)
  //   //
  //   //   if (val && Array.isArray(val) && val.length > 0) {
  //   //     this.setGroupBy(this.group_by)
  //   //     // Array.each(this.val, function (host) {
  //   //     Object.each(this.logs, function (data, group) {
  //   //       this.$delete(this.logs, group)
  //   //       // if (!val.some(function (by) { return group.indexOf(by) > -1 })) {
  //   //       //   this.$delete(this.logs, group)
  //   //       // }
  //   //     }.bind(this))
  //   //     // }.bind(this))
  //   //   } else {
  //   //     this.setGroupBy(null)
  //   //   }
  //   //
  //   //   this.destroy_pipelines(this.id)
  //   //   this.create_pipelines(this.id)
  //   //   this.resume_pipelines(this.id)
  //   // },
  // },
  // computed: {
  //
  // },
  // methods: {
  //
  //   // setGroupBy: function (val) {
  //   //   this.$router.replace({query: { ...this.$route.query, group_by: val}}).catch(err => { debug('setGroupBy', err) })
  //   // },
  //   // switchColoured: function () {
  //   //   debug('switchColoured', this.coloured)
  //   //   // this.coloured = this.coloured !== true
  //   //   this.$router.replace({ query: { ...this.$route.query, coloured: this.coloured}}).catch(err => { debug('switchColoured', err) })
  //   // },
  //   //
  //   // setLayout: function (type) {
  //   //   this.layout = type
  //   //   this.layout_prev = type
  //   //   Array.each(this.layoutBtns, function (btn) {
  //   //     if (btn.type === this.layout) {
  //   //       btn.state = true
  //   //     } else {
  //   //       btn.state = false
  //   //     }
  //   //   }.bind(this))
  //   //   this.$router.replace({ query: { ...this.$route.query, layout: this.layout}}).catch(err => { debug('setLayout', err) })
  //   // },
  //   // setData: function (val) {
  //   //   let data = {}
  //   //   Object.each(this.data, function (value, prop) {
  //   //     if (!data['data.' + prop]) {
  //   //       data['data.' + prop] = value
  //   //     } else {
  //   //       if (!Array.isArray(data['data.' + prop])) {
  //   //         let tmp = data['data.' + prop]
  //   //         data['data.' + prop] = []
  //   //         data['data.' + prop].push(tmp)
  //   //       }
  //   //
  //   //       data['data.' + prop].push(value)
  //   //     }
  //   //   })
  //   //   this.$router.replace({query: { ...this.$route.query, ...data}}).catch(err => { debug('setData', err) })
  //   // },
  //   /**
  //   * @start pipelines
  //   **/
  //   create_pipelines: function (create_id, next) {
  //     debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)), create_id, this.components, this._uid)
  //
  //     let template = Object.clone(Pipeline)
  //     template.input[0].poll.id = this.id
  //     template.input[0].poll.requests.periodical = this.refresh
  //
  //     // let pipeline_id = template.input[0].poll.id
  //     // let pipeline_id = this.id
  //
  //     if (!create_id || create_id === undefined || create_id === this.id) {
  //       // template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components[this.id], this.id)
  //       let components_requests = {}
  //
  //       if (this.$options.pipelines[this.id]) {
  //         components_requests = this.__merge_requests(this.id, this.__components_sources_to_requests(this.components, this.id))
  //
  //         this.destroy_pipelines(this.id)
  //       } else {
  //         components_requests = this.__components_sources_to_requests(this.components, this.id)
  //       }
  //
  //       let keys = this.components_to_keys(this.components)
  //
  //       debug('create_pipelines REQUESTS %o', components_requests, keys)
  //
  //       Array.each(keys, function (key) {
  //         if (
  //           EventBus &&
  //           (
  //             !EventBus._events['sent:' + this.id + '[' + key + ']'] ||
  //             (EventBus._events['sent:' + this.id + '[' + key + ']'] && EventBus._events['sent:' + this.id + '[' + key + ']'].length === 0)
  //             // (EventBus._events[pipeline_id + '.' + this.path] && !EventBus._events[pipeline_id + '.' + this.path].contains(this.__process_input_data))
  //           )
  //         ) {
  //           EventBus.$on('sent:' + this.id + '[' + key + ']', function (emit_query) {
  //             debug('start loader for', emit_query.params.id, emit_query)
  //           })
  //           EventBus.$on('received:' + this.id + '[' + key + ']', function (payload) {
  //             debug('stop loader for', payload)
  //           })
  //         }
  //       }.bind(this))
  //
  //       Array.each(template.input[0].poll.conn, function (conn, index) {
  //         template.input[0].poll.conn[index].requests = components_requests
  //       })
  //
  //       let pipe = new JSPipeline(template)
  //
  //       this.$options.__pipelines_cfg[this.id] = {
  //         ids: [],
  //         connected: [],
  //         suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
  //       }
  //
  //       this.$options.pipelines[this.id] = pipe
  //     }
  //     debug('create_pipelines %o', this.$options.pipelines)
  //
  //     if (next) { next() }
  //   }
  //
  //   /**
  //   * @end pipelines
  //   **/
  //
  // }
}
</script>
