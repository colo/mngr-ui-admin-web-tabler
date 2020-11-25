<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Tabs
          </h2>
        </div>
      </div>
    </div>
    <div class="row row-cards">
      <div class="col-md-4">
        <b-tabs content-class="card-body" :class="'card'">
          <b-tab title="Home" title-link-class="nav-link" >
            Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh
          </b-tab>
          <b-tab title="Profile" title-link-class="nav-link">
            Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed
          </b-tab>
          <b-tab title-item-class="ml-auto" title-link-class="nav-link">
            <template v-slot:title>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
            </template>
              Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus
          </b-tab>
        </b-tabs>
        <!-- <div class="card">
          <ul class="nav nav-tabs" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-86" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-86" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item ml-auto">
              <a href="#tabs-settings-86" class="nav-link" title="Settings" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
              </a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-86">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-86">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane" id="tabs-settings-86">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-md-4">
        <b-tabs content-class="card-body" :class="'card'" nav-class="flex-row-reverse ">
          <b-tab title="Home" title-link-class="nav-link" >
            Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh
          </b-tab>
          <b-tab title="Profile" title-link-class="nav-link">
            Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed
          </b-tab>
          <b-tab title-item-class="mr-auto" title-link-class="nav-link">
            <template v-slot:title>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
            </template>
              Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus
          </b-tab>
        </b-tabs>
        <!-- <div class="card">
          <ul class="nav nav-tabs flex-row-reverse" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-87" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-87" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item mr-auto">
              <a href="#tabs-settings-87" class="nav-link" title="Settings" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
              </a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-87">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-87">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane" id="tabs-settings-87">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-88" class="nav-link active" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-88" class="nav-link" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="7" r="4" /><path d="M5.5 21v-2a4 4 0 0 1 4 -4h5a4 4 0 0 1 4 4v2" /></svg>
                Profile</a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-88">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-88">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs nav-tabs-alt" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-89" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-89" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item ml-auto">
              <a href="#tabs-settings-89" class="nav-link" title="Settings" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
              </a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-89">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-89">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane" id="tabs-settings-89">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs nav-tabs-alt flex-row-reverse" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-90" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-90" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item mr-auto">
              <a href="#tabs-settings-90" class="nav-link" title="Settings" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>
              </a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-90">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-90">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane" id="tabs-settings-90">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs nav-tabs-alt" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-91" class="nav-link active" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-91" class="nav-link" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="7" r="4" /><path d="M5.5 21v-2a4 4 0 0 1 4 -4h5a4 4 0 0 1 4 4v2" /></svg>
                Profile</a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-91">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-91">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <b-tabs content-class="card-body" :class="'card'">
          <b-tab title="Home" title-link-class="nav-link" >
            Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh
          </b-tab>
          <b-tab title="Profile" title-link-class="nav-link">
            Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed
          </b-tab>
          <b-tab title-link-class="nav-link">
            <template v-slot:title>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg> -->
              <b-dropdown variant="link" toggle-class="text-decoration-none btn-options" no-caret>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </a>
                </template>

                <b-dropdown-item>
                  Action
                </b-dropdown-item>

                <b-dropdown-item>
                  Another action
                </b-dropdown-item>

              </b-dropdown>
            </template>
              <!-- Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus -->
          </b-tab>
        </b-tabs>
        <!-- <div class="card">
          <ul class="nav nav-tabs" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-92" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-92" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </div>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-92">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-92">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs nav-fill" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-93" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-93" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-activity-93" class="nav-link" data-toggle="tab">Activity</a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-93">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-93">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane" id="tabs-activity-93">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs nav-fill" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-94" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-94" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-activity-94" class="nav-link disabled" data-toggle="tab">Disabled</a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-94">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-94">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs nav-fill" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-95" class="nav-link active" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-95" class="nav-link" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="7" r="4" /><path d="M5.5 21v-2a4 4 0 0 1 4 -4h5a4 4 0 0 1 4 4v2" /></svg>
                Profile</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-activity-95" class="nav-link" data-toggle="tab"><svg xmlns="http://www.w3.org/2000/svg" class="icon mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="21 12 17 12 14 20 10 4 7 12 3 12" /></svg>
                Activity</a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane active show" id="tabs-home-95">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane" id="tabs-profile-95">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane" id="tabs-activity-95">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <ul class="nav nav-tabs" data-toggle="tabs">
            <li class="nav-item">
              <a href="#tabs-home-96" class="nav-link active" data-toggle="tab">Home</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-profile-96" class="nav-link" data-toggle="tab">Profile</a>
            </li>
            <li class="nav-item">
              <a href="#tabs-activity-96" class="nav-link" data-toggle="tab">Activity</a>
            </li>
          </ul>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane fade active show" id="tabs-home-96">
                <div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
              </div>
              <div class="tab-pane fade" id="tabs-profile-96">
                <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
              </div>
              <div class="tab-pane fade" id="tabs-activity-96">
                <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { BTabs, BTab, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'PageTabs',

  components: { BTabs, BTab, BDropdown, BDropdownItem }
}
</script>
