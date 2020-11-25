<template>
  <q-page>
    <div class="flex-fill d-flex flex-column justify-content-center py-4">
      <div class="container-tight py-6">
        <div class="text-center mb-4">
          <!-- <img src="@static/logo.svg" height="36" alt=""> -->
        </div>
        <b-form class="card card-md" v-on:submit.prevent="submit">
          <!-- :action="uri" method="post"  -->
          <div class="card-body">
            <h2 class="mb-5 text-center">Login to your account</h2>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <b-form-input
                id="username"
                name="username"
                type="email"
                required
                placeholder="Enter email"
                v-model="form.username"
              ></b-form-input>

            </div>
            <div class="mb-2">
              <label class="form-label">
                Password
                <!-- <span class="form-label-description">
                  <b-link :to="{ path: 'forgot-password' }" >I forgot password</b-link>
                </span> -->
              </label>
              <div class="input-group input-group-flat">
                <b-form-input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                ></b-form-input>
                <span class="input-group-text">
                  <a href="#" class="link-secondary" title="Show password" data-toggle="tooltip"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="2" /><path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" /><path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg>
                  </a>
                </span>
              </div>
            </div>
            <div class="mb-2">
              <label class="form-check">
                <input type="checkbox" class="form-check-input"/>
                <span class="form-check-label">Remember me on this device</span>
              </label>
            </div>
            <div class="form-footer">
              <!-- <b-button type="submit" variant="primary" class="btn-block">Sign in</b-button> -->
              <b-button type="submit" variant="primary" class="w-100">Sign in</b-button>
            </div>
          </div>
          <!-- <div class="hr-text">or</div>
          <div class="card-body">
            <div class="row">
              <div class="col"><b-button :to="{ path: '#' }" variant="white" class="w-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon text-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                  Login with Github
              </b-button></div>
              <div class="col"><b-button :to="{ path: '#' }" variant="white" class="w-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon text-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                  Login with Twitter
              </b-button></div>
            </div>
          </div> -->
        </b-form>
        <!-- <div class="text-center text-muted mt">
          Don't have account yet? <b-link :to="{ path: 'signup' }" tabindex="-1">Sign up</b-link>
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import * as Debug from 'debug'
const debug = Debug('apps:signin')
debug.log = console.log.bind(console) // don't forget to bind to console!

// import axios from 'axios'

import { BForm, BFormInput, BButton, BLink } from 'bootstrap-vue'

import HttpSignin from '@etc/signin.http'

export default {
  name: 'PageSignin',

  components: { BForm, BFormInput, BButton, BLink },
  data () {
    return {
      form: {
        username: undefined,
        password: undefined
      }
    }
  },
  computed: {
    uri: function () {
      let http = HttpSignin()
      return http.scheme + '://' + http.host + ':' + http.port + '' + http.path
    }
  },

  methods: {
    submit: function () {
      this.$axios.post(this.uri, this.form, { withCredentials: true })
        .then((res) => {
          // Perform Success Action
          debug('res', res)
          this.$router.push({ name: 'index'})
        })
        .catch((error) => {
          debug('error', error)
          // error.response.status Check status code
        })
        // .finally(() => {
        //   // Perform action in always
        // })
    }
  }
}
</script>
