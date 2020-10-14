<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Calendar
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <div class="d-flex">
            <b-button variant="primary" data-toggle="modal" v-b-modal="'modal-event'">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add event
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <!-- Content here -->
    <div class="card">
      <div class="card-body">
        <div id="calendar-main" class="card-calendar"></div>
      </div>
    </div>
    <!-- Modal -->
    <b-modal centered modal-class="modal-blur" id="modal-event" tabindex="-1" role="dialog" aria-hidden="true">
      <template v-slot:modal-title>
        Modal title
      </template>
      <template v-slot:default>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit tempora totam unde.
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="white" class="mr-auto" @click="close()">Close</b-button>
        <b-button variant="primary" @click="close()">Save changes</b-button>
      </template>

    </b-modal>

  </q-page>
</template>

<script>
import Vue from 'vue'
import { BButton, BModal, VBModal } from 'bootstrap-vue'
Vue.directive('b-modal', VBModal)

import * as Debug from 'debug'
const debug = Debug('pages:Calendar')
debug.log = console.log.bind(console) // don't forget to bind to console!

import { Calendar } from '@fullcalendar/core'
import dayGrid from '@fullcalendar/daygrid'
import interaction from '@fullcalendar/interaction'

export default {
  name: 'PageEmpty',
  components: { BButton, BModal },

  mounted: function () {
    // debug('mounted')
    this.createCalendar()
  },
  methods: {
    createCalendar: function () {
      debug('createCalendar')
      let calendarEl = document.getElementById('calendar-main')
      let today = new Date(),
        y = today.getFullYear(),
        m = today.getMonth(),
        d = today.getDate()

      let calendar = new Calendar(calendarEl, {
        plugins: [ interaction, dayGrid ],
        themeSystem: 'standard',
        header: {
          left: 'title',
          center: '',
          right: 'prev,next'
        },
        selectable: true,
        selectHelper: true,
        nowIndicator: true,
        views: {
          dayGridMonth: { buttonText: 'month' },
          timeGridWeek: { buttonText: 'week' },
          timeGridDay: { buttonText: 'day' }
        },
        defaultView: 'dayGridMonth',
        timeFormat: 'H(:mm)',
        events: [
          {
            title: 'All Day Event',
            start: new Date(y, m, 1),
            className: 'bg-blue-lt'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, 7, 6, 0),
            allDay: false,
            className: 'bg-blue-lt'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, 14, 6, 0),
            allDay: false,
            className: 'bg-lime-lt'
          },
          {
            title: 'Meeting',
            start: new Date(y, m, 4, 10, 30),
            allDay: false,
            className: 'bg-green-lt'
          },
          {
            title: 'Lunch',
            start: new Date(y, m, 5, 12, 0),
            end: new Date(y, m, 5, 14, 0),
            allDay: false,
            className: 'bg-red-lt'
          },
          {
            title: 'LBD Launch',
            start: new Date(y, m, 19, 12, 0),
            allDay: true,
            className: 'bg-azure-lt'
          },
          {
            title: 'Birthday Party',
            start: new Date(y, m, 16, 19, 0),
            end: new Date(y, m, 16, 22, 30),
            allDay: false,
            className: 'bg-orange-lt'
          }
        ]
      })

      calendar.render()
    }
  }
}
</script>
