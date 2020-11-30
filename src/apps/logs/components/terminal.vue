<template>
  <div :class="containerClass">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">{{id}}</div>
        </div>
        <div :id="id">
        </div>
      </div>
    </div>
    <q-resize-observer @resize="resize(id)" :debounce="0"/>
  </div>
</template>

<script>

import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { SearchAddon } from 'xterm-addon-search'

import * as Debug from 'debug'
const debug = Debug('apps:logs:components:terminal')
debug.log = console.log.bind(console) // don't forget to bind to console!

const Parser = require('@robojones/nginx-log-parser').Parser

import moment from 'moment'

export default {
  name: 'AppLogsTerminal',

  props: {
    coloured: {
      type: Boolean,
      default: true,
    },
    layout: {
      type: String,
      default: 'row' // grid || row
    },
    groupBy: {
      type: Array,
      default: function () { return [] }
    },
    id: {
      type: String,
      default: 'terminal'
    },
    logs: {
      type: Array,
      default: function () { return [] }
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
    rows: {
      type: Number,
      default: 24,
    },
  },

  data () {
    return {
      terminal: undefined,
      searchAddon: undefined,
      fitAddon: undefined,

      // coloured: true,
      // resizing: false,

      web_log_parser: new Parser(
        '$remote_addr - $remote_user [$time_local] ' +
        '"$request" $status $body_bytes_sent "$http_referer" ' +
        '"$http_user_agent" "$http_x_forwarded_for"'
      )
    }
  },
  computed: {
    containerClass: function () {
      return (this.layout === 'grid') ? 'col-lg-12 col-xl-6' : 'col-xl-12'
    },
  },
  mounted: function () {
    debug('lifecycle mounted', this._uid)
    window.addEventListener('resize', this.resize)
    this.create_terminal()
  },
  destroyed: function () {
    window.removeEventListener('resize', this.resize)
    this.terminal.dispose()
  },
  watch: {
    rows: {
      handler: function (val) {
        debug('watch rows', val)

        if (val) {
          this.terminal.resize(this.terminal.cols, val)
        }
      },
      inmediate: true
    },
    layout: function () {
      debug('watch layout', this._uid)
      this.resize(this.id)
    },
    logs: {
      handler: function (val) {
        debug('watch logs', val, this.terminal.cols, this.terminal.rows)
        // if (this.resizing === false) {

        Array.each(val, function (row) {
          let date = moment(row.timestamp).format('HH:mm:ss')
          let log = ''
          if (this.coloured === true) {
            log = this.colour(row)
          } else {
            log = row.log
          }
          let path = row.path.replace('logs.', '')
          let host = row.host
          let domain = row.domain

          let line = '\x1B[1;3;1m\x1B[1;3;42m'// bold + light green bg

          if (!this.groupBy.contains('host')) {
            line += host + ' - '
          }

          if (!this.groupBy.contains('path')) {
            line += path + ' - '
          }

          if (!this.groupBy.contains('domain')) {
            line += domain + ' - '
          }

          line += date + '\x1B[0m : ' + log

          this.terminal.writeln(line)
        }.bind(this))
        // }
      },
      deep: true
    },

  },
  methods: {
    create_terminal: function () {
      this.terminal = new Terminal()
      this.terminal.setOption('fontSize', 14)
      this.terminal.setOption('scrollback', 1000000)
      this.terminal.setOption('disableStdin', true)
      this.terminal.setOption('convertEol', true)

      this.terminal.loadAddon(new WebLinksAddon())
      this.fitAddon = new FitAddon()
      this.terminal.loadAddon(this.fitAddon)
      this.searchAddon = new SearchAddon()
      this.terminal.loadAddon(this.searchAddon)
      this.terminal.open(document.getElementById(this.id))
      this.fitAddon.fit()
      this.terminal.resize(this.terminal.cols, this.rows)
    },
    resize: function (e) {
      // this.terminal.dispose()
      // this.create_terminal()
      if (this.fitAddon !== undefined) {
        this.$nextTick(function () {
          debug('resize', this.id, this.fitAddon.proposeDimensions(), e)
          // this.resizing = true
          this.fitAddon.fit()

          this.$nextTick(function () {
            // this.resizing = false
          })
        })
      }
    },
    // onResize: function (id) {
    //   debug('onResize', id)
    //   if (this.fitAddon !== undefined) { this.fitAddon.fit() }
    // },
    colour: function (row) {
      let path = row.path
      let fn = this.camelCase(path)
      // debug('colour fn', fn)
      let log = row.log
      if (typeof this[fn] === 'function') {
        log = this[fn](row)
      }
      return log
    },
    logsEducativa: function (row) {
      // debug('qmailSend', row)
      let log = row.log
      let educativa = log.split('|')

      log = ''
      Array.each(educativa, function (str, index) {
        if (index === 0) {
          log += '\x1B[1;3;1m\x1B[36m' + str + '\x1B[0m' // bold cyan
        } else if (index === 3) {
          log += '\x1B[38;5;167m' + str + '\x1B[0m'// orange
        } else if (index === 4) {
          log += '\x1B[38;5;207m' + str + '\x1B[0m'// purple
        } else if (index === 6) {
          log += '\x1B[1;3;32m' + str + '\x1B[0m'// green
        } else {
          log += str
        }

        // else if (index === 5) {
        //   log += '\x1B[38;5;207m' + str + '\x1B[0m'// purple
        // }

        if (index < educativa.length - 1) { log += '|' }
      })
      debug('logsEducativa', educativa)

      return log
    },
    logsQmailSend: function (row) {
      // debug('qmailSend', row)
      let log = row.log
      if (row.domain === 'delivery.status') {
        let status = log.split(' ')
        log = ''
        Array.each(status, function (str, index) {
          if (index === 2) {
            log += '\x1B[38;5;167m' + str + '\x1B[0m' // orange
          } else if (index === 3 && str === 'success:') {
            log += '\x1B[1;3;32m' + str// green
          } else if (index === 3) {
            log += '\x1B[1;3;31m' + str// red
          } else if (index === 4) {
            log += str + '\x1B[0m'// close
          } else {
            log += str
          }

          if (index < status.length - 1) { log += ' ' }
        })
        debug('qmailSend delivery.status', status)
      } else if (row.domain === 'delivery.starting') {
        let starting = log.split(' ')
        // let status = log.split(':')
        log = ''
        Array.each(starting, function (str, index) {
          if (index === 8) {
            log += '\x1B[1;3;34m' + str + '\x1B[0m'// blue
          } else if (index === 3) {
            log += '\x1B[38;5;167m' + str + '\x1B[0m'// orange
          } else if (index === 5) {
            log += '\x1B[38;5;207m' + str + '\x1B[0m'// purple
          } else {
            log += str
          }

          if (index < starting.length - 1) { log += ' ' }
        })
        debug('qmailSend delivery.starting', starting)
      } else if (row.domain === 'msg.info') {
        let info = log.split(' ')
        log = ''
        Array.each(info, function (str, index) {
          if (index === 7) {
            log += '\x1B[1;3;34m' + str + '\x1B[0m'// blue
          } else if (index === 5) {
            log += '\x1B[1;3;41m' + str + '\x1B[0m'// red bg
          } else if (index === 3) {
            log += '\x1B[38;5;207m' + str + '\x1B[0m'// purple
          } else {
            log += str
          }

          if (index < info.length - 1) { log += ' ' }
        })
        debug('qmailSend msg.info', info)
      }
      return log
    },
    logsNginx: function (row) {
      let log = row.log
      let parsed = this.web_log_parser.parseLine(log)
      debug('logsNginx fn', parsed)

      parsed.remote_addr = '\x1B[1;3;92m' + parsed.remote_addr + '\x1B[0m' // light green
      // parsed.time_local = '\x1B[1;3;42m' + parsed.time_local + '\x1B[0m' // green bg

      parsed.request = '\x1B[1;3;1m\x1B[36m' + parsed.request + '\x1B[0m' // bold cyan

      parsed.http_referer = '\x1B[1;3;34m' + parsed.http_referer + '\x1B[0m' // blue
      parsed.status *= 1
      if (parsed.status < 300) {
        parsed.status = '\x1B[1;3;32m' + parsed.status + '\x1B[0m' // green
      } else if (parsed.status < 400) {
        parsed.status = '\x1B[1;3;33m' + parsed.status + '\x1B[0m' // yellow
      } else {
        parsed.status = '\x1B[1;3;31m' + parsed.status + '\x1B[0m' // red
      }

      parsed.body_bytes_sent = '\x1B[1;3;41m' + parsed.body_bytes_sent + '\x1B[0m' // red bg

      let str = parsed.remote_addr + ' - ' + parsed.remote_user + ' [' + parsed.time_local + '] ' +
      '"' + parsed.request + '" ' + parsed.status + ' ' + parsed.body_bytes_sent + ' "' + parsed.http_referer + '" ' +
      '"' + parsed.http_user_agent + '" "' + parsed.http_x_forwarded_for + '"'

      return str
    },
    camelCase: function (str) {
      str = str
        .toLowerCase()
        .split('.')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')

      return str.charAt(0).toLowerCase() + str.slice(1)
    }
  }

}
</script>
