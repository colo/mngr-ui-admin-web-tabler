<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Hosts</h3>
    </div>
    <div class="card-body border-bottom py-3">
      <div class="d-flex">
        <div class="text-muted">
          Show
          <div class="mx-2 d-inline-block">
            <input type="text" class="form-control form-control-sm" v-model="perPage" size="3">
          </div>
          entries
        </div>
        <div class="ml-auto text-muted">
          Search:
          <div class="ml-2 d-inline-block">
            <!-- <input type="text" class="form-control form-control-sm"> -->
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <!-- <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append> -->
            </b-input-group>
          </div>
        </div>
      </div>
    </div>
    <b-table
      :items="hosts"
      :fields="fields_avatar_hidden"
      responsive
      table-class="table-vcenter table-mobile-md card-table"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      show-empty
    >
      <!-- <template v-slot:thead-top="data">
        <b-tr>
          <b-th class="w-1"><input class="form-check-input m-0 align-middle" type="checkbox"></b-th>
          <b-th class="w-1">HOSTNAME</b-th>
          <b-th>TITLE</b-th>
          <b-th>ROLE</b-th>
          <b-th></b-th>
        </b-tr>
      </template> -->
      <!-- A custom formatted column -->
      <!-- <template v-slot:cell(input)="data">
        <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice">
      </template> -->

      <template v-slot:cell(person)="data">
        <div class="d-flex py-1 align-items-center">
          <span class="avatar mr-2" :style="(data.value.avatar !== '') ? { 'background-image': 'url('+data.value.avatar+')' } : {}">
            <template v-if="data.value.avatar === ''">
              SA
            </template>
          </span>
          <div class="flex-fill">
            <div class="font-weight-medium">{{data.value.name}}</div>
            <div class="text-muted"><a href="#" class="text-reset">{{data.value.email}}</a></div>
          </div>
        </div>
      </template>

      <template v-slot:cell(title)="data">
        <div>{{data.value.head}}</div>
        <div class="text-muted">{{data.value.sub}}</div>
      </template>

      <template v-slot:cell(edit)="data">
        <div class="btn-list flex-nowrap">
          <b-dropdown variant="white" text="Actions" right>
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
          </b-dropdown>

        </div>
      </template>
    </b-table>

    <!-- <b-table-simple
      responsive
      table-class="table-vcenter table-mobile-md card-table"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
    >
      <b-thead>
        <b-tr>
          <b-th class="w-1"><input class="form-check-input m-0 align-middle" type="checkbox"></b-th>
          <b-th class="w-1">NAME</b-th>
          <b-th>TITLE</b-th>
          <b-th>ROLE</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in hosts" :key="index">
          <b-th><input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice"></b-th>
        </b-tr>
      </b-tbody>

    </b-table-simple> -->

    <div class="card-footer d-flex align-items-center">
      <p class="m-0 text-muted">Showing <span> {{(perPage * currentPage) - (perPage -1 ) }}</span> to <span>{{ lastItem }}</span> of <span>{{hosts.length}}</span> entries</p>
      <b-pagination
        v-model="currentPage"
        :total-rows="hosts.length"
        :per-page="perPage"
        aria-controls="my-table"
        class="m-0 ml-auto"
        prev-text="prev"
        next-text="next"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import * as Debug from 'debug'
const debug = Debug('apps:hosts:components:table')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { BTable, BButton, BDropdown, BDropdownItem, BInputGroup, BFormInput, BTr, BTh, BPagination } from 'bootstrap-vue'

export default {
  name: 'AppHostsTable',
  // mixins: [DataSourcesMixin],

  components: { BTable, BButton, BDropdown, BDropdownItem, BInputGroup, BFormInput, BTr, BTh, BPagination },

  props: {
    stat: {
      type: Array,
      default: function () { return [] }
    }
  },
  watch: {
    'stat': {
      handler: function (newVal, oldVal) {
        debug('stat.data', oldVal, newVal)
        this.hosts = []
        Array.each(newVal, function (host) {
          this.hosts.push({
            hostname: host.hostname,
            cpus: host.cpus.length,
            totalmem: Math.round(host.totalmem / 1073741824), // GB
            type: host.type,
            release: host.release,
            arch: host.arch
          })
        }.bind(this))
      },
      deep: true,
      immediate: true
    }
  },

  data () {
    return {
      hosts: [
        // { input: null, person: { name: 'Lorry Mion', email: 'lmiona@livejournal.com', avatar: '../static/avatars/006m.jpg'}, title: { head: 'Automation Specialist IV', sub: 'Accounting' }, role: 'Accounting', edit: null},
        // { input: null, person: {name: 'Leesa Beaty', email: 'lbeatyb@alibaba.com', avatar: '../static/avatars/004f.jpg'}, title: { head: 'Editor', sub: 'Services' }, role: 'Admin', edit: null},
        // { input: null, person: {name: 'Perren Keemar', email: 'pkeemarc@yahoo.com', avatar: '../static/avatars/007m.jpg'}, title: { head: 'Analog Circuit Design manager', sub: 'Services' }, role: 'User', edit: null},
        // { input: null, person: { name: 'Sunny Airey', email: 'saireyd@prlog.org', avatar: ''}, title: { head: 'Nuclear Power Engineer', sub: 'Engineering' }, role: 'Owner', edit: null},
        // { input: null, person: { name: 'Geoffry Flaunders', email: 'gflaunderse@loc.gov', avatar: '../static/avatars/009m.jpg' }, title: { head: 'Software Test Engineer II', sub: 'Accounting' }, role: 'Admin', edit: null},

      ],

      /**
      * hide fields headers (to use only 'thead-top' slot)
      * https://stackoverflow.com/questions/49842860/how-to-hide-bootstrap-vue-table-header-row
      **/
      fields_avatar_hidden: [
        // {
        //   key: 'input',
        //   label: '',
        //   headerTitle: 'Select',
        //   sortable: false,
        //   thStyle: {
        //     display: 'none'
        //   }
        // },
        {
          key: 'hostname',
          label: 'hostname',
          sortable: true,
          // thStyle: {
          //   display: 'none'
          // }
        },
        {
          key: 'cpus',
          label: '# cpus',
          tdClass: 'text-muted',
          sortable: true,
          // thStyle: {
          //   display: 'none'
          // }
        },
        {
          key: 'totalmem',
          label: 'Memory (GB)',
          tdClass: 'text-muted',
          sortable: true,
          // thStyle: {
          //   display: 'none'
          // }
        },
        {
          key: 'type',
          tdClass: 'text-muted',
          sortable: true,
          // thStyle: {
          //   display: 'none'
          // }
        },
        {
          key: 'release',
          tdClass: 'text-muted',
          sortable: true,
          // thStyle: {
          //   display: 'none'
          // }
        },
        {
          key: 'arch',
          tdClass: 'text-muted',
          sortable: true,
          // thStyle: {
          //   display: 'none'
          // }
        },
        {
          key: 'role',
          tdClass: 'text-muted',
          sortable: false,
          thStyle: {
            display: 'none'
          }
        },
        {
          key: 'edit',
          class: 'w-1',
          label: '',
          headerTitle: 'Edit',
          sortable: false,
          thStyle: {
            display: 'none'
          }
        },
      ],
      /**
      *
      **/
      perPage: 10,
      currentPage: 1,
      filter: null,
      filterOn: [],
    }
  },
  computed: {
    lastItem: function () {
      return (this.perPage * this.currentPage < this.hosts.length) ? this.perPage * this.currentPage : this.hosts.length
    }
  },
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
