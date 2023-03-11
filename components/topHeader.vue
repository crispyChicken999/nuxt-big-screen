<template>
  <div id="top-header">
    <common-hexagon></common-hexagon>
    <dv-decoration-8
      class="header-left-decoration"
      :color="['#00e5ff', '#2962ff']"
    />
    <dv-decoration-5
      class="header-center-decoration"
      :color="['#00e5ff', '#2962ff']"
    />
    <dv-decoration-8
      class="header-right-decoration"
      :color="['#00e5ff', '#2962ff']"
      :reverse="true"
    />
    <div class="center-title"><slot></slot></div>
    <common-time></common-time>
    <el-button
      class="return"
      v-if="$route.path !== '/'"
      @click="$router.push('/')"
      >返回首页</el-button
    >
    <el-button class="normal" @click="$router.push('/factory')"
      >染色智能工厂</el-button
    >
    <el-button class="is-reverse" @click="$router.push('/theory')"
      >智能工厂原理</el-button
    >
    <el-button
      title="点击全屏/取消全屏"
      class="fullscreen"
      @click="switchFullScreen"
      ><i class="el-icon-full-screen"></i
    ></el-button>
    <dv-decoration-10 :color="['#00e5ff', '#2962ff']" />
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      isFullScreen: this.isFullscreenForNoScroll(),
    };
  },
  methods: {
    isFullscreenForNoScroll() {
      var explorer = window.navigator.userAgent.toLowerCase();
      if (explorer.indexOf("chrome") > 0) {
        //webkit
        if (
          document.body.scrollHeight === window.screen.height &&
          document.body.scrollWidth === window.screen.width
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        //IE 9+ fireFox
        if (
          window.outerHeight === window.screen.height &&
          window.outerWidth === window.screen.width
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    switchFullScreen() {
      let isFullScreen = this.isFullscreenForNoScroll();
      if (isFullScreen) {
        if (document.exitFullScreen) {
          document.exitFullscreen();
        }
        //兼容火狐
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
        //兼容谷歌等
        if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        //兼容IE
        if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (document.documentElement.RequestFullScreen) {
          document.documentElement.RequestFullScreen();
        }
        //兼容火狐
        if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        }
        //兼容IE,只能写msRequestFullscreen
        if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      }
    },
  },
};
</script>

<style lang="less">
#top-header {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  // background: url("~assets/imgs/header-bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  // animation: glow 3s ease-in-out infinite forwards;
  position: relative;
  transition: all 0.3s;

  @keyframes glow {
    0% {
      filter: saturate(1);
    }
    50% {
      filter: saturate(3) contrast(1) brightness(1.2) hue-rotate(15deg);
    }
    100% {
      filter: saturate(1);
    }
  }
  .hexagon-group {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 60px;
  }

  .center-title {
    position: absolute;
    letter-spacing: 5px;
    left: 50%;
    top: 15px;
    font-size: 38px;
    font-weight: 300;
    transform: translateX(-50%);
  }

  .my-timer {
    position: absolute;
    bottom: 8px;
    right: 12px;
  }

  .el-button {
    position: absolute;
    top: 42%;
    left: 22%;
    width: 200px;
    border: none;
    display: flex;
    font-size: 20px;
    font-weight: 300;
    color: #ffffff65;
    align-items: center;
    letter-spacing: 2px;
    transition: all 0.3s;
    background: #1d6fd5;
    justify-content: center;
    transform: skewX(30deg);
    box-shadow: 0 0 0.2rem #0b43ac, 0 0 0.2rem #0b43ac, 0 0 2rem #0b43ac,
      0 0 0.8rem #0b43ac, 0 0 2.8rem #0b43ac, inset 0 0 1.3rem #0b43ac;
    span {
      display: inline-block;
      transform: skewX(-30deg);
    }
    &:hover {
      color: #fff;
      background: #2884f4;
      box-shadow: 0 0 0.2rem #1967f8, 0 0 0.2rem #1967f8, 0 0 2rem #1967f8,
        0 0 0.8rem #1967f8, 0 0 2.8rem #1967f8, inset 0 0 1.3rem #1967f8;
    }
    &.return {
      left: 14%;
    }
    &.is-reverse {
      left: initial;
      right: 22%;
      transform: skewX(-30deg);
      span {
        display: inline-block;
        transform: skewX(30deg);
      }
    }
    &.fullscreen {
      left: initial;
      right: 19.5%;
      width: 50px;
      transform: skewX(-30deg);
      span {
        display: inline-block;
        transform: skewX(30deg);
      }
    }
  }

  .dv-decoration-10 {
    position: absolute;
    width: 100%;
    height: 5px;
    bottom: 0;
  }
}
</style>
