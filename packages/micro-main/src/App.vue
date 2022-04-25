<template>
  <div>
    <MainNav />
    <div class="sub-container">
      <div id="micro-container">子应用内容</div>
    </div>
  </div>
</template>

<script>
import MainNav from "./components/MainNav";

export default {
  name: 'App',
  components: {
    MainNav
  },
  setup () {
    return {
    }
  }
}
</script>

<style>
</style>
