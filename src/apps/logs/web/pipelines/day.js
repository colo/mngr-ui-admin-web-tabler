'use strict'

import { EventBus } from '@libs/eventbus'

import InputIO from './input/io'

import * as Debug from 'debug'
const debug = Debug('apps:logs:web:pipelines:day')
debug.log = console.log.bind(console) // don't forget to bind to console!

let qs = require('qs')

let buffer = []
let buffer_expire = 0
let expire_buffer_timeout = 1000 // one second

import IO from '@etc/logs.web.io'

let ios = []
Array.each(IO(), function (io, index) {
  ios.push({
    id: 'input.logs.web.day' + index,
    module: InputIO,
    index: index
  },)
})

export default {
  input: [
    {
      poll: {
        suspended: false,
        id: 'input.logs.web.day',
        conn: ios,
        // conn: [
        //
        //   Object.merge(
        //     // Object.clone(DefaultConn),
        //     {
        //       id: 'input.logs.web.day',
        //       module: InputIO
        //
        //     }
        //   )
        //
        // ],
        connect_retry_count: -1,
        connect_retry_day: 1000,
        requests: {
          day: 60000
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
    },
    // function (doc, opts, next, pipeline) {
    //   debug('MERGE %o %o', doc, buffer, pipeline.get_input_by_id('input.logs.web.day').conn_pollers)
    //
    //   let timeout
    //
    //   let _merge = function () {
    //     debug('TO MERGE %o', buffer)
    //     let merged_doc = {id: undefined, data: undefined, metadata: {}}
    //     Array.each(buffer, function (_doc) {
    //       merged_doc.id = _doc.id
    //
    //       merged_doc.data = _deep_merge(_doc.data, merged_doc.data)
    //       // if (Array.isArray(_doc.data)) {
    //       //   merged_doc.data = []
    //       //   merged_doc.data.combine(_doc.data)
    //       // } else {
    //       //   merged_doc.data = {}
    //       //   merged_doc.data = Object.merge(merged_doc.data, _doc.data)
    //       // }
    //
    //       merged_doc.metadata = Object.merge(merged_doc.metadata, _doc.metadata)
    //     })
    //     buffer = []
    //     // buffer_expire = Date.now() + expire_buffer_timeout
    //     clearTimeout(timeout)
    //     next(merged_doc, opts, next, pipeline)
    //   }
    //
    //   let _deep_merge = function (val1, val2) {
    //     if (val2 === undefined) { return val1 }
    //
    //     if (Array.isArray(val1)) {
    //       if (!Array.isArray(val2)) {
    //         val2 = [val2]
    //       }
    //
    //       return val1.combine(val2)
    //     } else {
    //       Object.each(val1, function (data, prop) {
    //         if (val2[prop]) {
    //           val1[prop] = _deep_merge(data, val2[prop])
    //         }
    //       })
    //     }
    //
    //     return val1
    //   }
    //
    //   // if (buffer.length === 0) { buffer_expire = Date.now() + expire_buffer_timeout } // start counting expire time on first doc
    //
    //   if (buffer.length === pipeline.get_input_by_id('input.logs.web.day').conn_pollers) { // || buffer_expire < Date.now()
    //     _merge()
    //   } else {
    //     buffer.push(doc)
    //     if (buffer.length === 1) { timeout = setTimeout(_merge, expire_buffer_timeout) }
    //   }
    // }
  ],
  output: [
    // function (payload) {
    //   debug('OUTPUT', payload)
    //
    //   if (!payload.err) { EventBus.$emit('input.logs.web.day.' + payload.metadata.input, payload) }
    //
    //   // if (!payload.err) { EventBus.$emit('log', payload) }
    // }
    function (payload) {
      // if (!payload.err && /^input\.hosts\.day\[.*\]$/.test(payload.id)) {
      //   debug('OUTPUT', payload, this)
      //   // payload.id = payload.id.replace('input.logs.web.day[', '').slice(0, -1)
      //   // debug('OUTPUT', payload)
      //   // EventBus.$emit('input.logs.web.day.' + payload.metadata.input, payload)
      //   let event_id = payload.id
      //   payload.id = payload.id.replace('input.logs.web.day[', '').slice(0, -1)
      //   EventBus.$emit(event_id, payload)
      // }

      debug('OUTPUT', payload, this)
      if (!payload.err) {
        Array.each(this.inputs, function (input) {
          let id = (input.options && input.options.id) ? input.options.id : undefined
          if (id !== undefined) {
            debug('OUTPUT ID', payload, id)
            // let _id = id.replace('.', '\\.')
            let _id = id.split('.').join('\\.')
            let id_regexp = new RegExp('^' + _id + '\\[.*\\]$')
            debug('OUTPUT RexExp', id_regexp)
            if (id_regexp.test(payload.id)) {
              let event_id = payload.id
              payload.id = payload.id.replace(id + '[', '').slice(0, -1)
              EventBus.$emit(event_id, payload)
              debug('OUTPUT EMIT', event_id, payload)
            }
          }
        })
      }
    }
  ]
}
