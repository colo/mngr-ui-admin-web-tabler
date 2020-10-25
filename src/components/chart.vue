
<script>

let data_to_tabular = require('node-tabular-data').data_to_tabular

import * as Debug from 'debug'
const debug = Debug('components:chart')
debug.log = console.log.bind(console) // don't forget to bind to console!

import graph from '@mixins/graph'
import stat from '@mixins/stat'

export default {
  mixins: [graph, stat],

  // _chart_componets_defaults: {
  //   tabular: {
  //     lastupdate: 0,
  //     data: []
  //   }
  // },

  name: 'chart',

  charts: {},

  _chart_component_defaults: {
    type: 'stat'
  },

  methods: {
    create () {
      debug('create', this.id)
      if (!this.$options['charts'][this.id]) {
        this.$options['charts'][this.id] = {}
      }

      this.$options['charts'][this.id] = Object.merge(this.$options['charts'][this.id], Object.clone(this.$options._chart_component_defaults))
    },

    __update_data: function (data) {
      debug('__update_data %s %o %o', this.id, data, this.chart_init)

      if (data && data.length > 0) {
        // if(this.$options.__chart_init ==== false){
        if (this.chart_init === false) {
          this.__process_stat(this.config, this.id, data)
          data_to_tabular(data, this.config, this.id, (name, data) => this.update_chart_stat(name, data, true))
        } else {
          data_to_tabular(data, this.config, this.id, this.update_chart_stat.bind(this))
        }
      }
    },
    /**
    * copied to mngr-ui-admin-app/os
    **/
    __process_stat (config, name, stat) {
      debug('__process_stat', this.id)
      // console.log('__process_stat', name, stat)
      if (!Array.isArray(stat)) { stat = [stat] }

      if (isNaN(stat[0].value)) {
        // sdX.stats.

        let filtered = false
        if (config.watch && config.watch.filters) {
          Array.each(config.watch.filters, function (filter) {
            let prop_to_filter = Object.keys(filter)[0]
            let value_to_filter = filter[prop_to_filter]

            if (
              stat[0].value[prop_to_filter] &&
              value_to_filter.test(stat[0].value[prop_to_filter]) === true
            ) {
              filtered = true
            }
          })
        } else {
          filtered = true
        }

        if (filtered === true && typeof config.pre_process === 'function') {
          config = config.pre_process(config, name, stat)

          this.__process_chart(config, name, stat)
        }
      } else {
        if (typeof config.pre_process === 'function') {
          config = config.pre_process(config, name, stat)
        }

        this.__process_chart(config, name, stat)
      }
    },

    /**
    * copied to mngr-ui-admin-app/os
    **/
    __process_chart (config, name, stat) {
      debug('__process_chart', this.id)

      /// ///console.log('__process_chart', this.stat_data, name, stat)

      if (config.init && typeof config.init === 'function') {
        config.init(this, config, name, stat, 'chart')
        // this.$set(this, 'chart_init', true)
      }
      // else {
      this.$set(this, 'chart_init', true)
      // }

      /**
      * first update
      **/
      // if(this.stat_data.length > 0){
      // if (stat.length > 0) {
      //   data_to_tabular(stat, config, name, this.update_chart_stat.bind(this))
      // }

      // this.__create_watcher(name, config)
    }

  }
}
</script>
