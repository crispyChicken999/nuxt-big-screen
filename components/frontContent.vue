<template>
  <div class="front-content">
    <div class="top">
      <div class="left">
        <dv-border-box-7
          :color="color"
          :backgroundColor="bgColor"
          :key="`first-${boxContainerKey}`"
        >
          <common-title>机台运行效率</common-title>
          <div class="left-top-content">
            <charts-machine-efficiency></charts-machine-efficiency>
          </div>
        </dv-border-box-7>
        <dv-border-box-7
          :color="color"
          :backgroundColor="bgColor"
          :key="`second-${boxContainerKey}`"
        >
          <common-title>环保数据</common-title>
          <div class="left-bottom-content">
            <charts-environmental-data></charts-environmental-data>
          </div>
        </dv-border-box-7>
      </div>
      <div class="middle">
        <dv-border-box-9
          :color="color"
          :backgroundColor="bgColor"
          :key="`third-${boxContainerKey}`"
        >
          <common-title>染色智能工厂</common-title>
          <div class="center-top-content">
            <charts-flying-earth></charts-flying-earth>
            <dv-decoration-1 :color="color" />
          </div>
        </dv-border-box-9>
      </div>
      <div class="right">
        <dv-border-box-7
          :color="color"
          :backgroundColor="bgColor"
          :key="`fourth-${boxContainerTabsKey}`"
        >
          <div class="right-top-content">
            <el-tabs
              v-model="topRightTabs"
              @tab-click="handleTopRightTabsClick"
            >
              <el-tab-pane label="水用量" name="water">
                <charts-water-consumption></charts-water-consumption>
              </el-tab-pane>
              <el-tab-pane label="汽用量" name="gas">
                <charts-gas-consumption></charts-gas-consumption>
              </el-tab-pane>
              <el-tab-pane label="母液用量" name="liquid">
                <charts-liquid-consumption></charts-liquid-consumption>
              </el-tab-pane>
            </el-tabs>
            <dv-decoration-3 />
            <dv-decoration-2 :color="color" :dur="3" />
          </div>
        </dv-border-box-7>
        <dv-border-box-7
          :color="color"
          :backgroundColor="bgColor"
          :key="`fifth-${boxContainerKey}`"
        >
          <common-title>母液用量</common-title>
          <div class="right-bottom-content">
            <charts-radar-consumption></charts-radar-consumption>
          </div>
        </dv-border-box-7>
      </div>
    </div>
    <div class="bottom">
      <dv-border-box-7
        :color="color"
        :backgroundColor="bgColor"
        :key="`sixth-${boxContainerKey}`"
      >
        <div class="bottom-content">
          <el-tabs v-model="bottomTabs">
            <el-tab-pane label="染色化料" name="chemical">
              <tables-dye-chemical></tables-dye-chemical>
            </el-tab-pane>
            <el-tab-pane label="染色用料" name="consume">
              <tables-dye-consumption></tables-dye-consumption>
            </el-tab-pane>
            <el-tab-pane label="浆染过程耗能" name="energy">
              <tables-dye-energy-consumption></tables-dye-energy-consumption>
            </el-tab-pane>
          </el-tabs>
          <dv-decoration-3 />
          <dv-decoration-2 :color="color" :dur="3" />
        </div>
      </dv-border-box-7>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topRightTabs: "water",
      bottomTabs: "chemical",
      color: ["#0E65BB", "#00e5ff"],
      bgColor: "#0A123C75",
      boxContainerKey: 0,
      boxContainerTabsKey: 0,
    };
  },
  created() {},
  mounted() {
    this.initData();
  },
  computed: {},
  methods: {
    initData() {
      window.addEventListener("pageshow", (e) => {
        this.$nextTick(() => {
          this.boxContainerKey++;
          this.boxContainerTabsKey++;
        });
      });
    },
    handleTopRightTabsClick() {
      this.boxContainerTabsKey++;
    },
  },
};
</script>

<style lang="less" scoped>
.front-content {
  --flex-gap: 12px;
  --top-mini-box-width: 600px;
  --box-inner-padding: 20px;

  padding: 12px;
  display: flex;
  gap: var(--flex-gap);
  flex-direction: column;
  height: calc(100% - 120px);
  .dv-border-box-1,
  .dv-border-box-2,
  .dv-border-box-3,
  .dv-border-box-4,
  .dv-border-box-5,
  .dv-border-box-6,
  .dv-border-box-7,
  .dv-border-box-8,
  .dv-border-box-9,
  .dv-border-box-10,
  .dv-border-box-11,
  .dv-border-box-12,
  .dv-border-box-13 {
    height: 350px;
    min-width: 430px;
    box-sizing: border-box;
    padding: var(--box-inner-padding);
    /deep/.border-box-content {
      display: flex;
      flex-direction: column;
    }
    /deep/.el-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
      .el-tabs__header {
        .el-tabs__nav-wrap {
          &::after {
            background-color: #0e64bb80;
          }
          .el-tabs__nav-scroll {
            .el-tabs__nav {
              .el-tabs__active-bar {
                background-color: #2d99ff;
              }
              .el-tabs__item {
                font-size: 24px;
                padding-bottom: 10px;
                box-shadow: none !important;
                box-sizing: content-box;
                color: #fff;
                &.is-active {
                  color: #2d99ff;
                }
                &:hover {
                  color: #5db1ff;
                }
              }
            }
          }
        }
      }
      .el-tabs__content {
        flex: 1;
        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
  .top {
    display: flex;
    height: 800px;
    gap: var(--flex-gap);
    .left {
      display: flex;
      gap: var(--flex-gap);
      flex-direction: column;
      justify-content: space-between;
      width: var(--top-mini-box-width);
      .dv-border-box-7 {
        flex: 1;
      }
      .left-top-content {
        flex: 1;
      }
      .left-bottom-content {
        flex: 1;
      }
    }
    .middle {
      flex: 1;
      height: 100%;
      position: relative;
      .dv-border-box-7,
      .dv-border-box-9 {
        height: 100%;
        box-sizing: border-box;
      }
      .center-top-content {
        flex: 1;
        width: 100%;
        .dv-decoration-1 {
          width: 200px;
          position: absolute;
          transform: rotate(-90deg);
          bottom: -50px;
          transform-origin: top left;
          left: 5px;
          height: 50px;
        }
      }
    }
    .right {
      display: flex;
      gap: var(--flex-gap);
      flex-direction: column;
      justify-content: space-between;
      width: var(--top-mini-box-width);
      .dv-border-box-7 {
        flex: 1;
      }
      .right-top-content {
        flex: 1;
        position: relative;
        .el-tabs {
          height: 100%;
        }
        .dv-decoration-3 {
          position: absolute;
          right: -2px;
          top: 5px;
          width: 200px;
          height: 30px;
        }
        .dv-decoration-2,
        .dv-decoration-4 {
          position: absolute;
          left: 0px;
          top: 45.5px;
          width: 100%;
          height: 4px;
        }
      }
      .right-bottom-content {
        flex: 1;
      }
    }
  }
  .bottom {
    flex: 1;
    .dv-border-box-7 {
      height: 100%;
      .bottom-content {
        height: 100%;
        position: relative;
        .el-tabs {
          height: 100%;
        }
        .dv-decoration-3 {
          position: absolute;
          right: -2px;
          top: 5px;
          width: 200px;
          height: 30px;
        }
        .dv-decoration-2,
        .dv-decoration-10 {
          position: absolute;
          left: 0px;
          top: 45.5px;
          width: 100%;
          height: 4px;
        }
      }
    }
  }
}
</style>
