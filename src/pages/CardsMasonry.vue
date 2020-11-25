<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">
            Cards Masonry
          </h2>
        </div>
      </div>
    </div>
    <div class="row row-cards" data-masonry='{"percentPosition": true }'>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <p>This is some text within a card body.</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Card with bottom image</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
          <div class="card-img-bottom img-responsive img-responsive-16by9" style="background-image: url(../static/photos/56614e12b2a7bd68.jpg)"></div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
          <!-- Card footer -->
          <div class="card-footer">
            <div class="row align-items-center">
              <div class="col-auto">
                <a href="#">More information</a>
              </div>
              <div class="col-auto ml-auto">
                <label class="form-check form-switch m-0">
                  <input class="form-check-input position-static" type="checkbox" checked>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
          <!-- Card footer -->
          <div class="card-footer">
            <div class="row align-items-center">
              <div class="col-auto ml-auto">
                <div class="avatar-list avatar-list-stacked">
                  <span class="avatar avatar-sm avatar-rounded" style="background-image: url(../static/avatars/000m.jpg)"></span>
                  <span class="avatar avatar-sm avatar-rounded">JL</span>
                  <span class="avatar avatar-sm avatar-rounded" style="background-image: url(../static/avatars/002m.jpg)"></span>
                  <span class="avatar avatar-sm avatar-rounded" style="background-image: url(../static/avatars/003m.jpg)"></span>
                  <span class="avatar avatar-sm avatar-rounded" style="background-image: url(../static/avatars/000f.jpg)"></span>
                  <span class="avatar avatar-sm avatar-rounded">+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Active
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                  Disabled
                </a>
              </li>
              <li class="nav-item ml-auto">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Active
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                  Disabled
                </a>
              </li>
              <li class="nav-item ml-auto">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="empty">
            <div class="empty-img"><img src="../static/illustrations/undraw_quitting_time_dm8t.svg" height="128"  alt="">
            </div>
            <p class="empty-title">No results found</p>
            <p class="empty-subtitle text-muted">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div class="empty-action">
              <a href="./." class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15" y2="15" /></svg>
                Search again
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Card with progress bar</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
          <div class="progress progress-sm card-progress">
            <div class="progress-bar" style="width: 38%" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
              <span class="visually-hidden">38% Complete</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="card-subtitle">Card subtitle</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Header title</h3>
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
              neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <div class="form-label">Card number</div>
              <input type="text" name="input-mask" class="form-control" data-mask="0000 0000 0000 0000" data-mask-visible="true" autocomplete="off"/>
            </div>
            <div class="mb-3">
              <div class="form-label">Card name</div>
              <input type="text" class="form-control">
            </div>
            <div class="row">
              <div class="col-8">
                <div class="mb-3">
                  <label class="form-label">Expiration date</label>
                  <div class="row g-2">
                    <div class="col">
                      <select class="form-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div class="col">
                      <select class="form-select">
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <div class="form-label">CVV</div>
                  <input type="number" class="form-control">
                </div>
              </div>
            </div>
            <div class="mt-2">
              <a href="#" class="btn btn-primary w-100">
                Pay now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import Masonry from 'masonry-layout'

export default {
  name: 'PageCards',

  mounted: function () {
    let msnry = new Masonry('.row-cards', {'percentPosition': true })
  }
}
</script>
