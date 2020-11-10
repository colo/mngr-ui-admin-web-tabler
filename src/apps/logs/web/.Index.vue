<template>
  <q-page>

    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <!-- Page pre-title -->
          <div class="page-pretitle">
            Overview
          </div>
          <h2 class="page-title">
            Hosts: {{ (selected_hosts.length === 0 ) ? 'All' : selected_hosts.join(',')}}
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <!-- <span class="d-none d-sm-inline">
            <a href="#" class="btn btn-white">
              New view
            </a>
          </span> -->
          <!-- <b-button variant="primary" data-toggle="modal" v-b-modal="'modal-report'" class="ml-3 d-none d-sm-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Create new report
          </b-button>
          <a href="#" class="btn btn-primary ml-3 d-sm-none btn-icon" data-toggle="modal" data-target="#modal-report" aria-label="Create new report">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </a> -->
          <!-- {{selected_hosts}} -->
          <b-dropdown
            split
            variant="primary"
            right
          >
            <template v-slot:button-content>
              <svg data-v-2a169e26="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-md"><path data-v-2a169e26="" stroke="none" d="M0 0h24v24H0z"></path><rect data-v-2a169e26="" x="3" y="4" width="18" height="8" rx="3"></rect><rect data-v-2a169e26="" x="3" y="12" width="18" height="8" rx="3"></rect><line data-v-2a169e26="" x1="7" y1="8" x2="7" y2="8.01"></line><line data-v-2a169e26="" x1="7" y1="16" x2="7" y2="16.01"></line></svg>
              Hosts
            </template>

            <b-dropdown-form>
              <b-form-group>
                <b-form-checkbox v-model="allHostsSelected" plain>All</b-form-checkbox>
              </b-form-group>
            </b-dropdown-form>

            <!-- <b-dropdown-item :to="{name: 'hosts', query: { ...$route.query, hosts: ''}}">All</b-dropdown-item> -->
            <b-dropdown-divider />
            <b-dropdown-form>
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selected_hosts"
                name="flavour-1"
                plain
                stacked
              >
                <b-form-checkbox v-for="host in hosts" :value="host" :key="host" @input="setHost">{{host}}</b-form-checkbox>
              </b-form-checkbox-group>
              <!-- <b-form-group>
                <b-form-checkbox plain>Perseus</b-form-checkbox>
                <b-form-checkbox plain>Draco</b-form-checkbox>
              </b-form-group> -->
            </b-dropdown-form>
            <!-- <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here...</b-dropdown-item> -->
          </b-dropdown>

        </div>
      </div>
    </div>
    <div class="row row-deck row-cards">
      <div class="col-sm-6 col-md-4 col-lg-2">
        <cpus :stat="stat_cpus" :key="'os.cpus.hosts:'+selected_hosts.join(',')"/>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <memory :stat="stat_memory" :key="'os.memory.hosts:'+selected_hosts.join(',')"/>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">

        <net :stat="stat_net_in" type="In" :key="'os.In.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">

        <net :stat="stat_net_out" type="Out" :key="'os.netOut.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="row">
          <loadavg :stat="stat_loadavg" :key="'os.loadavg.hosts:'+selected_hosts.join(',')"/>

          <div class="w-100 d-none d-md-block"></div>

          <uptime :stat="stat_uptime" :key="'os.uptime.hosts:'+selected_hosts.join(',')"/>
        </div>

      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">

        <blocks :stat="stat_blocks" :key="'os.blocks.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-lg-7">

        <traffic :stat="traffic" :dark="dark" :mode="mode" :fluid="fluid" :key="'web.traffic.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-lg-5">

        <geoip :stat="geodata" :dark="dark" :mode="mode" :fluid="fluid" :key="'web.geoip.hosts:'+selected_hosts.join(',')"/>

      </div>
      <div class="col-lg-6">
        <div class="row row-cards row-deck">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body p-4 py-5 text-center">
                <span class="avatar avatar-xl mb-4">W</span>
                <h3 class="mb-0">New website</h3>
                <p class="text-muted">Due to: 28 Aug 2019</p>
                <p class="mb-3">
                  <span class="badge bg-red-lt">Waiting</span>
                </p>
                <div>
                  <div class="avatar-list avatar-list-stacked">
                    <span class="avatar" style="background-image: url(./static/avatars/000m.jpg)"></span>
                    <span class="avatar">JL</span>
                    <span class="avatar" style="background-image: url(./static/avatars/002m.jpg)"></span>
                    <span class="avatar" style="background-image: url(./static/avatars/003m.jpg)"></span>
                    <span class="avatar" style="background-image: url(./static/avatars/000f.jpg)"></span>
                  </div>
                </div>
              </div>
              <div class="progress card-progress">
                <div class="progress-bar" style="width: 38%" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                  <span class="sr-only">38% Complete</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body p-4 py-5 text-center">
                <span class="avatar avatar-xl mb-4 bg-green-lt">W</span>
                <h3 class="mb-0">UI Redesign</h3>
                <p class="text-muted">Due to: 11 Nov 2019</p>
                <p class="mb-3">
                  <span class="badge bg-green-lt">Final review</span>
                </p>
                <div>
                  <div class="avatar-list avatar-list-stacked">
                    <span class="avatar">HS</span>
                    <span class="avatar" style="background-image: url(./static/avatars/006m.jpg)"></span>
                    <span class="avatar" style="background-image: url(./static/avatars/004f.jpg)"></span>
                  </div>
                </div>
              </div>
              <div class="progress card-progress">
                <div class="progress-bar bg-green" style="width: 38%" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                  <span class="sr-only">38% Complete</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body p-2 text-center">
                <div class="text-right text-green">
                  <span class="text-green d-inline-flex align-items-center lh-1">
                    6% <svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                  </span>
                </div>
                <div class="h1 m-0">43</div>
                <div class="text-muted mb-4">New Tickets</div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body p-2 text-center">
                <div class="text-right text-red">
                  <span class="text-red d-inline-flex align-items-center lh-1">
                    -2% <svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="3 7 9 13 13 9 21 17" /><polyline points="21 10 21 17 14 17" /></svg>
                  </span>
                </div>
                <div class="h1 m-0">95</div>
                <div class="text-muted mb-4">Daily Earnings</div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body p-2 text-center">
                <div class="text-right text-green">
                  <span class="text-green d-inline-flex align-items-center lh-1">
                    9% <svg xmlns="http://www.w3.org/2000/svg" class="icon ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                  </span>
                </div>
                <div class="h1 m-0">7</div>
                <div class="text-muted mb-4">New Replies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <!-- <div id="chart-development-activity" class="mt-4"></div> -->
          <apexchart
            :class="'mt-4'"
            height="160"
            id="chart-development-activity"
            :options="{
              chart: {
                type: 'area',
                fontFamily: 'inherit',
                height: 160,
                sparkline: {
                  enabled: true
                },
                animations: {
                  enabled: false
                },
              },
              dataLabels: {
                enabled: false,
              },
              fill: {
                opacity: .16,
                type: 'solid'
              },
              title: {
                text: 'Development Activity',
                margin: 0,
                floating: true,
                offsetX: 10,
                style: {
                  fontSize: '18px',
                },
              },
              stroke: {
                width: 2,
                lineCap: 'round',
                curve: 'smooth',
              },
              grid: {
                strokeDashArray: 4,
              },
              xaxis: {
                labels: {
                  padding: 0
                },
                tooltip: {
                  enabled: false
                },
                axisBorder: {
                  show: false,
                },
                type: 'datetime',
              },
              yaxis: {
                labels: {
                  padding: 4
                },
              },
              labels: [
                '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
              ],
              colors: ['#206bc4'],
              legend: {
                show: false,
              },
              point: {
                show: false
              },
            }"
            :series="[{
              name: 'Purchases',
              data: [3, 5, 4, 6, 7, 5, 6, 8, 24, 7, 12, 5, 6, 3, 8, 4, 14, 30, 17, 19, 15, 14, 25, 32, 40, 55, 60, 48, 52, 70]
            }]"
          ></apexchart>
          <div class="table-responsive">
            <table class="table card-table table-vcenter">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Commit</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="w-1">
                    <span class="avatar" style="background-image: url(./static/avatars/000m.jpg)"></span>
                  </td>
                  <td class="td-truncate">
                    <div class="text-truncate">
                      Fix dart Sass compatibility (#29755)
                    </div>
                  </td>
                  <td class="text-nowrap text-muted">28 Nov 2019</td>
                </tr>
                <tr>
                  <td class="w-1">
                    <span class="avatar">JL</span>
                  </td>
                  <td class="td-truncate">
                    <div class="text-truncate">
                      Change deprecated html tags to text decoration classes (#29604)
                    </div>
                  </td>
                  <td class="text-nowrap text-muted">27 Nov 2019</td>
                </tr>
                <tr>
                  <td class="w-1">
                    <span class="avatar" style="background-image: url(./static/avatars/002m.jpg)"></span>
                  </td>
                  <td class="td-truncate">
                    <div class="text-truncate">
                      justify-content:between ⇒ justify-content:space-between (#29734)
                    </div>
                  </td>
                  <td class="text-nowrap text-muted">26 Nov 2019</td>
                </tr>
                <tr>
                  <td class="w-1">
                    <span class="avatar" style="background-image: url(./static/avatars/003m.jpg)"></span>
                  </td>
                  <td class="td-truncate">
                    <div class="text-truncate">
                      Update change-version.js (#29736)
                    </div>
                  </td>
                  <td class="text-nowrap text-muted">26 Nov 2019</td>
                </tr>
                <tr>
                  <td class="w-1">
                    <span class="avatar" style="background-image: url(./static/avatars/000f.jpg)"></span>
                  </td>
                  <td class="td-truncate">
                    <div class="text-truncate">
                      Regenerate package-lock.json (#29730)
                    </div>
                  </td>
                  <td class="text-nowrap text-muted">25 Nov 2019</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="card card-sm">
          <div class="card-body d-flex align-items-center">
            <span class="bg-blue text-white stamp mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
            </span>
            <div class="mr-3 lh-sm">
              <div class="strong">
                132 Sales
              </div>
              <div class="text-muted">12 waiting payments</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="card card-sm">
          <div class="card-body d-flex align-items-center">
            <span class="bg-green text-white stamp mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="9" cy="19" r="2" /><circle cx="17" cy="19" r="2" /><path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg>
            </span>
            <div class="mr-3 lh-sm">
              <div class="strong">
                78 Orders
              </div>
              <div class="text-muted">32 shipped</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="card card-sm">
          <div class="card-body d-flex align-items-center">
            <div class="mr-3">
              <!-- <div class="chart-sparkline chart-sparkline-square" id="sparkline-7"></div> -->
              <peity
                :type="'pie'"
                :options="{
                  width: 40,
                  height: 40,
                  stroke: '#cd201f',
                  strokeWidth: 2,
                  fill: ['#cd201f', 'rgba(110, 117, 130, 0.2)'],
                  padding: .2,
                  innerRadius: 17,
                }"
                :data="'56/100'"
              >
              </peity>
            </div>
            <div class="mr-3 lh-sm">
              <div class="strong">
                1,352 Members
              </div>
              <div class="text-muted">163 registered today</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="card card-sm">
          <div class="card-body d-flex align-items-center">
            <div class="mr-3 lh-sm">
              <div class="strong">
                132 Comments
              </div>
              <div class="text-muted">16 waiting</div>
            </div>
            <div class="ml-auto">
              <!-- <div class="chart-sparkline chart-sparkline-square" id="sparkline-8"></div> -->
              <peity
                :type="'pie'"
                :options="{
                  width: 40,
                  height: 40,
                  stroke: '#fab005',
                  strokeWidth: 2,
                  fill: ['#fab005', 'rgba(110, 117, 130, 0.2)'],
                  padding: .2,
                  innerRadius: 17,
                }"
                :data="'22/100'"
              >
              </peity>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-8">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Most Visited Pages</h4>
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter">
              <thead>
                <tr>
                  <th>Page name</th>
                  <th>Visitors</th>
                  <th>Unique</th>
                  <th colspan="2">Bounce rate</th>
                </tr>
              </thead>
              <tr>
                <td>
                  /about.html
                  <a href="#" class="link-secondary ml-2"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" /><path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>
                  </a>
                </td>
                <td class="text-muted">4,896</td>
                <td class="text-muted">3,654</td>
                <td class="text-muted">82.54%</td>
                <td class="text-right">
                  <!-- <div class="chart-sparkline" id="sparkline-9"></div> -->
                  <peity
                    :type="'line'"
                    :options="{
                      width: 64,
                      height: 40,
                      stroke: '#206bc4',
                      strokeWidth: 2,
                      fill: ['#d2e1f3'],
                      padding: .2,
                    }"
                    :data="'17, 24, 20, 10, 5, 1, 4, 18, 13'"
                  >
                  </peity>
                </td>
              </tr>
              <tr>
                <td>
                  /special-promo.html
                  <a href="#" class="link-secondary ml-2"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" /><path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>
                  </a>
                </td>
                <td class="text-muted">3,652</td>
                <td class="text-muted">3,215</td>
                <td class="text-muted">76.29%</td>
                <td class="text-right">
                  <!-- <div class="chart-sparkline" id="sparkline-10"></div> -->
                  <peity
                    :type="'line'"
                    :options="{
                      width: 64,
                      height: 40,
                      stroke: '#206bc4',
                      strokeWidth: 2,
                      fill: ['#d2e1f3'],
                      padding: .2,
                    }"
                    :data="'13, 11, 19, 22, 12, 7, 14, 3, 21'"
                  >
                  </peity>
                </td>
              </tr>
              <tr>
                <td>
                  /news/1,new-ui-kit.html
                  <a href="#" class="link-secondary ml-2"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" /><path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>
                  </a>
                </td>
                <td class="text-muted">3,256</td>
                <td class="text-muted">2,865</td>
                <td class="text-muted">72.65%</td>
                <td class="text-right">
                  <!-- <div class="chart-sparkline" id="sparkline-11"></div> -->
                  <peity
                    :type="'line'"
                    :options="{
                      width: 64,
                      height: 40,
                      stroke: '#206bc4',
                      strokeWidth: 2,
                      fill: ['#d2e1f3'],
                      padding: .2,
                    }"
                    :data="'10, 13, 10, 4, 17, 3, 23, 22, 19'"
                  >
                  </peity>
                </td>
              </tr>
              <tr>
                <td>
                  /lorem-ipsum-dolor-sit-amet-very-long-url.html
                  <a href="#" class="link-secondary ml-2"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" /><path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>
                  </a>
                </td>
                <td class="text-muted">986</td>
                <td class="text-muted">865</td>
                <td class="text-muted">44.89%</td>
                <td class="text-right">
                  <!-- <div class="chart-sparkline" id="sparkline-12"></div> -->
                  <peity
                    :type="'line'"
                    :options="{
                      width: 64,
                      height: 40,
                      stroke: '#206bc4',
                      strokeWidth: 2,
                      fill: ['#d2e1f3'],
                      padding: .2,
                    }"
                    :data="'9, 6, 14, 11, 8, 24, 2, 16, 15'"
                  >
                  </peity>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <a href="https://github.com/sponsors/codecalm" class="card card-sponsor" target="_blank" style="background-image: url(./static/sponsor-banner-homepage.svg)">
          <div class="card-body"></div>
        </a>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Social Media Traffic</h4>
          </div>
          <table class="table card-table table-vcenter">
            <thead>
              <tr>
                <th>Network</th>
                <th colspan="2">Visitors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Instagram</td>
                <td>3,550</td>
                <td class="w-50">
                  <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: 71.0%"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Twitter</td>
                <td>1,798</td>
                <td class="w-50">
                  <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: 35.96%"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Facebook</td>
                <td>1,245</td>
                <td class="w-50">
                  <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: 24.9%"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Pinterest</td>
                <td>854</td>
                <td class="w-50">
                  <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: 17.08%"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>VK</td>
                <td>650</td>
                <td class="w-50">
                  <div class="progress progress-xs">
                    <div class="progress-bar bg-primary" style="width: 13.0%"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-6 col-lg-8">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Tasks</h4>
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter">
              <tr>
                <td class="w-1 pr-0">
                  <label class="form-check m-0">
                    <input type="checkbox" class="form-check-input" checked>
                    <span class="form-check-label"></span>
                  </label>
                </td>
                <td class="w-100">
                  <a href="#" class="text-reset">Extend the data model.</a>
                </td>
                <td class="text-nowrap text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="11" y1="15" x2="12" y2="15" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
                  January 01, 2019
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 12l5 5l10 -10" /></svg>
                    2/7
                  </a>
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
                    3</a>
                </td>
                <td>
                  <span class="avatar" style="background-image: url(./static/avatars/000m.jpg)"></span>
                </td>
              </tr>
              <tr>
                <td class="w-1 pr-0">
                  <label class="form-check m-0">
                    <input type="checkbox" class="form-check-input">
                    <span class="form-check-label"></span>
                  </label>
                </td>
                <td class="w-100">
                  <a href="#" class="text-reset">Verify the event flow.</a>
                </td>
                <td class="text-nowrap text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="11" y1="15" x2="12" y2="15" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
                  January 01, 2019
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 12l5 5l10 -10" /></svg>
                    3/10
                  </a>
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
                    6</a>
                </td>
                <td>
                  <span class="avatar">JL</span>
                </td>
              </tr>
              <tr>
                <td class="w-1 pr-0">
                  <label class="form-check m-0">
                    <input type="checkbox" class="form-check-input">
                    <span class="form-check-label"></span>
                  </label>
                </td>
                <td class="w-100">
                  <a href="#" class="text-reset">Database backup and maintenance</a>
                </td>
                <td class="text-nowrap text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="11" y1="15" x2="12" y2="15" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
                  January 01, 2019
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 12l5 5l10 -10" /></svg>
                    0/6
                  </a>
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
                    1</a>
                </td>
                <td>
                  <span class="avatar" style="background-image: url(./static/avatars/002m.jpg)"></span>
                </td>
              </tr>
              <tr>
                <td class="w-1 pr-0">
                  <label class="form-check m-0">
                    <input type="checkbox" class="form-check-input" checked>
                    <span class="form-check-label"></span>
                  </label>
                </td>
                <td class="w-100">
                  <a href="#" class="text-reset">Identify the implementation team.</a>
                </td>
                <td class="text-nowrap text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="11" y1="15" x2="12" y2="15" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
                  January 01, 2019
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 12l5 5l10 -10" /></svg>
                    6/10
                  </a>
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
                    12</a>
                </td>
                <td>
                  <span class="avatar" style="background-image: url(./static/avatars/003m.jpg)"></span>
                </td>
              </tr>
              <tr>
                <td class="w-1 pr-0">
                  <label class="form-check m-0">
                    <input type="checkbox" class="form-check-input">
                    <span class="form-check-label"></span>
                  </label>
                </td>
                <td class="w-100">
                  <a href="#" class="text-reset">Define users and workflow</a>
                </td>
                <td class="text-nowrap text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="11" y1="15" x2="12" y2="15" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
                  January 01, 2019
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 12l5 5l10 -10" /></svg>
                    3/7
                  </a>
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
                    5</a>
                </td>
                <td>
                  <span class="avatar" style="background-image: url(./static/avatars/000f.jpg)"></span>
                </td>
              </tr>
              <tr>
                <td class="w-1 pr-0">
                  <label class="form-check m-0">
                    <input type="checkbox" class="form-check-input" checked>
                    <span class="form-check-label"></span>
                  </label>
                </td>
                <td class="w-100">
                  <a href="#" class="text-reset">Check Pull Requests</a>
                </td>
                <td class="text-nowrap text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="5" width="16" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="11" y1="15" x2="12" y2="15" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
                  January 01, 2019
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 12l5 5l10 -10" /></svg>
                    2/9
                  </a>
                </td>
                <td class="text-nowrap">
                  <a href="#" class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="14" y2="13" /></svg>
                    3</a>
                </td>
                <td>
                  <span class="avatar" style="background-image: url(./static/avatars/001f.jpg)"></span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>


  </q-page>
</template>

<script>
import Vue from 'vue'
import { BButton, BDropdown, BDropdownItem, BDropdownForm, BDropdownDivider, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BModal, VBModal } from 'bootstrap-vue'
// Vue.directive('b-modal', VBModal)

import * as Debug from 'debug'
const debug = Debug('apps:logs:web')
debug.log = console.log.bind(console) // don't forget to bind to console!

import JSPipeline from 'js-pipeline'
import Pipeline from '@apps/logs/web/pipelines/periodical'

import DataSourcesMixin from '@mixins/dataSources'

/**
* Web components
**/
import geoip from '@apps/logs/web/components/geoip'
import traffic from '@apps/logs/web/components/traffic'

import { requests, store } from './sources/index'

import { EventBus } from '@libs/eventbus'
import chartTabular from 'components/chart.tabular'
import chart from 'components/chart'

export default {
  mixins: [DataSourcesMixin],
  name: 'AppLogsWeb',

  components: {
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownForm,
    BDropdownDivider,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormGroup,
    BModal,
    chartTabular,
    chart,
    /**
    * web
    **/
    geoip,
    traffic
  },

  props: {
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
      height: '0px',

      hosts: [
      ],

      selected_hosts: [],
      /**
      * dataSources
      **/
      store: false,
      pipeline_id: ['input.hosts.periodical'],

      id: 'input.hosts.periodical',
      path: 'all',

      // host: 'perseus',
      components: {
        'all': [
          {
            // some_data: {
            //   hosts: true
            // },
            source: {
              requests: requests,
              store: store
            }
          }

        ]
      },

      EventBus: EventBus,
      stat_memory: [],
      stat_cpus: [],
      stat_loadavg: [],
      stat_uptime: [],
      stat_blocks: [],
      stat_net_in: [],
      stat_net_out: [],

      // stat_world_map_country_counter: [],
      // stat_world_map_city_counter: [],
      geodata: {
        city_counter: [],
        country_counter: [],
        top_city_counter: [],
        top_country_counter: [],
        continent_counter: [],
        world_map_city_counter: [],
        top_world_map_city_counter: [],
        world_map_country_counter: [],
        top_world_map_country_counter: []
      },

      traffic: {
        host_counter: [],
        domain_counter: [],
        top_host_counter: [],
        top_domain_counter: []
      },

      top: 5,

      // // chart: Object.merge(chartConfig, {skip: 5}),
      // /**
      // * vGauge
      // **/
      // domains_chart: chartConfigDomains,
      // cpus_chart: chartConfigCpus,
      //
      // domainsWrapper: dygraphBarWrapper,
      // cpusWrapper: dygraphWrapper,
      // // cpusWrapper: vuePeityWrapper,
      // cpus_stat: {
      //   data: [],
      //   length: 360
      // },
      //
      // domains_stat: {
      //   data: [],
      //   length: 360
      // }
    }
  },
  created: function () {
    let selected_hosts = this.$route.query.selected_hosts
    debug('created selected_hosts', selected_hosts)
    if (selected_hosts) {
      if (!Array.isArray(selected_hosts)) selected_hosts = [selected_hosts]

      this.selected_hosts = selected_hosts
    } else {
      this.selected_hosts = []
    }
  },
  computed: {
    allHostsSelected: {
      get: function () {
        if (this.selected_hosts.length === 0) { return true }

        return false
      },
      set: function (val) {
        debug('allHostsSelected', val)
        if (val === true) {
          this.$router.replace({name: 'hosts', query: { ...this.$route.query, selected_hosts: []}}).catch(err => { debug('allHostsSelected set', err) })
          this.selected_hosts = []
        }
      }
    },
  },
  methods: {
    setHost: function (val) {
      this.$router.replace({name: 'hosts', query: { ...this.$route.query, selected_hosts: this.selected_hosts}}).catch(err => { debug('setHost', err) })
    },
    // setAllHosts: function (val) {
    //   debug('setAllHosts', val)
    //   // if (true) {
    //   //   this.selected_hosts = []
    //   // }
    //   // // else{
    //   // //
    //   // // }
    // },
    /**
    * @start pipelines
    **/
    create_pipelines: function (create_id, next) {
      debug('create_pipelines %o', JSON.parse(JSON.stringify(this.$options.pipelines)), create_id)

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
