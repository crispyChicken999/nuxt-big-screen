<template>
  <div class="hexagon-group">
    <div class="hexagon-line" v-for="v in 5" :key="v">
      <div class="hexagon-item" v-for="i in 120" :key="i"></div>
    </div>
  </div>
</template>

<script>
let timer = null;
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.generateGlitch();
    timer = setInterval(() => {
      this.generateGlitch();
    }, 2000);
  },
  computed: {},
  methods: {
    generateGlitch() {
      const LINE_LIST = [...document.querySelectorAll(".hexagon-line")];
      LINE_LIST.forEach((line) => {
        const CHILD_LIST = [...line.children];
        CHILD_LIST.forEach((child) => {
          if (Math.random() > 0.5) {
            child.classList.add("bright");
          } else {
            child.classList.remove("bright");
          }
        });
      });
    },
  },
  beforeDestroy() {
    clearInterval(timer);
  },
};
</script>

<style lang="less" scoped>
.hexagon-group {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 0px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: center;
  align-content: space-around;
  content-visibility: auto;
  mask: -webkit-gradient(
    linear,
    right top,
    right bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );

  .hexagon-line {
    gap: 3px;
    display: flex;
    flex-wrap: nowrap;
    content-visibility: auto;
    &:nth-child(even) {
      position: relative;
      left: -30px;
    }
    &:nth-child(odd) {
      position: relative;
      left: -20px;
    }
    .hexagon-item {
      width: 20px;
      height: 22px;
      flex: 0 0 auto;
      transition: all 0.5s;
      background-color: #0a284a;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      // will-change: contents; // 最后的优化手段，浏览器已经很尽力了QAQ from mdn
      &.bright {
        background-color: #0b3f7e;
      }
    }
  }
}
</style>
