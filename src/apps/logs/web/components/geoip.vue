<template>
  <div class="card">
    <div class="card-body">
      <!-- <h3 class="card-title">Countries web access</h3> -->
      <div class="d-flex">
        <!-- <h3 class="card-title">Geo data</h3> -->
        <h3 class="card-title">
          <b-link v-if="forceView === false" :to="{name: 'logs_web', query: { ...$route.query }}">Geo data</b-link>
          <template v-else>{{labels[geoip_view]}}</template>
        </h3>
        <!-- <div class="subheader">Countries web access</div> -->
        <div class="ml-auto lh-1" v-if="forceView === false">
          <b-dropdown  variant="link" toggle-class="text-decoration-none btn-options" no-caret right>
            <template v-slot:button-content>
              <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{labels[geoip_view]}}
              </a>
            </template>

            <b-dropdown-item v-for="(label, view) in labels" :key="view" :to="{query: { ...$route.query, geoip_view: view}}" :active="geoip_view === view" @click="setView(view)" replace>
              {{label}}
            </b-dropdown-item>

          </b-dropdown>

        </div>
      </div>
      <!-- <div class="embed-responsive embed-responsive-16by9"> -->
        <div :key="'hosts.geoip.'+geoip_view">
          <!-- class="embed-responsive-item"  -->
          <!-- <div class="w-100 h-100"> -->
            <chart-tabular
              v-if="geoip_view === 'world_map_country_counter' || geoip_view === 'top_world_map_country_counter'"
              :wrapper="{
                type: atlasCountriesWrapper,
                props:{
                  /* colorScheme: colorScheme, */
                  dark: dark,
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.geoip.'+geoip_view"
              :id="'hosts.geoip.'+geoip_view"
              :config="{
                style: (fluid !== true) ? {height: '250px'} : (mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
                /* class: 'w-100 h-100' */
              }"
              :stat="{
                data: [geodata],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="true"
              :EventBus="EventBus"
            >
            </chart-tabular>

            <chart-tabular
              v-else-if="geoip_view === 'world_map_city_counter' || geoip_view === 'top_world_map_city_counter'"
              :wrapper="{
                type: atlasCitiesWrapper,
                props:{
                  /* colorScheme: colorScheme, */
                  dark: dark,
                  followColorScheme: false
                }
              }"
              :always_update="false"
              :ref="'hosts.geoip.'+geoip_view"
              :id="'hosts.geoip.'+geoip_view"
              :config="{
                style: (fluid !== true) ? {height: '250px'} : (mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
                /* class: 'w-100 h-100' */
              }"
              :stat="{
                data: [geodata],
                length: 1,
                numeric: false
              }"
              :reactive="false"
              :no_buffer="true"
              :EventBus="EventBus"
            >
            </chart-tabular>

            <chart-tabular
              v-else-if="geoip_view === 'country_counter' || geoip_view === 'city_counter'"
              :wrapper="{
                type: barRaceWrapper,
                props: (/country/.test(geoip_view)) ? Object.merge(barRaceConfigCountries.props, {sum: (geoip_sum.contains(geoip_view)) ? true : false }) : Object.merge(barRaceConfigCities.props, {sum: (geoip_sum.contains(geoip_view)) ? true : false })
              }"
              :always_update="false"
              :ref="'hosts.geoip.'+geoip_view + ((geoip_sum.contains(geoip_view)) ? '_sum' : '')"
              :id="'hosts.geoip.'+geoip_view + ((geoip_sum.contains(geoip_view)) ? '_sum' : '')"
              :key="'hosts.geoip.'+geoip_view + ((geoip_sum.contains(geoip_view)) ? '_sum' : '')"
              :config="(/country/.test(geoip_view)) ? barRaceConfigCountries : barRaceConfigCities"
              :stat="{
                data: [
                  geodata
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
            :class="(geoip_view !== 'country_counter' && geoip_view !== 'city_counter') ? 'invisible' : ''"
            class="form-switch"
            v-model="geoip_sum"
            :value="geoip_view"
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
const debug = Debug('apps:logs:web:components:geoip')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BDropdown, BDropdownItem, BFormCheckbox, BLink } from 'bootstrap-vue'

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
  name: 'AppHostsGeoip',
  // mixins: [DataSourcesMixin],

  components: {
    // BProgress,
    // BProgressBar
    // BButton,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BLink,
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
    view: {
      type: String,
      default: 'requests_counter',
    },
    forceView: {
      type: Boolean,
      default: false
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
          city_counter: [],
          country_counter: [],
          top_city_counter: [],
          top_country_counter: [],
          continent_counter: [],
          world_map_city_counter: [],
          top_world_map_city_counter: [],
          world_map_country_counter: [],
          top_world_map_country_counter: []
        }
      }
    }
  },
  mounted: function () {
    // debug('getBrand',
    //   colors.lighten(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary'), -10),
    //   am4core.color(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary')),
    //   am4core.color(window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary')).lighten(0.1)
    // )
    //

    if (this.forceView === false) {
      const geoip_view = this.$route.query.geoip_view
      if (geoip_view) {
        this.geoip_view = (this.labels[geoip_view]) ? geoip_view : this.view
      }
    } else {
      this.geoip_view = this.view
    }
    // const geoip_view = this.$route.query.geoip_view
    // if (geoip_view) {
    //   this.geoip_view = geoip_view
    // }

    let geoip_sum = this.$route.query.geoip_sum
    debug('created geoip_sum', geoip_sum)
    if (geoip_sum) {
      if (!Array.isArray(geoip_sum)) geoip_sum = [geoip_sum]
      this.geoip_sum = geoip_sum
      // this.geoip_sum = (geoip_sum === 'true' || geoip_sum === true)
    } else {
      this.geoip_sum = []
    }
  },
  watch: {
    view: function (val) {
      if (this.forceView === true) {
        this.geoip_view = val
      }
    },
    forceView: function (val) {
      if (val === true) {
        this.geoip_view = this.view
      } else {
        const geoip_view = this.$route.query.geoip_view
        if (geoip_view) {
          this.geoip_view = (this.labels[geoip_view]) ? geoip_view : this.view
        }
      }
    },
    geoip_view: function (val) {
      this.$router.replace({ path: this.$route.path, query: Object.merge(Object.clone(this.$route.query), { geoip_view: val }) }).catch(err => { debug(err) })// catch 'NavigationDuplicated' error
      // this.$router.push(`${this.$route.path}?tab=${val}`).catch(err => {})// catch 'NavigationDuplicated' error
    },
    geoip_sum: function (val) {
      this.$router.replace({ path: this.$route.path, query: Object.merge(Object.clone(this.$route.query), { geoip_sum: val }) }).catch(err => { debug('geoip_sum', err) })
      // this.$router.push(`${this.$route.path}?tab=${val}`).catch(err => {})// catch 'NavigationDuplicated' error
    },
    'stat': {
      handler: function (newVal, oldVal) {
        newVal = JSON.parse(JSON.stringify(newVal)) // remove reactivity
        debug('stat.data', newVal, this.geoip_view, amcharts4ConfigBarRace, this.barRaceConfigCities)

        // // let val = (newVal !== undefined && newVal[0] && newVal[0].value) ? newVal[0] : (oldVal !== undefined && oldVal[0] && oldVal[0].value) ? oldVal[0] : { timestamp: 0, value: { seconds: 0 } }
        if (newVal && newVal[this.geoip_view]) {
          let val = newVal[this.geoip_view]

          if (/world_map/.test(this.geoip_view)) {
            val.sort(function (a, b) { return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0) })
            let color = am4core.color(this.baseColor)
            Array.each(val, function (row, index) {
              if (/world_map_city_counter/.test(this.geoip_view)) {
                row.color = color
              } else {
                if (index > 10) index = 10
                row.color = color.lighten(index / 10)
              }
            }.bind(this))
          }

          this.geodata = val

          debug('stat.data', this.geodata)
        } else {
          this.geodata = []
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
      geodata: [],
      baseColor: window.getComputedStyle(document.documentElement).getPropertyValue('--tblr-primary'),
      labels: {
        top_world_map_country_counter: 'TOP Countries Atlas',
        world_map_country_counter: 'Countries Atlas',
        top_world_map_city_counter: 'TOP Cities Atlas',
        world_map_city_counter: 'Cities Atlas',
        country_counter: 'Countries bar race',
        city_counter: 'Cities bar race'
      },

      atlasCountriesWrapper: amchartsWorldCountryMapWrapper,
      atlasCitiesWrapper: amchartsWorldCityMapWrapper,
      barRaceWrapper: amchartsBarRaceWrapper,

      barRaceConfigCountries: Object.merge(Object.clone(amcharts4ConfigBarRace), {
        style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
        props: {
          categoryY: 'geodata',
          valueX: undefined,
          /* label: (sum === true) ? 'Per COUNTRY count (sum)' : 'Per COUNTRY count', */
          // zoom: apply_zoom,
          /* colorScheme: colorScheme, */
          dark: this.dark,
          // sum: this.sum
        }
      }),

      barRaceConfigCities: Object.merge(Object.clone(amcharts4ConfigBarRace), {
        style: (this.fluid !== true) ? {height: '250px'} : (this.mode === 'VerticalLayout') ? {height: '350px'} : {height: '400px'},
        props: {
          categoryY: 'geodata',
          valueX: undefined,
          /* label: (sum === true) ? 'Per COUNTRY count (sum)' : 'Per COUNTRY count', */
          // zoom: apply_zoom,
          /* colorScheme: colorScheme, */
          dark: this.dark,
          // sum: this.sum
        }
      }),

      EventBus: EventBus,

      geoip_view: 'top_world_map_country_counter',
      geoip_sum: [],
    }
  },
  methods: {
    setView: function (val) {
      this.geodata = []
      this.geoip_view = val
    },
    // setSum: function (val) {
    //   debug('setSum', val)
    //
    //   this.geoip_sum = val
    //   // this.$router.replace({name: 'hosts', query: { ...this.$route.query, geoip_sum: val}})
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
