<template>
  <div class="col">
    <div class="card card-sm">
      <div class="card-body d-flex align-items-center">
        <span class="bg-blue text-white stamp mr-3"><svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><path data-v-2a169e26="" d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"></path></svg>
        </span>
        <div class="mr-3 lh-sm">
          <div class="strong">
            {{uptime}} {{unit}} uptime
          </div>
          <div class="text-muted">{{seconds}} seconds</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:uptime')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BProgress, BProgressBar } from 'bootstrap-vue'

export default {
  name: 'AppHostsUptime',
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
      default: function () {
        return [{
          timestamp: 0,
          value: 0
        }]
      }
    }
  },
  watch: {
    'stat': {
      handler: function (newVal, oldVal) {
        // // let cores = 0
        let val = (newVal !== undefined && newVal[0] && newVal[0].value) ? newVal[0] : (oldVal !== undefined && oldVal[0] && oldVal[0].value) ? oldVal[0] : { timestamp: 0, value: { seconds: 0 } }
        debug('stat.data', val)

        let uptime = val.value.seconds
        let unit = 'seconds'
        let divider = 1
        if (uptime > 31556926) {
          unit = 'years'
          divider = 31556926
        } else if (uptime > 86400) {
          unit = 'days'
          divider = 86400
        } else if (uptime > 3600) {
          unit = 'hours'
          divider = 3600
        } else if (uptime > 60) {
          unit = 'minutes'
          divider = 60
        }

        this.uptime = (uptime / divider).toFixed(1)
        this.seconds = uptime
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
      uptime: 0,
      seconds: 0,
      // // height: '0px',
      // diff_percentage: 0,
      // prev_percentage: undefined,
      // prev_value: undefined,
      // percentage: 0,
      // cores: 0,
      unit: 'seconds',
      // /**
      // * dataSources
      // **/
      // // store: false,
      // // pipeline_id: ['input.hosts.periodical'],
      // //
      // // id: 'input.hosts.uptime.periodical',
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
