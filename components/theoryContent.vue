<template>
  <div class="factory-content">
    <dv-border-box-3 :color="color" :backgroundColor="bgColor">
      <matrix></matrix>
      <div
        v-loading="isLoading"
        class="video-container"
        element-loading-text="视频加载中..."
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <dv-border-box-8 :color="color" :dur="8">
          <video
            muted
            ref="video"
            loop="loop"
            width="1920"
            height="1080"
            mediatype="video"
            autoplay="autoplay"
          >
            <source src="/videos/theory.mp4" type="video/mp4" />
          </video>
        </dv-border-box-8>
      </div>
    </dv-border-box-3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: ["#0E65BB", "#00e5ff"],
      bgColor: "#0A123C75",
      isLoading: true,
    };
  },
  created() {},
  mounted() {
    this.$refs.video.addEventListener("play", () => {
      this.isLoading = false;
    });

    this.$refs.video.addEventListener("error", () => {
      this.isLoading = false;
      this.$message.error("视频加载失败");
    });

    this.$refs.video.addEventListener("abort", () => {
      this.isLoading = false;
      this.$message.error("视频加载失败");
    });
  },
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.factory-content {
  --flex-gap: 12px;
  --top-mini-box-width: 600px;
  --box-inner-padding: 20px;

  padding: 12px 0;
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
    height: 100%;
    min-width: 430px;
    box-sizing: border-box;
    padding: var(--box-inner-padding);
    /deep/.border-box-content {
      display: flex;
      overflow: hidden;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    video {
      position: relative;
      top: -10px;
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
}
</style>
