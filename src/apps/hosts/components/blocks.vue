<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="subheader">Disks (using {{this.default_block_size}} blocks size)</div>
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
      <div class="h1 mb-3">{{size}} {{unit}}</div>
      <div class="d-flex mb-2">
        <div>Usage: {{percentage}}%</div>
        <div class="ml-auto">
          <span class="d-inline-flex align-items-center lh-1" :class="(diff_percentage > 0) ? 'text-red' : (diff_percentage < 0) ? 'text-green' : 'text-yellow'">
            {{diff_percentage}}%
            <svg v-if="diff_percentage > 0" xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
            <svg v-else-if="diff_percentage < 0" data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><polyline data-v-2a169e26="" points="3 7 9 13 13 9 21 17"></polyline><polyline data-v-2a169e26="" points="21 10 21 17 14 17"></polyline></svg>
            <svg v-else data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><line data-v-2a169e26="" x1="5" y1="12" x2="19" y2="12"></line></svg>
          </span>
        </div>
      </div>
      <!-- <div class="progress progress-sm">
        <div class="progress-bar bg-blue" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <span class="sr-only">75% Complete</span>
        </div>
      </div> -->
      <b-progress size="sm" max="100" height="4px">
        <b-progress-bar :value="percentage" :class="'bg-blue'"></b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:blocks')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BProgress, BProgressBar } from 'bootstrap-vue'

export default {
  name: 'AppHostsBlocks',
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
      type: Array,
      default: function () { return [] }
    }
  },
  watch: {
    'stat': {
      handler: function (newVal, oldVal) {
        // let blocks = 0
        let val = (newVal !== undefined && newVal[0] && newVal[0].value) ? newVal[0] : (oldVal !== undefined && oldVal[0] && oldVal[0].value) ? oldVal[0] : { timestamp: undefined, value: {availabe: 0, total: 0, used: 0}}

        let percentage = (((val.value.total - val.value.used) * 100) / val.value.total).toFixed(2) * 1
        this.prev_percentage = this.percentage
        this.percentage = (isNaN(percentage)) ? 0 : percentage
        this.diff_percentage = this.percentage - this.prev_percentage
        this.diff_percentage = ((this.diff_percentage === this.percentage) ? 0 : this.diff_percentage).toFixed(2) * 1
        // total = val.value.total
        debug('stat.data', oldVal, newVal, this.percentage)
        this.blocks = val.value.total

        let size = this.blocks * this.default_block_size
        // let info = 'Bytes'
        let unit = 'bytes'
        let divider = 1
        if (size > 1099511627776) {
          unit = 'Tb'
          // info = 'MBytes'
          divider = 1099511627776
        } else if (size > 1073741824) {
          unit = 'Gb'
          // info = 'MBytes'
          divider = 1073741824
        } else if (size > 1048576) {
          unit = 'Mb'
          // info = 'MBytes'
          divider = 1048576
        } else if (size > 1024) {
          unit = 'Kb'
          // info = 'KBytes'
          divider = 1024
        }

        this.size = (size / divider).toFixed(1)
        this.unit = unit
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
      // height: '0px',
      diff_percentage: 0,
      prev_percentage: undefined,
      // prev_value: undefined,
      percentage: 0,
      blocks: 0,
      size: 0,
      default_block_size: 1024,
      unit: 'bytes',
      /**
      * dataSources
      **/
      // store: false,
      // pipeline_id: ['input.hosts.periodical'],
      //
      // id: 'input.hosts.blocks.periodical',
      // path: 'all',
      //
      // // host: 'draco',
      // components: {
      //   'all': [
      //     {
      //       // some_data: {
      //       //   hosts: true
      //       // },
      //       source: {
      //         requests: requests,
      //         store: store
      //       }
      //     }
      //
      //   ]
      // },
      //
      // eventbus: EventBus,

      // stat: {
      //   data: [],
      //   length: 2
      // },

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
