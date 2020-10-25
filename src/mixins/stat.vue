
<script>

import * as Debug from 'debug'
const debug = Debug('mixins:stat')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import PouchDB from 'pouchdb'
// import PouchDBFind from 'pouchdb-find'
// PouchDB.plugin(PouchDBFind)

// import statStore from 'src/store/stat'

import { v4 as uuidv4 } from 'uuid'

export default {

  components: {
  },

  _stat_mixin_defaults: {
    /**
    * set/modified by graph.vue or your own logic
    **/
    // focus: true,
    // visible: true,

    __range_init: false,
    __stat_unwatcher: undefined,
    __buffer_data: [], // array to save individual stats until we fill in with ranges

    root: undefined,
    path: undefined,
    key: undefined,

    // length: undefined,
    stat_data: [],
  },

  props: {
    stat: {
      type: [Object],
      default: () => ({
        range: [],
        length: undefined,
        // interval: 1, // in seconds
        merged: false,
        data: [],
        numeric: true,
        sources: undefined
      })
    },
    /**
    * if you send the complete data set on each update, set this to true,
    * else it appends data to a buffer
    **/
    no_buffer: {
      type: [Boolean],
      default: false
    }
  },

  data () {
    return {
      stat_lastupdate: 0
      // stat_data: []
    }
  },
  // computed: mapState({
  //
  //   // to access local state with `this`, a normal function must be used
  //   sources (state) {
  //     let data = []
  //     if(!Array.isArray(this.stat.sources))
  //       this.stat.sources = [this.stat.sources]
  //
  //     Array.each(this.stat.sources, function(source, index){
  //       let {type, path} = source
  //       //console.log('this.stat.data', type, path)
  //       data.push(this.$store.state[type+'_sources'][path])
  //     }.bind(this))
  //     return data
  //   }
  // }),
  watch: {
    'stat.range': {
      handler: function (newVal, oldVal) {
        // if(newVal) {this.$store.registerModule('dashboard_'+newVal, Object.clone(dashboardStore))}
        if (newVal && oldVal && !newVal.every(function (val, index) { return val === oldVal[index] })) {
          debug('new range', newVal, oldVal)
          this.__change_range(newVal)
        }
      }
      // deep: true
    }
  },
  created () {
    debug('create', this.id)
    if (!this.$options['charts'][this.id]) {
      this.$options['charts'][this.id] = {}
    }

    this.$options['charts'][this.id] = Object.merge(this.$options['charts'][this.id], Object.clone(this.$options._stat_mixin_defaults))

    // this.$options['charts'][this.id].__buffer_data = []
    // this.$options['charts'][this.id].stat_data = []

    // const DATA_LENGTH = (this.stat && this.stat.data) ? this.stat.data.length : 0
    let range_length = (this.stat.range && this.stat.range[1] && this.stat.range[0]) ? (this.stat.range[1] - this.stat.range[0]) / 1000 : undefined
    if (range_length === undefined || range_length <= 1) { this.$options['charts'][this.id].__range_init = true }

    this.stat.length = this.stat.length || range_length
    // this.$options['charts'][this.id].length = this.stat.length || range_length

    this.$options['charts'][this.id].root = this.id.split('.')[0]
    this.$options['charts'][this.id].path = this.id.split('.')[1]
    // this.$options['charts'][this.id].key = this.id.split('.')[2]
    this.$options['charts'][this.id].key = this.id.substring(this.id.lastIndexOf('.') + 1)

    /// /console.log('stat.vue id', this.id, this.$options['charts'][this.id].type)
    /**
    * @test - no local data
    **/
    //   if (!this.$store.state[this.$options['charts'][this.id].type][this.id]) {
    //     this.$store.registerModule([this.$options['charts'][this.id].type, this.id], Object.clone(statStore))
    //     this.$store.commit(this.$options['charts'][this.id].type + '/' + this.id + '/id', this.id)
    //     this.$store.commit(this.$options['charts'][this.id].type + '/' + this.id + '/type', this.$options['charts'][this.id].type)
    //     /** new PouchDB(
    //   this.$options['charts'][this.id].type+'_'+this.$options['charts'][this.id].root+'_'+this.$options['charts'][this.id].path+'_'+this.$options['charts'][this.id].key,
    //   {adapter: 'memory'}
    // )**/
    //     let db = new PouchDB(
    //       // this.$options['charts'][this.id].type+'_'+this.$options['charts'][this.id].path+'_'+this.$options['charts'][this.id].key
    //       this.$options['charts'][this.id].type + '_' + this.$options['charts'][this.id].root + '_' + this.$options['charts'][this.id].path + '_' + this.$options['charts'][this.id].key
    //     )
    //     db.createIndex({
    //       'index': {
    //         // "fields": ['metadata.host', 'metadata.timestamp'],
    //         'fields': ['metadata.timestamp'],
    //         'ddoc': 'mango_search',
    //         'name': 'timestamp'
    //       }
    //     }).then(function (result) {
    //       // console.log('creating index', result)
    //     })
    //
    //     this.$store.commit(this.$options['charts'][this.id].type + '/' + this.id + '/db', db)
    //   }
    /**
    * @test - no local data
    **/

    debug('stat.vue data', this.id, this.stat.data, this.stat.range, this.stat.length)

    if (this.stat.range && this.stat.length > 1) {
      /**
      * @test - no local data
      **/
      let docs = []
      let new_docs_range = this.__get_new_range(docs, JSON.parse(JSON.stringify(this.stat.range)))
      docs = new_docs_range.docs
      let range = new_docs_range.range

      if (docs.length > 0) {
        // ////console.log('stats/get', docs, range)

        let stats = []
        Array.each(docs, function (doc) {
          if (doc && doc.data) {
            let stat = {
              timestamp: doc.metadata.timestamp,
              value: doc.data
            }
            stats.push(stat)
          }
        })

        /// ///////console.log('stats/get 2', stats)
        this.__set_stat_data(stats)
      }

      if (range.length > 0 && range[0] && range[1]) {
        this.__change_range(range)
      }

      /**
      * @test - no local data
      **/
    }

    if (this.stat && this.stat.data && this.stat.merged === true) {
      // this.$options['charts'][this.id].deque = new Deque(this.stat.data.length * 1)
      //
      // //////////console.log('stat.vue id', this.id, this.$options['charts'][this.id].type, this.stat.range, this.$options['charts'][this.id].deque, this.$options['charts'][this.id].deque.length, QUEUE_SIZE)
      // if(this.stat.data && this.stat.data[0]){
      this.$options['charts'][this.id].__stat_unwatcher = this.$watch('stat.data', this.update_stat_merged_data.bind(this), { deep: true })
      this.update_stat_merged_data(this.stat.data)
      // }
    } else if (this.stat && this.stat.data) {
      this.$options['charts'][this.id].__stat_unwatcher = this.$watch('stat.data', this.update_stat_data.bind(this)) // { deep: true }
      this.update_stat_data(this.stat.data)
    }
  },
  beforeDestroy () {
    /**
    * @test - no local data
    **/
    // this.$store.dispatch(this.$options['charts'][this.id].type+'/'+this.id+'/flush')
  },
  destroyed () {
    if (this.$options['charts'][this.id]) {
      this.$options['charts'][this.id] = Object.merge(this.$options['charts'][this.id], Object.clone(this.$options._stat_mixin_defaults))
    }

    this.$off()
  },
  methods: {
    update_stat_merged_data: function (stats, old) {
      const DATA_LENGTH = stats.length

      /**
        * if you don't clone it , you may be manipulating other stats using this sames stats
        **/
      stats = Array.clone(stats)// now we are safe to modify
      let val = (stats) ? stats[0] : undefined
      /// ///////console.log('stat.data.0', val)

      if (val && val.length > 0) {
        if (!Array.isArray(val[0])) { // array of array, range data
          val = [val]
        }

        let columns = []
        for (let i = 1; i < DATA_LENGTH; i++) { // ommit timestamp
          columns.push(stats[i])
        }

        // //console.log('MERGED COLUMNS', columns)

        if (columns.length > 0) {
          let matched_columns = false
          Array.each(val, function (row, index) {
            Array.each(columns, function (column, col_index) {
              // //console.log('COLUMN',column)
              if (column) {
                if (Array.isArray(column[0])) { // array of array, range data
                  val[index] = this._merge_tabular_data(val[index], column[index])// match columns/rows
                } else {
                  val[index] = this._merge_tabular_data(val[index], column)// fill always with same val
                }
                matched_columns = true
              }
            }.bind(this))
          }.bind(this))

          /// ///////console.log('__stat_unwatcher merged ', val)

          if (matched_columns === true) {
            if (stats.length === 1) {
              this.__add_stats(val[val.length - 1])
            } else {
              this.__add_stats(val)
            }
          }
        }
      }
    },
    update_stat_data: function (val, old) {
      if (val !== undefined) {
        // console.log('__stat_unwatcher', this.id, val, this.stat.length)
        try {
          val = JSON.parse(JSON.stringify(val))
          debug('update_stat_data %s', this.id, val)
          /**
          * when use "stat.sources" as data, is always an array, even if it's not merged data
          * so we need to pick the only element (if there are more, is an error)
          */

          if (Array.isArray(val) && val.length > 1) { val = val[0] }

          // this.__stat_data_watcher(val)
          if (val && val.length > 0) {
            // let __cloned = val // Array.clone(val)
            if (val.length === 1) {
              this.__add_stats(val[val.length - 1])
            } else {
              this.__add_stats(val)
            }
          }
        } catch (e) {}
      }
    },
    /**
    * based on docs (obtained from local DB) and range, defined if we can update stat with this
    * plus a shorter remote range, or we need to clear and obtain all new data from remote
    */
    __change_range (range) {
      this.$options['charts'][this.id].__range_init = false

      debug('adding event', 'dashboard_' + this.dashboard + '/events/add', this.id)

      this.$store.commit('dashboard_' + this.dashboard + '/events/add', {
        id: this.id,
        type: 'onRange',
        'opts': {
          range: range
          // tabular: (this.$options['charts'][this.id].type === 'tabular') ? true : false
        }
      })
    },
    __get_new_range: function (docs, range) {
      // //////console.log('__get_new_range', docs, Array.clone(range))

      if (
        docs.length > 0 &&
        docs[docs.length - 1] &&
        docs[docs.length - 1].metadata &&
        docs[0].metadata.timestamp > range[0] - 10000 &&
        docs[0].metadata.timestamp < range[0] + 10000
      ) {
        /// ///console.log('__get_new_range', docs, Array.clone(range))

        let prev
        let missing = false

        docs.sort(function (a, b) { return (a.metadata.timestamp > b.metadata.timestamp) ? 1 : ((b.metadata.timestamp > a.metadata.timestamp) ? -1 : 0) })

        Array.each(docs, function (doc) {
          if (prev && doc.metadata.timestamp - 5000 > prev.metadata.timestamp) {
            missing = true
          }
          prev = doc
        })

        if (missing === false) {
          range[0] = docs[docs.length - 1].metadata.timestamp
        } else {
          docs = []
        }
      } else {
        docs = []
      }

      return { docs: docs, range: range }
    },
    // __stat_data_watcher: function(val){
    //   if(val && val.length > 0 && !this.$store.state[this.$options['charts'][this.id].type][this.id]){
    //     //////////console.log('registerModule stat', this.$options['charts'][this.id].type, this.id)
    //     this.$store.registerModule([this.$options['charts'][this.id].type, this.id], Object.clone(statStore))
    //     this.$store.commit(this.$options['charts'][this.id].type+'/'+this.id+'/set_id', this.id)
    //     this.$store.commit(this.$options['charts'][this.id].type+'/'+this.id+'/set_type', this.$options['charts'][this.id].type)
    //   }
    //   else if(val && val.length > 0){
    //     this.__add_stats(val)
    //   }
    // },
    _merge_tabular_data: function (a, b) {
      let merged = Array.clone(a)
      if (!b) {
        merged.push(undefined)
      } else {
        for (let i = 1; i < b.length; i++) { // ommit timestamp
          merged.push(b[i])
        }
      }
      return merged
    },
    __add_stats: function (stat) {
      debug('__add_stats', this.id, stat, this.$options['charts'])
      // console.log('stat.vue __add_stats', this.id, stat)

      let data = {}
      if (this.$options['charts'][this.id].type === 'tabular') {
        if (Array.isArray(stat[0])) { // array of array, range data
          let result = []
          Array.each(stat, function (value) {
            result.push({
              timestamp: value[0],
              value: value
            })
          })

          // result.sort(function(a,b) {return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0);} )

          /// /////////////////console.log('process_os_tabular', path, key, result)
          data = {
            tabular: true,
            root: this.$options['charts'][this.id].root,
            path: this.$options['charts'][this.id].path,
            key: this.$options['charts'][this.id].key,
            data: result
          }
        } else {
          data = {
            tabular: true,
            root: this.$options['charts'][this.id].root,
            path: this.$options['charts'][this.id].path,
            key: this.$options['charts'][this.id].key,
            data: {
              // timestamp: stat[0],
              timestamp: new Date(),
              value: stat
            }
          }
        }
      } else {
        data = {
          tabular: false,
          root: this.$options['charts'][this.id].root,
          path: this.$options['charts'][this.id].path,
          key: this.$options['charts'][this.id].key,
          data: stat
        }
      }

      // Object.each(paths, function(keys, path){
      /// ///////////console.log('__add_os_doc_stats PATH', path)

      // Object.each(keys, function(data, key){
      /// ///////////console.log('__add_os_doc_stats KEY', key, data)

      /**
      * @test - no local data
      */
      // this.$store.dispatch(this.$options['charts'][this.id].type+'/'+this.id+'/add', data)

      this.__set_stat_data(data.data)
      // this.$options['charts'][this.id].stat_data.push( data.data )
      // this.stat_lastupdate = Date.now()
      //
      // let splice = this.stat.length * 1
      //
      // let length = this.$options['charts'][this.id].stat_data.length
      //
      // // splice = (splice === 1) ? 2 : splice
      //
      // // if(splice === 0){
      // //   this.$set(this.stats[name], 'data', [])
      // // }
      // // else{
      //   this.$options['charts'][this.id].stat_data.splice(
      //     (splice * -1) -1,
      //     length - splice
      //   )
      // // }
      //
      //
      // // //////////console.log('stat.vue __add_stats', this.id, data.data, this.$options['charts'][this.id].stat_data.length, splice, length)
      //

      //   }.bind(this))
      //
      // }.bind(this))
    },
    __set_stat_data: function (data) {
      debug('__set_stat_data %s %o', this.id, data)
      // console.log('stat.vue __set_stat_data', this.id, data)
      /**
      * @config: this should be config options
      * this.$options['charts'][this.id].focus
      * this.$options['charts'][this.id].visible
      */
      // if(this.$options['charts'][this.id].focus === true && this.$options['charts'][this.id].visible === true && data){
      //   //////console.log('__set_stat_data visibility', this.id, this.$options['charts'][this.id].focus, this.$options['charts'][this.id].visible)

      // docs.sort(function(a,b) {return (a.metadata.timestamp > b.metadata.timestamp) ? 1 : ((b.metadata.timestamp > a.metadata.timestamp) ? -1 : 0);} )
      // let __stat_data = Array.clone(this.$options['charts'][this.id].stat_data)
      //
      // if(!Array.isArray(data) && this.$options['charts'][this.id].__range_init === true){
      //   __stat_data.push(Object.clone(data))
      // }
      // else{
      //   __stat_data = __stat_data.append(Array.clone(data))
      //   this.$options['charts'][this.id].__range_init = true
      // }
      //
      // __stat_data.sort(function(a,b) {
      //   return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0);
      // })
      // let splice = this.stat.length
      // let length = __stat_data.length
      //
      // __stat_data.splice(
      //   (splice * -1) -1,
      //   length - splice
      // )
      //
      // this.$set(this, 'stat_data', __stat_data)

      if (this.no_buffer === false) {
        if (!Array.isArray(data)) data = [data]

        this.$options['charts'][this.id].__range_init = true

        this.$options['charts'][this.id].__buffer_data = this.$options['charts'][this.id].__buffer_data.append(JSON.parse(JSON.stringify(data)))

        debug('no_buffer === false', this.$options['charts'][this.id].__buffer_data, this.$options['charts'][this.id].stat_data)

        // Array.each(Array.clone(this.$options['charts'][this.id].__buffer_data), function (val) {
        Array.each(this.$options['charts'][this.id].__buffer_data, function (val) {
          let found = false
          Array.each(this.$options['charts'][this.id].stat_data, function (stat) {
            if (stat.timestamp === val.timestamp) { found = true }
          })

          if (found === false) { this.$options['charts'][this.id].stat_data.push(val) }
        }.bind(this))

        // this.$options['charts'][this.id].stat_data.sort(function (a, b) {
        //   return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0)
        // })

        this.$options['charts'][this.id].__buffer_data = []
        // }
      } else { // no_buffer
        this.$options['charts'][this.id].stat_data = data
        this.$options['charts'][this.id].__range_init = true
      }

      // if (this.$options['charts'][this.id].__buffer_data.length > 10) { this.$options['charts'][this.id].__range_init = true }
      debug('__set_stat_data2', this.id, this.$options['charts'][this.id].stat_data)

      if (this.$options['charts'][this.id].__range_init === true) {
        // if you are not using buffer, you are managing your data, you are in charge of sorting
        if (this.no_buffer === false) {
          this.$options['charts'][this.id].stat_data.sort(function (a, b) {
            return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0)
          })

          debug('__set_stat_data3', this.id, JSON.parse(JSON.stringify(this.$options['charts'][this.id].stat_data))) //

          // let length = this.$options['charts'][this.id].stat_data.length
          let slice = (!this.config.interval || this.config.interval === undefined) ? this.stat.length : this.stat.length * this.config.interval

          this.$options['charts'][this.id].stat_data = this.$options['charts'][this.id].stat_data.slice(0, slice)

          debug('__set_stat_data4', this.id, JSON.parse(JSON.stringify(this.$options['charts'][this.id].stat_data)), slice) //

          this.$options['charts'][this.id].stat_data.sort(function (a, b) {
            return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0)
          })
        }

        this.stat_lastupdate = Date.now()

        this.__update_data(this.$options['charts'][this.id].stat_data)
      }
      // ////console.log('stat.vue/splice', splice, length, this.$options['charts'][this.id].stat_data)

      // }
      // //console.log('__set_stat_data', data, this.$options['charts'][this.id].__range_init)
    }

  }
}
</script>
