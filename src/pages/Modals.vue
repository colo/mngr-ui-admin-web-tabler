<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Modals
          </h2>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="btn-list">
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-simple'">
            Simple modal
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-large'">
            Large modal
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-small'">
            Small modal
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-full-width'">
            Full width modal
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-scrollable'">
            Scrollable modal
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-report'">
            Modal with form
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-info'">
            Info modal
          </b-button>
          <b-button variant="white" data-toggle="modal" v-b-modal="'modal-team'">
            Modal with simple form
          </b-button>
        </div>
      </div>
    </div>

    <b-modal centered modal-class="modal-blur" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true" hide-header-close>
      <template v-slot:modal-title="{ close }">
        Modal title
        <b-button variant="white" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close()"></b-button>
      </template>
      <template v-slot:default>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit tempora totam unde.
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="white" class="mr-auto" @click="close()">Close</b-button>
        <b-button variant="primary" @click="close()">Save changes</b-button>
      </template>

    </b-modal>

    <b-modal centered  size="lg" modal-class="modal-blur" id="modal-large" tabindex="-1" role="dialog" aria-hidden="true" hide-header-close>
      <template v-slot:modal-title="{ close }">
        Large modal
        <b-button variant="white" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close()"></b-button>
      </template>
      <template v-slot:default>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit tempora totam unde.
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="white" class="mr-auto" @click="close()">Close</b-button>
        <b-button variant="primary" @click="close()">Save changes</b-button>
      </template>

    </b-modal>

    <b-modal centered  size="sm" title="Modal title" modal-class="modal-blur" id="modal-small" tabindex="-1" role="dialog" aria-hidden="true" hide-header>
      <template v-slot:default>
        <div class="modal-title">Are you sure?</div>
        <div>If you proceed, you will lose all your personal data.</div>
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="link secondary" class="mr-auto" @click="close()">Cancel</b-button>
        <b-button variant="danger" @click="close()">Yes, delete all my data</b-button>
      </template>

    </b-modal>

    <b-modal centered  modal-class="modal-blur" id="modal-full-width" tabindex="-1" role="dialog" aria-hidden="true" dialog-class="modal-full-width" hide-header-close>
      <template v-slot:modal-title="{ close }">
        Full width modal
        <b-button variant="white" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close()"></b-button>
      </template>
      <template v-slot:default>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit tempora totam unde.
      </template>
      <template v-slot:modal-footer="{ close }">
        <button type="button" class="btn btn-white mr-auto" @click="close()">Close</button>
        <button type="button" class="btn btn-primary" @click="close()">Save changes</button>
      </template>

    </b-modal>

    <b-modal centered  modal-class="modal-blur" id="modal-scrollable" tabindex="-1" role="dialog" aria-hidden="true" dialog-class="modal-dialog-scrollable" hide-header-close>
      <template v-slot:modal-title="{ close }">
        Scrollable modal
        <b-button variant="white" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close()"></b-button>
      </template>
      <template v-slot:default>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="white" class="mr-auto" @click="close()">Close</b-button>
        <b-button variant="primary" @click="close()">Save changes</b-button>
      </template>

    </b-modal>

    <b-modal centered  size="lg" modal-class="modal-blur" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true" hide-header-close>
      <template v-slot:modal-title="{ close }">
        New report
        <b-button variant="white" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close()"></b-button>
      </template>
      <template v-slot:default>
        <!-- <div class="modal-body"> -->
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" name="example-text-input" placeholder="Your report name">
          </div>
          <label class="form-label">Report type</label>
          <div class="form-selectgroup-boxes row mb-3">
            <div class="col-lg-6">
              <label class="form-selectgroup-item">
                <input type="radio" name="report-type" value="1" class="form-selectgroup-input" checked>
                <span class="form-selectgroup-label d-flex align-items-center p-3">
                  <span class="mr-3">
                    <span class="form-selectgroup-check"></span>
                  </span>
                  <span class="form-selectgroup-label-content">
                    <span class="form-selectgroup-title strong mb-1">Simple</span>
                    <span class="d-block text-muted">Provide only basic data needed for the report</span>
                  </span>
                </span>
              </label>
            </div>
            <div class="col-lg-6">
              <label class="form-selectgroup-item">
                <input type="radio" name="report-type" value="1" class="form-selectgroup-input">
                <span class="form-selectgroup-label d-flex align-items-center p-3">
                  <span class="mr-3">
                    <span class="form-selectgroup-check"></span>
                  </span>
                  <span class="form-selectgroup-label-content">
                    <span class="form-selectgroup-title strong mb-1">Advanced</span>
                    <span class="d-block text-muted">Insert charts and additional advanced analyses to be inserted in the report</span>
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <div class="mb-3">
                <label class="form-label">Report url</label>
                <div class="input-group input-group-flat">
                  <span class="input-group-text">
                    https://tabler.io/reports/
                  </span>
                  <input type="text" class="form-control pl-0"  value="report-01">
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="mb-3">
                <label class="form-label">Visibility</label>
                <select class="form-select">
                  <option value="1" selected>Private</option>
                  <option value="2">Public</option>
                  <option value="3">Hidden</option>
                </select>
              </div>
            </div>
          </div>
        <!-- </div> -->
        <!-- <div class="modal-body"> -->
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Client name</label>
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Reporting period</label>
                <input type="date" class="form-control">
              </div>
            </div>
            <div class="col-lg-12">
              <div>
                <label class="form-label">Additional information</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="link secondary" @click="close()">Cancel</b-button>
        <b-button variant="primary" class="ml-auto" @click="close()">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Create new report
        </b-button>
      </template>

    </b-modal>

    <b-modal hide-header centered  size="sm" title="" modal-class="modal-blur" id="modal-info" tabindex="-1" role="dialog" aria-hidden="true" body-class="text-center py-5">
      <template v-slot:default>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-xl icon-thin mb-4 text-green" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></svg>
        <h3>Payment succedeed</h3>
        <div class="text-muted">Your payment of $290 has been successfully submitted. Your invoice has been sent to support@tabler.io.</div>
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button block variant="primary w-100" @click="close()">
          View invoice
        </b-button>
        <b-button block variant="white w-100" @click="close()">
          Go to dashboard
        </b-button>

      </template>

    </b-modal>

    <b-modal centered  modal-class="modal-blur" id="modal-team" tabindex="-1" role="dialog" aria-hidden="true" hide-header-close>
      <template v-slot:modal-title="{ close }">
        Add a new team
        <b-button variant="white" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close()"></b-button>
      </template>
      <template v-slot:default>
        <div class="row mb-3 align-items-end">
          <div class="col-auto">
            <a href="#" class="avatar avatar-upload rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              <span class="avatar-upload-text">Add</span>
            </a>
          </div>
          <div class="col">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Pick your team color</label>
          <div class="row row-sm">
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="dark" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-dark"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput form-colorinput-light">
                <input name="color" type="radio" value="white" class="form-colorinput-input"  checked/>
                <span class="form-colorinput-color bg-white"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="blue" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-blue"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="azure" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-azure"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="indigo" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-indigo"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="purple" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-purple"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="pink" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-pink"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="red" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-red"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="orange" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-orange"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="yellow" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-yellow"></span>
              </label>
            </div>
            <div class="col-auto">
              <label class="form-colorinput">
                <input name="color" type="radio" value="lime" class="form-colorinput-input" />
                <span class="form-colorinput-color bg-lime"></span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <label class="form-label">Additional info</label>
          <textarea class="form-control"></textarea>
        </div>
      </template>
      <template v-slot:modal-footer="{ close }">
        <b-button variant="white" class="mr-auto" @click="close()">
          Close
        </b-button>
        <b-button variant="primary" @click="close()">
          Add Team
        </b-button>
      </template>

    </b-modal>

  </q-page>
</template>

<script>
import Vue from 'vue'
import { BButton, BModal, VBModal } from 'bootstrap-vue'

Vue.directive('b-modal', VBModal)

export default {
  name: 'PageModals',
  components: { BButton, BModal }

}
</script>
