<template>
  <h1>npm drink</h1>
  <div v-if="loading">
    <loading></loading>
  </div>
  <p class="control has-addons">
    <input
      id="drinkput"
      class="input"
      type="text"
      placeholder="Noun"
      v-model="packageName"
      v-on:keyup.13="findPackage"
    >
    <a class="button is-info" v-on:click="findPackage" v-if="!loading">CHECK</a>
    <a class="button is-info is-loading is-disabled" v-if="loading">CHECK</a>
    <div v-if="!loading && youDrink">
      <p>
        <img v-bind:src="drink">
        <h2>YOU DRINK!!</h2>
      </p>
      <p>
        <h3><a href="https://npmjs.com/package/{{ npm.title }}" target="_blank">{{ npm.title }}</a></h3>
        <h4>{{ npm.summary }}</h4>
        <h4>{{ npm.stat }}</h4>
      </p>
    </div>
    <div v-if="!loading && youDrink === false">
      <p>
        <img v-bind:src="noDrink">
        <h4>{{ lastPackageName }}??</h4>
        <h2>NO DRINK</h2>
      </p>
      <p>
        <h3>SHAME ON YOU</h3>
      </p>
    </div>
    <div v-if="youDrink === null">
      <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Drinking game for npm users:<br>➀ Think of a noun<br>➁ npm install &lt;noun&gt;<br>➂ If it installs - drink!</p>&mdash; Sindre Sorhus (@sindresorhus) <a href="https://twitter.com/sindresorhus/status/515511151669805056">September 26, 2014</a></blockquote>
    </div>
  </p>
  <small><a href="https://github.com/sorapixels/npmdrink">npmdrink on Github</a></small>
</template>

<script>
import finder from './find-package';
import loading from './loading.vue';

export default {
  components: { loading },

  ready () {
    twttr.widgets.load();
  },

  data () {
    return {
      loading: false,
      youDrink: null,
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
      return `/static/images/drink-${Math.floor(Math.random() * 10 + 1)}.gif`;
    },
    noDrink () {
      return `/static/images/no-drink-${Math.floor(Math.random() * 5 + 1)}.gif`;
    }
  },
  methods: {
    onFinish() {
      this.loading = false;
      this.packageName = '';
    },

    findPackage () {
      this.$el.parentElement.querySelector('#drinkput').blur();
      this.loading = true;
      finder(this.packageName)
      .then(res => {
        this.youDrink = true
        this.npm.title = res.name;
        this.npm.summary = res.description;
        this.onFinish();
      })
      .catch(err => {
        this.youDrink = false;
        this.lastPackageName = this.packageName;
        this.onFinish();
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
