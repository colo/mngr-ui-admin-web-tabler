<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">{{id}}</div>
        </div>
        <div :id="id">

        </div>
      </div>
    </div>
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

export default {
  name: 'AppLogsTerminal',

  props: {
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
  },

  data () {
    return {
      terminals: undefined,
      searchXterms: undefined,

    }
  },

  mounted: function () {
    debug('lifecycle mounted', this._uid)

    this.terminal = new Terminal()
    this.terminal.loadAddon(new WebLinksAddon())
    const fitAddon = new FitAddon()
    this.terminal.loadAddon(fitAddon)
    this.searchXterm = new SearchAddon()
    this.terminal.loadAddon(this.searchXterm)
    this.terminal.open(document.getElementById(this.id))
    fitAddon.fit()

    // terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    // terminal.write('http://localhost:8083')
  },
  watch: {
    logs: {
      handler: function (val) {
        debug('watch logs', val)

        Array.each(val, function (row) {
          this.terminal.writeln(row)
        }.bind(this))
      },
      deep: true
    },

  },

}
</script>
