'use strict'

import { EventBus } from '@libs/eventbus'

import InputIO from './input/io'

import * as Debug from 'debug'
const debug = Debug('apps:hosts:pipelines')
debug.log = console.log.bind(console) // don't forget to bind to console!

let qs = require('qs')

let buffer = []
// let buffer_expire = 0
let expire_buffer_timeout = 1000 // one second

import IO from '@etc/start.io'

let ios = []
Array.each(IO(), function (io, index) {
  ios.push({
    id: 'input.hosts.' + index,
    module: InputIO,
    index: index
  },)
})

export default {
  input: [
    {
      poll: {
        // suspended: true,
        id: 'input.hosts',
        conn: ios,
        // conn: [
        //
        //   Object.merge(
        //     // Object.clone(DefaultConn),
        //     {
        //       id: 'input.hosts',
        //       module: InputIO
        //
        //     }
        //   )
        //
        // ],
        connect_retry_count: -1,
        connect_retry_periodical: 1000,
        requests: {
          periodical: 60000
        }
      }
    }

  ],
  filters: [
    function (doc, opts, next, pipeline) {
      debug('filter', doc, qs.stringify(doc.metadata.opts.query))
      if (doc.metadata.opts.params && doc.metadata.opts.params.id) {
        doc.id = doc.metadata.opts.params.id
      } else {
        doc.id = doc.metadata.input + '?' + qs.stringify(doc.metadata.opts.query)
      }

      next(doc, opts, next, pipeline)
    }
  ],
  output: [
    function (payload) {
      debug('OUTPUT', payload)

      if (!payload.err) { EventBus.$emit('input.hosts.' + payload.metadata.input, payload) }

      // if (!payload.err) { EventBus.$emit('log', payload) }
    }
  ]
}
