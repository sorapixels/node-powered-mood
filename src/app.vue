<template>
  <h1>npm powered mood</h1>
  <p class="control has-addons">
    <input class="input is-large" type="text" placeholder="Word">
    <a class="button is-info is-large">CHECK</a>
    <img src="/static/images/drink-1.gif">
  </p>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
body {
  font-family: 'Suez One';
  text-align: center;
}
h1 {
  font-size: 3em;
  margin: 1em 0 1em
}
.has-addons {
  justify-content: center;
  margin: 1em auto
}
</style>
