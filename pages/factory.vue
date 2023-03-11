<template>
  <div class="data-center">
    <client-only>
      <v-scale-screen width="2560" height="1440">
        <div class="loading-container" v-if="isLoading">
          <dv-loading>正在加载中...</dv-loading>
        </div>
        <template v-else>
          <top-header>染色智能工厂</top-header>
          <factory-content></factory-content>
        </template>
      </v-scale-screen>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "factoryPage",
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.data-center {
  color: #fff;
  width: 100%;
  height: 100%;

  .loading-container {
    height: 100%;
    .dv-loading {
      height: 100%;
      gap: 20px;
      background: transparent;
      /deep/.loading-tip {
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 5px;
      }
    }
  }
  .screen-box {
    background-size: cover;
    background-image: url("~assets/imgs/bg.png");
  }

  #dv-full-screen-container {
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-image: url("~assets/imgs/bg.png");
  }
}
</style>
