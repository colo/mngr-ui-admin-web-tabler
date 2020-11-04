<template>
  <div class="card">
    <div class="card-body">
      <!-- <h3 class="card-title">Countries web access</h3> -->
      <div class="d-flex">
        <h3 class="card-title">Countries web access</h3>
        <!-- <div class="subheader">Countries web access</div> -->
        <div class="ml-auto lh-1">
          <b-dropdown  variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
            <template v-slot:button-content>
              <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Countries
              </a>
            </template>

            <b-dropdown-item active>
              Countries
            </b-dropdown-item>

            <b-dropdown-item>
              Cities
            </b-dropdown-item>

          </b-dropdown>

        </div>
      </div>
      <div class="embed-responsive embed-responsive-16by9">
        <div class="embed-responsive-item">
          <div class="w-100 h-100">
            <chart-tabular
              v-if="type === 'countries-atlas'"
              :wrapper="{
                type: worldCountriesWrapper,
                props:{
                  /* colorScheme: colorScheme, */
                  /* dark: dark, */
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.geodata.'+type"
              :id="'hosts.geodata.'+type"
              :config="{}"
              :stat="{
                data: [stat],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="true"
              :EventBus="EventBus"
            >
            </chart-tabular>

            <chart-tabular
              v-else-if="type === 'cities-atlas'"
              :wrapper="{
                type: worldCitiesWrapper,
                props:{
                  /* colorScheme: colorScheme, */
                  /* dark: dark, */
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.geodata.'+type"
              :id="'hosts.geodata.'+type"
              :config="{}"
              :stat="{
                data: [stat],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="true"
              :EventBus="EventBus"
            >
            </chart-tabular>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:geodata')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import amchartsWorldCountryMapWrapper from 'components/wrappers/amchartsWorldCountryMap'
import amchartsWorldCityMapWrapper from 'components/wrappers/amchartsWorldCityMap'
import chartTabular from 'components/chart.tabular'

import { EventBus } from '@libs/eventbus'

export default {
  name: 'AppHostsCountries',
  // mixins: [DataSourcesMixin],

  components: {
    // BProgress,
    // BProgressBar
    // BButton,
    BDropdown,
    BDropdownItem,
    // BModal,
    chartTabular,
    // chart
  },

  props: {
    type: {
      type: String,
      default: 'countries-atlas'
    },
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
  // watch: {
  //   'stat': {
  //     handler: function (newVal, oldVal) {
  //       debug('stat.data', newVal, oldVal)
  //       // let val = (newVal !== undefined && newVal[0] && newVal[0].value) ? newVal[0] : (oldVal !== undefined && oldVal[0] && oldVal[0].value) ? oldVal[0] : { timestamp: 0, value: { seconds: 0 } }
  //       // if (newVal.length > 0) {
  //       //   this.geodata = newVal
  //       // }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  // computed: {
  //   percentage: function () {
  //     let percentage = 0
  //     debug('percentage', this.stat)
  //     return percentage
  //   }
  // },
  data () {
    return {
      // geodata: [],
      // seconds: 0,
      // // height: '0px',
      // diff_percentage: 0,
      // prev_percentage: undefined,
      // prev_value: undefined,
      // percentage: 0,
      // cores: 0,
      // unit: 'seconds',

      worldCountriesWrapper: amchartsWorldCountryMapWrapper,
      worldCitiesWrapper: amchartsWorldCityMapWrapper,
      EventBus: EventBus,

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
