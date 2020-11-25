<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">
            Users
          </h2>
          <div class="text-muted mt-1">1-18 of 413 people</div>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <div class="d-flex">
            <input type="search" class="form-control d-inline-block w-9 mr-3" placeholder="Search user…"/>
            <a href="#" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New user
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cards">
      <div class="col-md-6 col-lg-4">
        <t-user-card-progress />
      </div>
      <div class="col-md-6 col-lg-4">
        <t-user-card-progress
          :name="'Jeffie Lewzey'"
          :title="'Chemical Engineer'"
          :avatar="false"
          :to="{ path: '#' }"
          :actions="[
            {label: 'Chat', to: {path: '#'}, variant: 'info'},
            {label: 'Profile', to: {path: '#'}, variant: 'outline-info'}
          ]"
          :status="{
            label: 'online'
          }"
          :progress="{
            title: 'Progress',
            label: undefined,
            class: 'bg-blue',
            value: 42,
            max: 100,
          }"
        />

        <!-- <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar">JL</span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Jeffie Lewzey</a></h3>
                <div class="text-muted text-h5">Chemical Engineer</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">42%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 42%" role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">42% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/002m.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Mallory Hulme</a></h3>
                <div class="text-muted text-h5">Geologist IV</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">57%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 57%" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">57% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/003m.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Dunn Slane</a></h3>
                <div class="text-muted text-h5">Research Nurse</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">65%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 65%" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">65% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/000f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Emmy Levet</a></h3>
                <div class="text-muted text-h5">VP Product Management</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">48%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 48%" role="progressbar" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">48% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/001f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Maryjo Lebarree</a></h3>
                <div class="text-muted text-h5">Civil Engineer</div>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">47%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 47%" role="progressbar" aria-valuenow="47" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">47% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar">EP</span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Egan Poetz</a></h3>
                <div class="text-muted text-h5">Research Nurse</div>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">35%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 35%" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">35% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/002f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Kellie Skingley</a></h3>
                <div class="text-muted text-h5">Teacher</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">87%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 87%" role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">87% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/003f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Christabel Charlwood</a></h3>
                <div class="text-muted text-h5">Tax Accountant</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">95%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 95%" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">95% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar">HS</span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Haskel Shelper</a></h3>
                <div class="text-muted text-h5">Staff Scientist</div>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">79%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 79%" role="progressbar" aria-valuenow="79" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">79% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/006m.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Lorry Mion</a></h3>
                <div class="text-muted text-h5">Automation Specialist IV</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">65%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 65%" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">65% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/004f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Leesa Beaty</a></h3>
                <div class="text-muted text-h5">Editor</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">62%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 62%" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">62% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/007m.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Perren Keemar</a></h3>
                <div class="text-muted text-h5">Analog Circuit Design manager</div>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">44%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 44%" role="progressbar" aria-valuenow="44" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">44% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar">SA</span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Sunny Airey</a></h3>
                <div class="text-muted text-h5">Nuclear Power Engineer</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-gray-lt">
                  offline
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">8%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 8%" role="progressbar" aria-valuenow="8" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">8% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/009m.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Geoffry Flaunders</a></h3>
                <div class="text-muted text-h5">Software Test Engineer II</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">53%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 53%" role="progressbar" aria-valuenow="53" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">53% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/010m.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Thatcher Keel</a></h3>
                <div class="text-muted text-h5">VP Sales</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-gray-lt">
                  offline
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">62%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 62%" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">62% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/005f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Dyann Escala</a></h3>
                <div class="text-muted text-h5">Mechanical Systems Engineer</div>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">27%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 27%" role="progressbar" aria-valuenow="27" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">27% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row row-sm align-items-center">
              <div class="col-auto">
                <span class="avatar" style="background-image: url(./static/avatars/006f.jpg)"></span>
              </div>
              <div class="col">
                <h3 class="mb-0"><a href="#">Avivah Mugleston</a></h3>
                <div class="text-muted text-h5">Actuary</div>
              </div>
              <div class="col-auto lh-1 align-self-start">
                <span class="badge bg-green-lt">
                  online
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-4">
              <div class="col">
                <div>
                  <div class="d-flex mb-1 align-items-center lh-1">
                    <div class="text-h5 font-weight-bolder m-0">Progress</div>
                    <span class="ml-auto text-h6 strong">36%</span>
                  </div>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-blue" style="width: 36%" role="progressbar" aria-valuenow="36" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden">36% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-list">
                  <a href="#" class="btn btn-white btn-sm">
                    Chat
                  </a>
                  <a href="#" class="btn btn-white btn-sm">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <ul class="pagination ml-auto">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="15 6 9 12 15 18" /></svg>
            prev
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
        <li class="page-item">
          <a class="page-link" href="#">
            next <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 6 15 12 9 18" /></svg>
          </a>
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script>
import TUserCardProgress from 'components/TUserCardProgress'

export default {
  name: 'PageUsers',
  components: { TUserCardProgress }
}
</script>
