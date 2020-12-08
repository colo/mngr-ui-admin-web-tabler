<template>
  <div class="card">
    <div class="card-body">
      <!-- <h3 class="card-title">Countries web access</h3> -->
      <div class="d-flex">
        <h3 class="card-title">
          <b-link v-if="forceView === false" :to="{name: 'logs_web', query: { ...$route.query }}">Traffic Summary</b-link>
          <template v-else>{{labels[traffic_view]}}</template>
        </h3>
        <!-- <div class="subheader">Countries web access</div> -->
        <div class="ml-auto lh-1" v-if="forceView === false">
          <b-dropdown  variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
            <template v-slot:button-content>
              <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{labels[traffic_view]}}
              </a>
            </template>

            <b-dropdown-item v-for="(label, view) in labels" :key="view" :to="{query: { ...$route.query, traffic_view: view}}" :active="traffic_view === view" @click="setView(view)" replace>
              {{label}}
            </b-dropdown-item>

          </b-dropdown>

        </div>
      </div>
      <!-- <div class="embed-responsive embed-responsive-16by9"> -->
        <div :key="'hosts.traffic.'+traffic_view">
          <!-- class="embed-responsive-item"  -->
          <!-- <div class="w-100 h-100"> -->
            <chart
              v-if="barChartRegEx.test(traffic_view)"
              :wrapper="{
                type: barWrapper,
                props: barConfig.props
              }"
              :always_update="false"
              :ref="'hosts.traffic.'+traffic_view"
              :id="'hosts.traffic.'+traffic_view"
              :config="barConfig"
              :stat="{
                data: [trafficdata],
                length: 30,
                numeric: true,
                /* interval: 1 */
              }"
              :reactive="false"
              :no_buffer="barChartNoBufferRegEx.test(traffic_view) ? true: false"
              :EventBus="EventBus"
            >
            </chart>

            <!-- <chart-tabular
              v-else-if="traffic_view === 'world_map_city_counter' || traffic_view === 'top_world_map_city_counter'"
              :wrapper="{
                type: atlasCitiesWrapper,
                props:{
                  dark: dark,
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.traffic.'+traffic_view"
              :id="'hosts.traffic.'+traffic_view"
              :config="{
                style: (fluid !== true) ? {height: '250px'} : (mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
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
            </chart-tabular> -->

            <chart-tabular
              v-else
              :wrapper="{
                type: barRaceWrapper,
                /* props: (/domain/.test(traffic_view)) ? Object.merge(barRaceConfigDomains.props, {sum:traffic_sum}) : Object.merge(barRaceConfigHosts.props, {sum:traffic_sum}) */
                props : Object.merge(barRaceConfig.props, {sum: (traffic_sum.contains(traffic_view)) ? true : false})
              }"
              :always_update="false"
              :ref="'hosts.traffic.'+traffic_view + ((traffic_sum.contains(traffic_view)) ? '_sum' : '')"
              :id="'hosts.traffic.'+traffic_view + ((traffic_sum.contains(traffic_view)) ? '_sum' : '')"
              :key="'hosts.traffic.'+traffic_view + ((traffic_sum.contains(traffic_view)) ? '_sum' : '')"
              :config="barRaceConfig"
              :stat="{
                data: [
                  trafficdata
                ],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="barChartNoBufferRegEx.test(traffic_view) ? true: false"
            >
            </chart-tabular>
            <!-- v-else-if="traffic_view === 'domains_counter' || traffic_view === 'hosts_counter'" -->
            <!-- :config="(/domain/.test(traffic_view)) ? barRaceConfigDomains : barRaceConfigHosts" -->

          <!-- </div> -->
        </div>
      <!-- </div> -->
      <div class="d-flex">
        <!-- Use quasar's invisible class to hide element but keep it using the same space  -->
        <div class="ml-auto lh-1">
          <b-form-checkbox
            :class="barChartRegEx.test(traffic_view) ? 'invisible' : ''"
            class="form-switch"
            v-model="traffic_sum"
            :value="traffic_view"
            plain
          >
          <!-- @input="setSum" -->
            Sum
          </b-form-checkbox>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:logs:web:components:traffic')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BDropdown, BDropdownItem, BFormCheckbox, BLink } from 'bootstrap-vue'

/**
* Chart configs
**/
import amcharts4ConfigBarRace from 'mngr-ui-admin-charts/defaults/amcharts4.barRace'
import barConfigApexchart from './config/traffic.bar.apexchart'
import barConfigDygraph from 'mngr-ui-admin-charts/defaults/dygraph.line'

/**
* Chart Wrappers
**/
// import amchartsWorldCountryMapWrapper from 'components/wrappers/amchartsWorldCountryMap'
// import amchartsWorldCityMapWrapper from 'components/wrappers/amchartsWorldCityMap'
import amchartsBarRaceWrapper from 'components/wrappers/amchartsBarRace'
import vueApexChartsWrapper from 'components/wrappers/vueApexCharts'
import dygraphBarWrapper from 'components/wrappers/dygraphBar'

import chart from 'components/chart'
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
    BLink,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    // BModal,
    chartTabular,
    chart
  },

  // computed: {
  //   ...mapState({
  //     fluid: state => state.layout.fluid,
  //   }),
  //
  // },
  props: {
    view: {
      type: String,
      default: 'requests_counter',
    },
    forceView: {
      type: Boolean,
      default: false
    },
    route: {
      type: String,
      default: 'logs_web'
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
    // type: {
    //   type: String,
    //   default: 'countries-atlas'
    // },
    stat: {
      type: Object,
      default: function () {
        return {
          // hosts_counter: [],
          // domains_counter: [],
          // top_hosts_counter: [],
          // top_domains_counter: [],
        }
      }
    }
  },
  data () {
    return {
      barType: 'dygraph',

      trafficdata: [],
      // baseColor: window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary'),
      labels: {
        requests_counter: 'Requests',
        status_counter: 'Status',
        methods_counter: 'Methods',
        // pathnames_counter: 'Pathnames',
        top_pathnames_counter: 'TOP Pathnames',
        type_counter: 'Type (static | dynamic)',
        bytes_counter: 'Data transferred (Mbs)',
        /* addr_counter: 'IP Addr', */
        // top_addr_counter: 'TOP IP Addresses',
        // top_hosts_counter: 'TOP Hosts',
        // top_domains_counter: 'TOP Domains',
        user_counter: 'Users',
        referer_counter: 'Referers',
        user_agent_os_counter: 'User agent - OS',
        user_agent_engine_counter: 'User agent - Engines',
        user_agent_device_counter: 'User agent - Devices',
        user_agent_browser_counter: 'User agent - Browsers',
        hosts_counter: 'Hosts',
        domains_counter: 'Domains',
      },

      // atlasCountriesWrapper: amchartsWorldCountryMapWrapper,
      // atlasCitiesWrapper: amchartsWorldCityMapWrapper,
      barRaceWrapper: amchartsBarRaceWrapper,

      barConfigDefaults: {
        style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
        props: {
          /* colorScheme: colorScheme, */
          dark: this.dark,
          followColorScheme: false
        },
        options: {
          // chart: {
          //   height: (this.fluid !== true) ? 250 : (this.mode === 'VerticalLayout') ? 350 : 400,
          // },
          // legend: {
          //   height: (this.fluid !== true) ? 250 : (this.mode === 'VerticalLayout') ? 350 : 400,
          // }
        }
      },

      barChartRegEx: /^(?!(hosts_counter|domains_counter|top_pathnames_counter)).*$/, /// ^(?!.*(hosts_counter|domains_counter)).*$/,
      barChartNoBufferRegEx: /addr|agent_os/,

      barRaceConfig: Object.merge(Object.clone(amcharts4ConfigBarRace), {
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
      // barRaceConfigDomains: Object.merge(Object.clone(amcharts4ConfigBarRace), {
      //   style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
      //   props: {
      //     categoryY: 'trafficdata',
      //     valueX: undefined,
      //     /* label: (sum === true) ? 'Per COUNTRY count (sum)' : 'Per COUNTRY count', */
      //     // zoom: apply_zoom,
      //     /* colorScheme: colorScheme, */
      //     dark: this.dark,
      //     // sum: this.sum
      //   }
      // }),
      //
      // barRaceConfigHosts: Object.merge(Object.clone(amcharts4ConfigBarRace), {
      //   style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
      //   props: {
      //     categoryY: 'trafficdata',
      //     valueX: undefined,
      //     /* label: (sum === true) ? 'Per COUNTRY count (sum)' : 'Per COUNTRY count', */
      //     // zoom: apply_zoom,
      //     /* colorScheme: colorScheme, */
      //     dark: this.dark,
      //     // sum: this.sum
      //   }
      // }),

      EventBus: EventBus,

      traffic_view: 'requests_counter',
      traffic_sum: [],
    }
  },
  mounted: function () {
    // debug('getBrand',
    //   colors.lighten(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary'), -10),
    //   am4core.color(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary')),
    //   am4core.color(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary')).lighten(0.1)
    // )
    //
    // debug('create', this.mode)
    if (this.forceView === false) {
      const traffic_view = this.$route.query.traffic_view
      if (traffic_view) {
        this.traffic_view = (this.labels[traffic_view]) ? traffic_view : this.view
      }
    } else {
      this.traffic_view = this.view
    }

    let traffic_sum = this.$route.query.traffic_sum
    debug('created traffic_sum', traffic_sum)
    if (traffic_sum) {
      if (!Array.isArray(traffic_sum)) traffic_sum = [traffic_sum]
      this.traffic_sum = traffic_sum
      // this.traffic_sum = (traffic_sum === 'true' || traffic_sum === true)
    } else {
      this.traffic_sum = []
    }
  },
  watch: {
    view: function (val) {
      if (this.forceView === true) {
        this.traffic_view = val
      }
    },
    forceView: function (val) {
      if (val === true) {
        this.traffic_view = this.view
      } else {
        const traffic_view = this.$route.query.traffic_view
        if (traffic_view) {
          this.traffic_view = (this.labels[traffic_view]) ? traffic_view : this.view
        }
      }
    },
    traffic_view: function (val) {
      this.$router.replace({ path: this.$route.path, query: Object.merge(Object.clone(this.$route.query), { traffic_view: val }) }).catch(err => { debug('traffic_view', err) })
      // this.$router.push(`${this.$route.path}?tab=${val}`).catch(err => {})// catch 'NavigationDuplicated' error
      if (this.barType === 'dygraph') { // dygraph needs to remove labels so it' can update them
        this.barConfig.options.labels = undefined
      }
    },
    traffic_sum: function (val) {
      this.$router.replace({ path: this.$route.path, query: Object.merge(Object.clone(this.$route.query), { traffic_sum: val }) }).catch(err => { debug('traffic_sum', err) })
      // this.$router.push(`${this.$route.path}?tab=${val}`).catch(err => {})// catch 'NavigationDuplicated' error
    },
    'stat': {
      handler: function (newVal, oldVal) {
        newVal = JSON.parse(JSON.stringify(newVal)) // remove reactivity
        debug('stat.data', newVal, this.traffic_view, this.barConfig)

        if (this.barChartNoBufferRegEx.test(this.traffic_view) && this.barType === 'dygraph') { // dygraph needs to remove labels so it' can update them
          this.barConfig.options.labels = undefined
        }

        // // let val = (newVal !== undefined && newVal[0] && newVal[0].value) ? newVal[0] : (oldVal !== undefined && oldVal[0] && oldVal[0].value) ? oldVal[0] : { timestamp: 0, value: { seconds: 0 } }
        if (newVal && newVal[this.traffic_view]) {
          let val = newVal[this.traffic_view]

          if (/bytes/.test(this.traffic_view)) {
          //   val.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })
          //   let color = am4core.color(this.baseColor)
            Array.each(val, function (row, index) {
              // row.value.bytes = (row.value.bytes / 1048576).toFixed(1) * 1 // to Mbs
              row.value.Mbytes = (row.value.bytes / 1048576).toFixed(1) * 1 // to Mbs
              delete row.value.bytes
            })
          }
          if (Array.isArray(val) && /^(?!.*(host|domain)).*$/.test(this.traffic_view)) {
            val.sort(function (a, b) { return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0) })
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
  computed: {
    barWrapper: function () {
      return (this.barType === 'dygraph') ? dygraphBarWrapper : vueApexChartsWrapper
    },
    barConfig: function () {
      return (this.barType === 'dygraph')
        ? Object.merge(Object.clone(barConfigDygraph), this.barConfigDefaults, {
          style: {
            height: (this.fluid !== true) ? '250px' : (this.mode === 'VerticalLayout') ? '350px' : '400px',
            width: '100%'
          }

        })
        : Object.merge(Object.clone(barConfigApexchart), this.barConfigDefaults, {
          options: {
            chart: {
              height: (this.fluid !== true) ? 250 : (this.mode === 'VerticalLayout') ? 350 : 400,
            },
            legend: {
              height: (this.fluid !== true) ? 250 : (this.mode === 'VerticalLayout') ? 350 : 400,
            }
          }
        })
    }
  },

  methods: {
    setView: function (val) {
      this.trafficdata = []
      this.traffic_view = val
    },
    // setSum: function (val) {
    //   debug('setSum', val)
    //
    //   this.traffic_sum = val
    //   // this.$router.replace({name: 'hosts', query: { ...this.$route.query, traffic_sum: val}}).catch(err => { debug('setSum', err) })
    // },
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
