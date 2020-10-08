<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Empty page
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Carousel</h3>
          </div>
          <div class="card-body">
            <b-carousel
              id="carousel-default"
            >
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/1b73704b282a8ec6.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/6ab3200b14549f8a.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/6d35d9a2bd6c63c2.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/8a26974ee6444acd.jpg">
                </template>
              </b-carousel-slide>

            </b-carousel>

          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Carousel with indicators</h3>
          </div>
          <div class="card-body">
            <b-carousel
              id="carousel-indicators"
              indicators
            >
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/8c13ad59f739558c.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/8fdeb4785d2b82ef.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/9f36332564ca271d.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/35b88fc04a518c1b.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/36e273986ed577b8.jpg">
                </template>
              </b-carousel-slide>

            </b-carousel>

          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Carousel with controls</h3>
          </div>
          <div class="card-body">
            <b-carousel
              id="carousel-controls"
              controls
            >
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/75b555b99d5b38c4.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/546fd146c83f428c.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/802a16cdf5ce3551.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/0986f97be719fb9a.jpg">
                </template>
              </b-carousel-slide>

              <b-carousel-slide>
                <template v-slot:img>
                  <img class="d-block w-100" alt="" src="../static/photos/1194d63fe36a8670.jpg">
                </template>
              </b-carousel-slide>

            </b-carousel>

          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Carousel with captions</h3>
          </div>
          <div class="card-body">
            <b-carousel
              id="carousel-captions"
              controls
            >
              <b-carousel-slide
                caption="Slide label"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="../static/photos/1366fdc9b9b277e4.jpg"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Slide label"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="../static/photos/5358d787242861c4.jpg"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Slide label"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="../static/photos/5614ec7eb9034d04.jpg"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Slide label"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="../static/photos/56614e12b2a7bd68.jpg"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Slide label"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="../static/photos/77586f6ffa9fbc5e.jpg"
              ></b-carousel-slide>

            </b-carousel>

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageEmpty',

  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
