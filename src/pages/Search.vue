<template>
  <q-page>
    <!-- Page title -->
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col-auto">
            <h2 class="page-title">
              Search results
            </h2>
          </div>
          <div class="col-auto">
            <div class="text-muted text-h5 mt-2">About 2,410 result (0.19 seconds)</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <form action="" method="get">
            <div class="subheader mb-2">Category</div>
            <div class="list-group list-group-transparent mb-3">
              <a class="list-group-item list-group-item-action d-flex align-items-center active" href="#">
                Games
                <small class="text-muted ml-auto">24</small>
              </a>
              <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
                Clothing
                <small class="text-muted ml-auto">149</small>
              </a>
              <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
                Jewelery
                <small class="text-muted ml-auto">88</small>
              </a>
              <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
                Toys
                <small class="text-muted ml-auto">54</small>
              </a>
            </div>
            <div class="subheader mb-2">Rating</div>
            <div class="mb-3">
              <label class="form-check mb-1">
                <input type="radio" class="form-check-input" name="form-stars" value="5 stars" checked>
                <span class="form-check-label">5 stars</span>
              </label>
              <label class="form-check mb-1">
                <input type="radio" class="form-check-input" name="form-stars" value="4 stars">
                <span class="form-check-label">4 stars</span>
              </label>
              <label class="form-check mb-1">
                <input type="radio" class="form-check-input" name="form-stars" value="3 stars">
                <span class="form-check-label">3 stars</span>
              </label>
              <label class="form-check mb-1">
                <input type="radio" class="form-check-input" name="form-stars" value="2 and less stars">
                <span class="form-check-label">2 and less stars</span>
              </label>
            </div>
            <div class="subheader mb-2">Tags</div>
            <div class="mb-3">
              <label class="form-check mb-1">
                <input type="checkbox" class="form-check-input" name="form-tags[]" value="business" checked>
                <span class="form-check-label">business</span>
              </label>
              <label class="form-check mb-1">
                <input type="checkbox" class="form-check-input" name="form-tags[]" value="evening">
                <span class="form-check-label">evening</span>
              </label>
              <label class="form-check mb-1">
                <input type="checkbox" class="form-check-input" name="form-tags[]" value="leisure">
                <span class="form-check-label">leisure</span>
              </label>
              <label class="form-check mb-1">
                <input type="checkbox" class="form-check-input" name="form-tags[]" value="party">
                <span class="form-check-label">party</span>
              </label>
            </div>
            <div class="subheader mb-2">Price</div>
            <div class="row row-sm align-items-center mb-3">
              <div class="col">
                <div class="input-group">
                  <span class="input-group-text">
                    $
                  </span>
                  <input type="text" class="form-control"  placeholder="from"  value="3">
                </div>
              </div>
              <div class="col-auto">—</div>
              <div class="col">
                <div class="input-group">
                  <span class="input-group-text">
                    $
                  </span>
                  <input type="text" class="form-control"  placeholder="to" >
                </div>
              </div>
            </div>
            <div class="subheader mb-2">Shipping</div>
            <div>
              <select name="" class="form-select">
                <option>United Kingdom</option>
                <option>USA</option>
                <option>Germany</option>
                <option>Poland</option>
                <option>Other…</option>
              </select>
            </div>
            <div class="mt-5">
              <button class="btn btn-primary btn-block">
                Confirm changes
              </button>
              <a href="#" class="btn btn-link btn-block">
                Reset to defaults
              </a>
            </div>
          </form>
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/1b73704b282a8ec6.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/000m.jpg)"></span>
                    <div class="lh-sm">
                      <div>Paweł Kuna</div>
                      <div class="text-muted">3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/3d2998219313cd37.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/002m.jpg)"></span>
                    <div class="lh-sm">
                      <div>Mallory Hulme</div>
                      <div class="text-muted">yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/6ab3200b14549f8a.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/000f.jpg)"></span>
                    <div class="lh-sm">
                      <div>Emmy Levet</div>
                      <div class="text-muted">5 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/6d35d9a2bd6c63c2.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded">EP</span>
                    <div class="lh-sm">
                      <div>Egan Poetz</div>
                      <div class="text-muted">6 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/8a26974ee6444acd.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/006m.jpg)"></span>
                    <div class="lh-sm">
                      <div>Lorry Mion</div>
                      <div class="text-muted">5 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/8c13ad59f739558c.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/004f.jpg)"></span>
                    <div class="lh-sm">
                      <div>Leesa Beaty</div>
                      <div class="text-muted">6 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/8fdeb4785d2b82ef.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded">SA</span>
                    <div class="lh-sm">
                      <div>Sunny Airey</div>
                      <div class="text-muted">5 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/9f36332564ca271d.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/009m.jpg)"></span>
                    <div class="lh-sm">
                      <div>Geoffry Flaunders</div>
                      <div class="text-muted">1 week ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/35b88fc04a518c1b.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/010m.jpg)"></span>
                    <div class="lh-sm">
                      <div>Thatcher Keel</div>
                      <div class="text-muted">1 week and 2 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/36e273986ed577b8.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/005f.jpg)"></span>
                    <div class="lh-sm">
                      <div>Dyann Escala</div>
                      <div class="text-muted">4 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/75b555b99d5b38c4.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/006f.jpg)"></span>
                    <div class="lh-sm">
                      <div>Avivah Mugleston</div>
                      <div class="text-muted">6 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <a href="#" class="d-block"><img src="../static/photos/546fd146c83f428c.jpg" class="card-img-top"></a>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar mr-3 rounded" style="background-image: url(../static/avatars/008f.jpg)"></span>
                    <div class="lh-sm">
                      <div>Tessie Curzon</div>
                      <div class="text-muted">3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageEmpty'
}
</script>
