<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Profile
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="mb-3">Emmy Levet</h2>
            <p class="mb-4">
              Big belly rude boy, million dollar hustler. Unemployed.
            </p>
            <button class="btn btn-outline-primary btn-sm">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon" fill="currentColor"><path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z"/></svg>
              Follow
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="media">
              <span class="avatar avatar-xl" style="background-image: url(./static/avatars/002f.jpg)"></span>
              <div class="media-body ml-4">
                <h3>Flossi Uttley</h3>
                <p class="text-muted mb-0">Engineer I</p>
                <ul class="social-links list-inline mb-0 mt-2">
                  <li class="list-inline-item">
                    <a href="#" title="Facebook" data-toggle="tooltip">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon" fill="currentColor"><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/></svg>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" title="Twitter" data-toggle="tooltip">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon" fill="currentColor"><path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z"/></svg>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" title="1234567890" data-toggle="tooltip">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M4 4h5l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v5a1 1 0 0 1 -1 1a16 16 0 0 1 -16 -16a1 1 0 0 1 1 -1" /></svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">My Profile</h3>
          </div>
          <div class="card-body">
            <form>
              <div class="row mb-3">
                <div class="col-auto">
                  <span class="avatar avatar-lg" style="background-image: url(static/avatars/004f.jpg)"></span>
                </div>
                <div class="col">
                  <div class="mb-2">
                    <label class="form-label">Email-Address</label>
                    <input class="form-control" placeholder="your-email@domain.com"/>
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label">Bio</label>
                <textarea class="form-control" rows="5">Big belly rude boy, million dollar hustler. Unemployed.</textarea>
              </div>
              <div class="mb-2">
                <label class="form-label">Email-Address</label>
                <input class="form-control" placeholder="your-email@domain.com"/>
              </div>
              <div class="mb-2">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" value="password"/>
              </div>
              <div class="form-footer">
                <button class="btn btn-primary btn-block">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Message">
              <a href="#" class="btn btn-white btn-icon" aria-label="Button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><circle cx="12" cy="13" r="3" /></svg>
              </a>
            </div>
          </div>
          <ul class="list-group card-list-group">
            <li class="list-group-item py-4">
              <div class="d-flex">
                <div>
                  <span class="avatar mr-3" style="background-image: url(./static/avatars/000f.jpg)"></span>
                </div>
                <div class="flex-fill">
                  <div>
                    <small class="float-right text-muted">4 min</small>
                    <h4>Emmy Levet</h4>
                  </div>
                  <div>
                    Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras
                    justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus.
                  </div>
                  <ul class="list-unstyled">
                    <li class="d-flex mt-4">
                      <div>
                        <span class="avatar mr-3" style="background-image: url(./static/avatars/002f.jpg)"></span>
                      </div>
                      <div class="flex-fill">
                        <strong>Kellie Skingley: </strong>
                        Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus
                        auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                      </div>
                    </li>
                    <li class="d-flex mt-4">
                      <div>
                        <span class="avatar mr-3">HS</span>
                      </div>
                      <div class="flex-fill">
                        <strong>Haskel Shelper: </strong>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
                        amet risus.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="list-group-item py-4">
              <div class="d-flex">
                <div>
                  <span class="avatar mr-3" style="background-image: url(./static/avatars/006m.jpg)"></span>
                </div>
                <div class="flex-fill">
                  <div>
                    <small class="float-right text-muted">12 min</small>
                    <h4>Lorry Mion</h4>
                  </div>
                  <div>
                    Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item py-4">
              <div class="d-flex">
                <div>
                  <span class="avatar mr-3" style="background-image: url(./static/avatars/009m.jpg)"></span>
                </div>
                <div class="flex-fill">
                  <div>
                    <small class="float-right text-muted">34 min</small>
                    <h4>Geoffry Flaunders</h4>
                  </div>
                  <div>
                    Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                    venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                  </div>
                  <ul class="list-unstyled">
                    <li class="d-flex mt-4">
                      <div>
                        <span class="avatar mr-3" style="background-image: url(./static/avatars/001f.jpg)"></span>
                      </div>
                      <div class="flex-fill">
                        <strong>Maryjo Lebarree: </strong>
                        Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus
                        auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <form class="card">
          <div class="card-body">
            <h3 class="card-title">Edit Profile</h3>
            <div class="row">
              <div class="col-md-5">
                <div class="mb-2">
                  <label class="form-label">Company</label>
                  <input type="text" class="form-control" disabled="" placeholder="Company" value="Creative Code Inc.">
                </div>
              </div>
              <div class="col-sm-6 col-md-3">
                <div class="mb-2">
                  <label class="form-label">Username</label>
                  <input type="text" class="form-control" placeholder="Username" value="michael23">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-2">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" placeholder="Email">
                </div>
              </div>
              <div class="col-sm-6 col-md-6">
                <div class="mb-2">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" placeholder="Company" value="Chet">
                </div>
              </div>
              <div class="col-sm-6 col-md-6">
                <div class="mb-2">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" placeholder="Last Name" value="Faker">
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-2">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" placeholder="Home Address" value="Melbourne, Australia">
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="mb-2">
                  <label class="form-label">City</label>
                  <input type="text" class="form-control" placeholder="City" value="Melbourne">
                </div>
              </div>
              <div class="col-sm-6 col-md-3">
                <div class="mb-2">
                  <label class="form-label">Postal Code</label>
                  <input type="number" class="form-control" placeholder="ZIP Code">
                </div>
              </div>
              <div class="col-md-5">
                <div class="mb-2">
                  <label class="form-label">Country</label>
                  <select class="form-select">
                    <option value="">Germany</option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-2 mb-0">
                  <label class="form-label">About Me</label>
                  <textarea rows="5" class="form-control" placeholder="Here can be your description" value="Mike">Oh so, your weak rhyme
You doubt I'll bother, reading into it
I'll probably won't, left to my own devices
But that's the difference in our opinions.</textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-right">
            <button type="submit" class="btn btn-primary">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageEmpty'
}
</script>
