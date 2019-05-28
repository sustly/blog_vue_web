<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>

  import Footer from "./components/Footer"
  import Header from "./components/Header"

export default {
  name: 'App',
  components:{
    "app-header":Header,
    "app-footer":Footer
  }
}
</script>

<style>

</style>
