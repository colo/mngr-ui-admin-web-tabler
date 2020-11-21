<script>

import * as Debug from 'debug'
const debug = Debug('mixins:dashboard')
debug.log = console.log.bind(console) // don't forget to bind to console!

import {roundMilliseconds, roundSeconds, roundMinutes, roundHours} from '@libs/time/round'
import {SECOND, MINUTE, HOUR, DAY, WEEK, MONTH} from '@libs/time/const'

export default {

  components: {
  },

  props: {
    // type: {
    //   period: String,
    //   default: 'minute'
    // },
    // dark: {
    //   type: Boolean,
    //   default: false,
    // },
    // fluid: {
    //   type: Boolean,
    //   default: false,
    // },
    // mode: {
    //   type: String,
    //   default: '',
    // },
  },

  data () {
    return {

      current_time: undefined,

    }
  },
  methods: {
    round: function (timestamp) {
      if (this.period === 'second' || this.period === 'periodical') {
        return roundMilliseconds(timestamp)
      } else if (this.period === 'minute') {
        return roundSeconds(timestamp)
      } else if (this.period === 'hour') {
        return roundMinutes(timestamp)
      } else {
        return roundHours(timestamp)
      }
    },
    start: function () {
      // if (vm.period === 'minute') {
      //   START = (END - (5 * MINUTE) >= 0) ? END - (5 * MINUTE) : 0
      // } else if (vm.period === 'hour') {
      //   START = (END - (2 * HOUR) >= 0) ? END - (2 * HOUR) : 0
      // } else {
      //   START = (END - DAY >= 0) ? END - DAY : 0
      // }
      if (this.period === 'second' || this.period === 'periodical') {
        return (this.end() - SECOND >= 0) ? this.end() - SECOND : 0
      } else if (this.period === 'minute') {
        return (this.end() - MINUTE >= 0) ? this.end() - MINUTE : 0
      } else if (this.period === 'hour') {
        return (this.end() - HOUR >= 0) ? this.end() - HOUR : 0
      } else {
        return (this.end() - DAY >= 0) ? this.end() - DAY : 0
      }
    },
    end: function () {
      if (this.current_time === undefined) {
        // return Date.now()
        if (this.period === 'second' || this.period === 'periodical') {
          // return Date.now() - SECOND
          return roundMilliseconds(Date.now())
        } else if (this.period === 'minute') {
          // return Date.now() - (2 * MINUTE)
          return roundSeconds(Date.now())
        } else if (this.period === 'hour') {
          // return Date.now() - HOUR
          return roundMinutes(Date.now())
        } else {
          // return Date.now() - DAY
          return roundHours(Date.now())
        }
      } else {
        return this.current_time
      }
    },

  }
}
</script>
