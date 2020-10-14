<template>
  <q-page>
    <div class="flex-fill d-flex flex-column justify-content-center">
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
              <button type="submit" class="btn btn-primary btn-block">Send me new password</button>
            </div>
          </div>
        </form>
        <div class="text-center text-muted">
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
