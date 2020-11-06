<template>
  <div class="card">
    <div class="card-body">
      <!-- <h3 class="card-title">Countries web access</h3> -->
      <div class="d-flex">
        <h3 class="card-title">Traffic Summary</h3>
        <!-- <div class="subheader">Countries web access</div> -->
        <div class="ml-auto lh-1">
          <b-dropdown  variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
            <template v-slot:button-content>
              <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{labels[traffic_view]}}
              </a>
            </template>

            <b-dropdown-item v-for="(label, view) in labels" :key="view" :to="{name: 'hosts', query: { ...$route.query, traffic_view: view}}" :active="traffic_view === view" @click="setView(view)" replace>
              {{label}}
            </b-dropdown-item>

          </b-dropdown>

        </div>
      </div>
      <!-- <div class="embed-responsive embed-responsive-16by9"> -->
        <div :key="'hosts.traffic.'+traffic_view">
          <!-- class="embed-responsive-item"  -->
          <!-- <div class="w-100 h-100"> -->
            <chart-tabular
              v-if="traffic_view === 'world_map_country_counter' || traffic_view === 'top_world_map_country_counter'"
              :wrapper="{
                type: atlasCountriesWrapper,
                props:{
                  /* colorScheme: colorScheme, */
                  dark: dark,
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.traffic.'+traffic_view"
              :id="'hosts.traffic.'+traffic_view"
              :config="{
                style: (fluid !== true) ? {height: '250px'} : (mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
                /* class: 'w-100 h-100' */
              }"
              :stat="{
                data: [trafficdata],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="true"
              :EventBus="EventBus"
            >
            </chart-tabular>

            <chart-tabular
              v-else-if="traffic_view === 'world_map_city_counter' || traffic_view === 'top_world_map_city_counter'"
              :wrapper="{
                type: atlasCitiesWrapper,
                props:{
                  /* colorScheme: colorScheme, */
                  dark: dark,
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.traffic.'+traffic_view"
              :id="'hosts.traffic.'+traffic_view"
              :config="{
                style: (fluid !== true) ? {height: '250px'} : (mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
                /* class: 'w-100 h-100' */
              }"
              :stat="{
                data: [trafficdata],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="true"
              :EventBus="EventBus"
            >
            </chart-tabular>

            <chart-tabular
              v-else-if="traffic_view === 'domain_counter' || traffic_view === 'host_counter'"
              :wrapper="{
                type: barRaceWrapper,
                props: (/domain/.test(traffic_view)) ? Object.merge(barRaceConfigDomains.props, {sum:sum}) : Object.merge(barRaceConfigHosts.props, {sum:sum})
              }"
              :always_update="false"
              :ref="'hosts.traffic.'+traffic_view + ((sum === true) ? '_sum' : '')"
              :id="'hosts.traffic.'+traffic_view + ((sum === true) ? '_sum' : '')"
              :key="'hosts.traffic.'+traffic_view + ((sum === true) ? '_sum' : '')"
              :config="(/domain/.test(traffic_view)) ? barRaceConfigDomains : barRaceConfigHosts"
              :stat="{
                data: [
                  trafficdata
                ],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="false"
            >
            </chart-tabular>

          <!-- </div> -->
        </div>
      <!-- </div> -->
      <div class="d-flex">
        <!-- Use quasar's invisible class to hide element but keep it using the same space  -->
        <div class="ml-auto lh-1">
          <b-form-checkbox
            :class="(traffic_view !== 'domain_counter' && traffic_view !== 'host_counter') ? 'invisible' : ''"
            class="form-switch"
            v-model="sum"
            plain
          >
            Sum
          </b-form-checkbox>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:traffic')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BDropdown, BDropdownItem, BFormCheckbox } from 'bootstrap-vue'

import amcharts4ConfigBarRace from 'mngr-ui-admin-charts/defaults/amcharts4.barRace'

import amchartsWorldCountryMapWrapper from 'components/wrappers/amchartsWorldCountryMap'
import amchartsWorldCityMapWrapper from 'components/wrappers/amchartsWorldCityMap'
import amchartsBarRaceWrapper from 'components/wrappers/amchartsBarRace'

import chartTabular from 'components/chart.tabular'

import { EventBus } from '@libs/eventbus'

// import { mapState } from 'vuex'

import { colors } from 'quasar'
import * as am4core from '@amcharts/amcharts4/core'

export default {
  name: 'AppHostsTraffic',
  // mixins: [DataSourcesMixin],

  components: {
    // BProgress,
    // BProgressBar
    // BButton,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    // BModal,
    chartTabular,
    // chart
  },

  // computed: {
  //   ...mapState({
  //     fluid: state => state.layout.fluid,
  //   }),
  //
  // },
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
    // type: {
    //   type: String,
    //   default: 'countries-atlas'
    // },
    stat: {
      type: Object,
      default: function () {
        return {
          host_counter: [],
          domain_counter: [],
          top_host_counter: [],
          top_domain_counter: [],
        }
      }
    }
  },
  created: function () {
    // debug('getBrand',
    //   colors.lighten(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary'), -10),
    //   am4core.color(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary')),
    //   am4core.color(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary')).lighten(0.1)
    // )
    //
    // debug('create', this.mode)
    const traffic_view = this.$route.query.traffic_view
    if (traffic_view) {
      this.traffic_view = traffic_view
    }
  },
  watch: {
    traffic_view: function (val) {
      this.$router.push({ path: this.$route.path, query: Object.merge(Object.clone(this.$route.query), { traffic_view: val }) }).catch(err => { debug(err) })// catch 'NavigationDuplicated' error
      // this.$router.push(`${this.$route.path}?tab=${val}`).catch(err => {})// catch 'NavigationDuplicated' error
    },
    'stat': {
      handler: function (newVal, oldVal) {
        newVal = JSON.parse(JSON.stringify(newVal)) // remove reactivity
        debug('stat.data', newVal, this.traffic_view, amcharts4ConfigBarRace, this.barRaceConfigHosts)

        // // let val = (newVal !== undefined && newVal[0] && newVal[0].value) ? newVal[0] : (oldVal !== undefined && oldVal[0] && oldVal[0].value) ? oldVal[0] : { timestamp: 0, value: { seconds: 0 } }
        if (newVal && newVal[this.traffic_view]) {
          let val = newVal[this.traffic_view]

          if (/world_map/.test(this.traffic_view)) {
            val.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })
            let color = am4core.color(this.baseColor)
            Array.each(val, function (row, index) {
              if (/world_map_city_counter/.test(this.traffic_view)) {
                row.color = color
              } else {
                if (index > 10) index = 10
                row.color = color.lighten(index / 10)
              }
            }.bind(this))
          }

          this.trafficdata = val

          debug('stat.data', this.trafficdata)
        } else {
          this.trafficdata = []
        }
      },
      // deep: true,
      // immediate: true
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
      trafficdata: [],
      baseColor: window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary'),
      labels: {
        host_counter: 'Hosts',
        domain_counter: 'Domains',
        // top_host_counter: 'TOP Hosts',
        // top_domain_counter: 'TOP Domains',
      },

      sum: false,

      atlasCountriesWrapper: amchartsWorldCountryMapWrapper,
      atlasCitiesWrapper: amchartsWorldCityMapWrapper,
      barRaceWrapper: amchartsBarRaceWrapper,

      barRaceConfigDomains: Object.merge(Object.clone(amcharts4ConfigBarRace), {
        style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
        props: {
          categoryY: 'trafficdata',
          valueX: undefined,
          /* label: (sum === true) ? 'Per COUNTRY count (sum)' : 'Per COUNTRY count', */
          // zoom: apply_zoom,
          /* colorScheme: colorScheme, */
          dark: this.dark,
          // sum: this.sum
        }
      }),

      barRaceConfigHosts: Object.merge(Object.clone(amcharts4ConfigBarRace), {
        style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
        props: {
          categoryY: 'trafficdata',
          valueX: undefined,
          /* label: (sum === true) ? 'Per COUNTRY count (sum)' : 'Per COUNTRY count', */
          // zoom: apply_zoom,
          /* colorScheme: colorScheme, */
          dark: this.dark,
          // sum: this.sum
        }
      }),

      EventBus: EventBus,

      traffic_view: 'domain_counter',
    }
  },
  methods: {
    setView: function (val) {
      this.trafficdata = []
      this.traffic_view = val
    },
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
