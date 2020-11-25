<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Blog
          </h2>
        </div>
      </div>
    </div>
    <div class="row row-cards">
      <div class="col-sm-6 col-xl-4">
        <t-blog-card />
        <!-- <div class="card d-flex flex-column">
          <a href="#">
            <img class="card-img-top" src="../static/photos//9f36332564ca271d.jpg" alt="And this isn&#39;t my nose. This is a false one.">
          </a>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title"><a href="#">And this isn't my nose. This is a false one.</a></h3>
            <div class="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr...</div>
            <div class="d-flex align-items-center pt-5 mt-auto">
              <span class="avatar avatar-md" style="background-image: url(../static/avatars/002m.jpg)"></span>
              <div class="ml-3">
                <a href="./profile.html" class="text-body">Dunn Slane</a>
                <small class="d-block text-muted">3 days ago</small>
              </div>
              <div class="ml-auto">
                <a href="#" class="icon d-none d-md-inline-block ml-3 text-red">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-sm-6 col-xl-4">
        <div class="card d-flex flex-column">
          <a href="#">
            <img class="card-img-top" src="../static/photos//35b88fc04a518c1b.jpg" alt="Well, I didn&#39;t vote for you.">
          </a>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title"><a href="#">Well, I didn't vote for you.</a></h3>
            <div class="text-muted">Well, we did do the nose. Why? Shut up! Will you shut up?! You don't frighten us, English pig-dog...</div>
            <div class="d-flex align-items-center pt-5 mt-auto">
              <span class="avatar avatar-md" style="background-image: url(../static/avatars/003m.jpg)"></span>
              <div class="ml-3">
                <a href="./profile.html" class="text-body">Emmy Levet</a>
                <small class="d-block text-muted">3 days ago</small>
              </div>
              <div class="ml-auto">
                <a href="#" class="icon d-none d-md-inline-block ml-3 text-red">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-4">
        <div class="card d-flex flex-column">
          <a href="#">
            <img class="card-img-top" src="../static/photos//36e273986ed577b8.jpg" alt="How do you know she is a witch?">
          </a>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title"><a href="#">How do you know she is a witch?</a></h3>
            <div class="text-muted">Are you suggesting that coconuts migrate? No, no, no! Yes, yes. A bit. But she's got a wart. You ...</div>
            <div class="d-flex align-items-center pt-5 mt-auto">
              <span class="avatar avatar-md" style="background-image: url(../static/avatars/000f.jpg)"></span>
              <div class="ml-3">
                <a href="./profile.html" class="text-body">Maryjo Lebarree</a>
                <small class="d-block text-muted">3 days ago</small>
              </div>
              <div class="ml-auto">
                <a href="#" class="icon d-none d-md-inline-block ml-3 text-red">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-4">
        <t-blog-card
          author="Perren Keemar"
          author-avatar="../static/avatars/004f.jpg"
          body="Please do not offer my god a peanut. That's why I love elementary school, Edna. The children beli..."
          title="Weaseling out of things is important to learn."
          :card-options="{}"
          action-class="icon d-none d-md-inline-block ml-3 text-muted"
        />
        <!-- <div class="card d-flex flex-column">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title"><a href="#">Weaseling out of things is important to learn.</a></h3>
            <div class="text-muted">Please do not offer my god a peanut. That's why I love elementary school, Edna. The children beli...</div>
            <div class="d-flex align-items-center pt-5 mt-auto">
              <span class="avatar avatar-md" style="background-image: url(../static/avatars/004f.jpg)"></span>
              <div class="ml-3">
                <a href="./profile.html" class="text-body">Perren Keemar</a>
                <small class="d-block text-muted">3 days ago</small>
              </div>
              <div class="ml-auto">
                <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-sm-6 col-xl-4">
        <div class="card d-flex flex-column">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title"><a href="#">You don't like your job, you don't strike.</a></h3>
            <div class="text-muted">But, Aquaman, you cannot marry a woman without gills. You're from two different worlds… Oh, I've ...</div>
            <div class="d-flex align-items-center pt-5 mt-auto">
              <span class="avatar avatar-md" style="background-image: url(../static/avatars/007m.jpg)"></span>
              <div class="ml-3">
                <a href="./profile.html" class="text-body">Sunny Airey</a>
                <small class="d-block text-muted">3 days ago</small>
              </div>
              <div class="ml-auto">
                <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-4">
        <t-blog-card
          author="Geoffry Flaunders"
          :author-avatar="false"
          body="I don't like being outdoors, Smithers. For one thing, there's too many fat children. Oh, loneline..."
          title="I hope I didn't brain my damage"
          :card-options="{}"
          action-class="icon d-none d-md-inline-block ml-3 text-muted"
        />
        <!-- <div class="card d-flex flex-column">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title"><a href="#">I hope I didn't brain my damage</a></h3>
            <div class="text-muted">I don't like being outdoors, Smithers. For one thing, there's too many fat children. Oh, loneline...</div>
            <div class="d-flex align-items-center pt-5 mt-auto">
              <span class="avatar avatar-md">SA</span>
              <div class="ml-3">
                <a href="./profile.html" class="text-body">Geoffry Flaunders</a>
                <small class="d-block text-muted">3 days ago</small>
              </div>
              <div class="ml-auto">
                <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-sm-6">
        <t-horizontal-blog-card />
        <!-- <div class="card d-flex flex-column">
          <div class="row row-0 flex-fill">
            <div class="col-md-3">
              <a href="#">
                <img src="../static/photos//9f36332564ca271d.jpg" class="w-100 h-100 object-cover" alt="Card side image">
              </a>
            </div>
            <div class="col">
              <div class="card-body">
                <h3 class="card-title"><a href="#">And this isn't my nose. This is a false one.</a></h3>
                <div class="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr...</div>
                <div class="d-flex align-items-center pt-5 mt-auto">
                  <span class="avatar avatar-md" style="background-image: url(../static/avatars/002m.jpg)"></span>
                  <div class="ml-3">
                    <a href="./profile.html" class="text-body">Dunn Slane</a>
                    <small class="d-block text-muted">3 days ago</small>
                  </div>
                  <div class="ml-auto">
                    <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-sm-6">
        <t-horizontal-blog-card
          author="Emmy Levet"
          author-avatar="../static/avatars/003m.jpg"
          body="Well, we did do the nose. Why? Shut up! Will you shut up?! You don't frighten us, English pig-dog..."
          title="Well, I didn't vote for you."
          :card-options="{
            'img-src': '../static/photos//35b88fc04a518c1b.jpg',
            'img-alt': 'Card side image'
          }"
          action-class="icon d-none d-md-inline-block ml-3 text-muted"
        />
        <!-- <div class="card d-flex flex-column">
          <div class="row row-0 flex-fill">
            <div class="col-md-3">
              <a href="#">
                <img src="../static/photos//35b88fc04a518c1b.jpg" class="w-100 h-100 object-cover" alt="Card side image">
              </a>
            </div>
            <div class="col">
              <div class="card-body">
                <h3 class="card-title"><a href="#">Well, I didn't vote for you.</a></h3>
                <div class="text-muted">Well, we did do the nose. Why? Shut up! Will you shut up?! You don't frighten us, English pig-dog...</div>
                <div class="d-flex align-items-center pt-5 mt-auto">
                  <span class="avatar avatar-md" style="background-image: url(../static/avatars/003m.jpg)"></span>
                  <div class="ml-3">
                    <a href="./profile.html" class="text-body">Emmy Levet</a>
                    <small class="d-block text-muted">3 days ago</small>
                  </div>
                  <div class="ml-auto">
                    <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-sm-6">
        <div class="card d-flex flex-column">
          <div class="row row-0 flex-fill">
            <div class="col-md-3">
              <a href="#">
                <img src="../static/photos//802a16cdf5ce3551.jpg" class="w-100 h-100 object-cover" alt="Card side image">
              </a>
            </div>
            <div class="col">
              <div class="card-body">
                <h3 class="card-title"><a href="#">Weaseling out of things is important to learn.</a></h3>
                <div class="text-muted">Please do not offer my god a peanut. That's why I love elementary school, Edna. The children believe anything you tell them. Brace yourselves gentlemen. According to the gas chromatograph, the secr...</div>
                <div class="d-flex align-items-center pt-5 mt-auto">
                  <span class="avatar avatar-md" style="background-image: url(../static/avatars/004f.jpg)"></span>
                  <div class="ml-3">
                    <a href="./profile.html" class="text-body">Perren Keemar</a>
                    <small class="d-block text-muted">3 days ago</small>
                  </div>
                  <div class="ml-auto">
                    <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card d-flex flex-column">
          <div class="row row-0 flex-fill">
            <div class="col-md-3">
              <a href="#">
                <img src="../static/photos//0986f97be719fb9a.jpg" class="w-100 h-100 object-cover" alt="Card side image">
              </a>
            </div>
            <div class="col">
              <div class="card-body">
                <h3 class="card-title"><a href="#">You don't like your job, you don't strike.</a></h3>
                <div class="text-muted">But, Aquaman, you cannot marry a woman without gills. You're from two different worlds… Oh, I've wasted my life. Son, when you participate in sporting events, it's not whether you win or lose: it's...</div>
                <div class="d-flex align-items-center pt-5 mt-auto">
                  <span class="avatar avatar-md" style="background-image: url(../static/avatars/007m.jpg)"></span>
                  <div class="ml-3">
                    <a href="./profile.html" class="text-body">Sunny Airey</a>
                    <small class="d-block text-muted">3 days ago</small>
                  </div>
                  <div class="ml-auto">
                    <a href="#" class="icon d-none d-md-inline-block ml-3 text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                    </a>
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
import TBlogCard from 'components/TBlogCard'
import THorizontalBlogCard from 'components/THorizontalBlogCard'

export default {
  name: 'PageBlog',
  components: { TBlogCard, THorizontalBlogCard }
}
</script>
