<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Empty page
          </h2>
        </div>
      </div>
    </div>
    <!-- Content here -->
  </q-page>
</template>

<script>
import * as Debug from 'debug'
const debug = Debug('apps:start')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
import Pipeline from '@apps/start/pipelines/index'

import DataSourcesMixin from '@mixins/dataSources'

import { requests, store } from './sources/index'

export default {
  mixins: [DataSourcesMixin],
  name: 'AppStart',

  data () {
    return {
      height: '0px',

      /**
      * dataSources
      **/
      store: true,
      pipeline_id: 'input.start',

      id: 'start',
      path: 'all',

      components: {
        'all': [
          {
            some_data: {
              test: true
            },
            source: {
              requests: requests,
              store: store
            }
          }

        ]
      }
    }
  },
  methods: {
    /**
    * @start pipelines
    **/
    create_pipelines: function (create_id, next) {
      debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)))

      let template = Object.clone(Pipeline)

      let pipeline_id = template.input[0].poll.id

      if (!create_id || create_id === undefined || create_id === pipeline_id) {
        // template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components[pipeline_id], pipeline_id)
        let components_requests = {}

        if (this.$options.pipelines[pipeline_id]) {
          components_requests = this.__merge_requests(pipeline_id, this.__components_sources_to_requests(this.components, pipeline_id))

          this.destroy_pipelines(pipeline_id)
        } else {
          components_requests = this.__components_sources_to_requests(this.components, pipeline_id)
        }

        debug('create_pipelines REQUESTS %o', components_requests)

        Array.each(template.input[0].poll.conn, function (conn, index) {
          template.input[0].poll.conn[index].requests = components_requests
        })

        let pipe = new JSPipeline(template)

        this.$options.__pipelines_cfg[pipeline_id] = {
          ids: [],
          connected: [],
          suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
        }

        this.$options.pipelines[pipeline_id] = pipe
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
