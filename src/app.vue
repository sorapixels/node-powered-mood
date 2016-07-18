<template>
  <h1>npm powered mood</h1>
  <p class="control has-addons">
    <input class="input" type="text" placeholder="Noun">
    <a class="button is-info">CHECK</a>
    <div v-if="youDrink">
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
    <div v-if="!youDrink">
      <p>
        <img v-bind:src="noDrink">
        <h2>NO DRINK</h2>
      </p>
      <p>
        <h3>SHAME ON YOU</h3>
      </p>
  </p>
</template>

<script>
export default {
  data () {
    return {
      youDrink: false,
      npm: {
        title: 'browserify',
        summary: 'browser-side require() the node way',
        stat: '2,182,692 downloads in the last month'
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
</style>
