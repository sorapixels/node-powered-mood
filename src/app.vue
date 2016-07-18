<template>
  <h1>npm powered mood</h1>
  <p class="control has-addons">
    <input class="input" type="text" placeholder="Noun" v-model="packageName">
    <a class="button is-info" v-on:click="findPackage">CHECK</a>
    <div v-if="youDrink === true">
      <p>
        <img v-bind:src="drink">
        <h2>YOU DRINK!!</h2>
      </p>
      <p>
        <h3>{{ npm.title }}</h3>
        <h4>{{ npm.summary }}</h4>
        <h4>{{ npm.stat }}</h4>
      </p>
    </div>
    <div v-if="youDrink === false">
      <p>
        <img v-bind:src="noDrink">
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
  <small><a href="https://sorapixels.com">Sorapixels</a></small>
</template>

<script>
import finder from './find-package';

export default {
  data () {
    return {
      youDrink: null,
      packageName: 'hello',
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
    findPackage () {
      finder(this.packageName)
      .then(res => {
        this.youDrink = true
        this.npm.title = res.name;
        this.npm.summary = res.description;
      })
      .catch(err => {
        this.youDrink = false;
      });
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
  margin-top: 12px;
  display: inline-block;
}
.twitter-tweet.twitter-tweet-rendered {
  margin: 0 auto;
}
</style>
