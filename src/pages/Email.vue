<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Crypto currencies
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <h3 class="mb-4">Mail Service</h3>
        <div>
          <div class="list-group list-group-transparent mb-0">
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center active">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 13h3l3 3h4l3 -3h3" /></svg>
              </span>Inbox <span class="ml-auto badge bg-blue">14</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="10" y1="14" x2="21" y2="3" /><path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
              </span>Sent Mail
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </span>Important <span class="ml-auto badge bg-gray">3</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" /></svg>
              </span>Starred
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="14 3 14 8 19 8" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
              </span>Drafts
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" /><circle cx="9" cy="9" r="2" /></svg>
              </span>Tags
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
              <span class="icon mr-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </span>Trash
            </a>
          </div>
          <div class="mt-4">
            <a href="#" class="btn btn-white btn-block">Compose new Email</a>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Compose new message</h3>
          </div>
          <div class="card-body">
            <form action="">
              <div class="mb-2">
                <div class="row align-items-center">
                  <label class="col-sm-2">To:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <div class="row align-items-center">
                  <label class="col-sm-2">Subject:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control">
                  </div>
                </div>
              </div>
              <textarea rows="10" class="form-control"></textarea>
              <div class="btn-list mt-4 text-right">
                <button type="button" class="btn btn-white btn-space">Cancel</button>
                <button type="submit" class="btn btn-primary btn-space">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageEmail'
}
</script>
