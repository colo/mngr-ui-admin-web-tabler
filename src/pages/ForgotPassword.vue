<template>
  <q-page>
    <div class="flex-fill d-flex flex-column justify-content-center py-4">
      <div class="container-tight py-6">
        <div class="text-center mb-4">
          <img src="../static/logo.svg" height="36" alt="">
        </div>
        <form class="card card-md" action="." method="get">
          <div class="card-body">
            <h2 class="mb-5 text-center">Forgot password</h2>
            <p class="text-muted">Enter your email address and your password will be reset and emailed to you.</p>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" placeholder="Enter email">
            </div>
            <div class="form-footer">
              <a href="#" class="btn btn-primary w-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
                Send me new password
              </a>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt">
          Forget it, <a href="./sign-in.html">send me back</a> to the sign in screen.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageForgotPassword'
}
</script>
