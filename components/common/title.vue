<template>
  <div class="data-title">
    <h2><slot></slot></h2>
    <dv-decoration-2 :color="['#0E65BB']" style="" :dur="3" />
    <dv-decoration-3 />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.data-title {
  position: relative;
  h2 {
    font-size: 24px;
    font-weight: 500;
    color: #2d99ff;
    margin-bottom: 10px;
    width: fit-content;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      bottom: -17.5px;
      background-color: #2d99ff;
    }
  }
  .dv-decoration-2 {
    width: 100%;
    height: 10px;
  }
  .dv-decoration-3 {
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
    height: 30px;
  }
}
</style>
