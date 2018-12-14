<template>
  <h1>npm drink</h1>
  <div v-if="loading">
    <loading></loading>
  </div>

  <div class="control has-addons">
    <input
      id="drinkput"
      class="input"
      type="text"
      placeholder="Noun"
      autocapitalize="none"
      v-model="packageName"
      v-on:keyup.13="findPackage" />
    <a class="button is-info" v-on:click="findPackage" v-if="!loading">CHECK</a>
    <a class="button is-info is-loading is-disabled" v-if="loading">CHECK</a>
  </div>

  <div v-if="state === 'drink'">
    <div>
      <img v-bind:src="drink">
      <h2>YOU DRINK!!</h2>
    </div>
    <div class="description">
      <h3><a href="https://npmjs.com/package/{{ npm.title }}" target="_blank">{{ npm.title }}</a></h3>
      <h4>{{ npm.summary }}</h4>
    </div>
  </div>

  <div v-if="state === 'no-drink'">
    <div>
      <img v-bind:src="noDrink">
      <h4>{{ lastPackageName }}??</h4>
      <h2>NO DRINK</h2>
    </div>
    <div>
      <h3>SHAME ON YOU</h3>
    </div>
  </div>

  <div v-if="state === 'initial'">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Drinking game for npm users:<br>➀ Think of a noun<br>➁ npm install &lt;noun&gt;<br>➂ If it installs - drink!</p>&mdash; Sindre Sorhus (@sindresorhus) <a href="https://twitter.com/sindresorhus/status/515511151669805056">September 26, 2014</a></blockquote>
  </div>

  <div v-if="state === 'error'">
    <p>
      <h3>An error occured, sorry for the inconvenience</h3>
    </p>
  </div>

  <small><a href="https://github.com/sorapixels/npmdrink">npmdrink on Github</a></small>
</template>

<script>
import axios from 'axios';
import loading from './loading.vue';

export default {
  components: { loading },

  ready () {
    twttr.widgets.load();
  },

  data () {
    return {
      state: 'initial',
      drinkImageIndex: 1,
      noDrinkImageIndex: 1,
      packageName: '',
      lastPackageName: '',
      npm: {
        title: null,
        summary: null
      }
    }
  },
  computed: {
    drink () {
      return `/static/images/drink-${this.drinkImageIndex}.gif`;
    },
    noDrink () {
      return `/static/images/no-drink-${this.noDrinkImageIndex}.gif`;
    },
    loading() {
      return this.state === 'loading';
    }
  },
  methods: {
    findPackage () {
      this.$el.parentElement.querySelector('#drinkput').blur();
      this.state = 'loading';

      axios.get(`https://api.npms.io/v2/package/${this.packageName}`.toLowerCase())
      .then(res => {
        this.state = 'drink';
        this.npm.title = res.data.collected.metadata.name;
        this.npm.summary = res.data.collected.metadata.description;
        this.drinkImageIndex = Math.floor(Math.random() * 10 + 1);
        this.packageName = '';
      })
      .catch(err => {
        this.lastPackageName = this.packageName;
        this.packageName = '';
        if (!err.response || err.response.status !== 404) {
          this.state = 'error';
          return;
        }
        this.noDrinkImageIndex = Math.floor(Math.random() * 5 + 1);
        this.state = 'no-drink';
      })
    }
  }
}
</script>

<style>
body {
  font-family: 'Suez One';
  text-align: center;
}
.has-addons.control {
  justify-content: center;
  margin: 1em auto 3em;
}
h1 {
  font-size: 7vw;
  margin: 1em 0 1em
}
h2 {
  font-size: 10vw;
}
h3 {
  font-size: 5vw;
}
h4 {
  font-size: 3vw;
}
small, small a {
  color: #ccc;
  font-size: 3vw;
  margin-top: 1.5em;
  display: inline-block;
}
.twitter-tweet.twitter-tweet-rendered {
  margin: 0 auto;
}

.description {
  padding: 0 5%;
}

@media (min-width: 768px) {
  h1 {
    font-size: 5em;
    margin: 0.5em 0;
  }

  h2 {
    font-size: 8em;
  }

  small, small a {
    font-size: 1.5em;
  }
}
</style>
