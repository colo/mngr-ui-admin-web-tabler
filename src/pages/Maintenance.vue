<template>
  <q-page>
    <div class="flex-fill d-flex align-items-center justify-content-center">
      <div class="container-tight py-6">
        <div class="empty">
          <div class="empty-icon">
            <img src="../static/illustrations/undraw_quitting_time_dm8t.svg" height="128" class="mb-4"  alt="">
          </div>
          <p class="empty-title h3">Temporarily down for maintenance</p>
          <p class="empty-subtitle text-muted">
            Sorry for the inconvenience but we’re performing some maintenance at the moment. We’ll be back online shortly!
          </p>
          <div class="empty-action">
            <a href="./." class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /></svg>
              Take me home
            </a>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageMaintenance'
}
</script>
