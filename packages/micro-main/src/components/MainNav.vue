<template>
  <div class="main-nav-container">
    <div class="main-nav-content">
      <!-- 导航列表详情 -->
      <div class="main-nav-list">
        <div
          v-for="(item, index) in NAV_LIST"
          :class="{ 'main-nav-active': currentIndex === index }"
          :key="index"
          @click="setCurrentIndex(item, index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { NAV_LIST } from '../const/nav'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'MainNav',
  setup() {
    const router = useRouter()
    const route = useRoute()

    watch(route, (val) => {
      for (let i = 0; i < NAV_LIST.length; i++) {
        if (val.fullPath.indexOf(NAV_LIST[i].url) !== -1) {
          currentIndex.value = i
        }
      }

    }, { deep: true })

    const currentIndex = ref(0)

    const searchStatus = ref(true)
    const setCurrentIndex = (data, index) => {
      if (data.url  === route.fullPath) {
        return
      }
      currentIndex.value = index
      router.push(data.url)
    }

    const setSearchStatus = (type) => {
      searchStatus.value = type
    }
    return {
      NAV_LIST,
      currentIndex,
      setCurrentIndex,
      searchStatus,
      setSearchStatus
    }
  }
}
</script>
<style lang="scss" scoped>
* img{
  width: 100%;
  height: 100%;
}
.main-nav{
  &-content{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  &-container{
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, #3C6AFB 0%, #75CDFF 100%);
  }
  &-logo{
    width: 108px;
    height: 48px;
    opacity: 0;
  }
  &-list{
    margin: 0 136px 0 132px;
    font-size: 24px;
    font-weight: bold;
    color: #FFFFFF;
    display: flex;
    height: 100%;
    user-select: none;

    &>div{
      position: relative;
      margin-right: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    &>div:last-child{
      margin-right: 0;
    }
  }
  &-active:after{
    content: '';
    width: 100%;
    height: 8px;
    background: #F7B500;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
