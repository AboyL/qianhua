<template>
  <div>
    <MainNav />
    <div class="sub-container">
      <Loading v-show="loading" />
      <div v-show="!loading" id="micro-container">子应用内容</div>
    </div>
  </div>
</template>

<script>
import MainNav from "./components/MainNav";
import Loading from "./components/Loading";
import { loading } from './store'

export default {
  name: 'App',
  components: {
    MainNav,
    Loading
  },
  setup () {
    return {
      loading: loading.loadingStatus
    }
  }
}
</script>

<style>
</style>
