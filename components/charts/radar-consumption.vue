<template>
  <div class="radar-container">
    <div class="data">
      <div class="input-length">
        <p>投入长度</p>
        <h2><dv-digital-flop :config="inputLength" /> <span>米</span></h2>
        <dv-decoration-2 :dur="3" />
      </div>
      <div class="total-length">
        <p>出轴总长</p>
        <h2><dv-digital-flop :config="totalLength" /> <span>米</span></h2>
        <dv-decoration-2 :dur="3" />
      </div>
      <div class="daily-times">
        <p>投入长度</p>
        <h2><dv-digital-flop :config="dailyTimes" /> <span>次/轴</span></h2>
        <dv-decoration-2 :dur="3" />
      </div>
    </div>
    <div class="chart" ref="radarChart"></div>
  </div>
</template>

<script>
import { baseURL } from "@/assets/js/request";
let chart = null;
let timer = null;
export default {
  data() {
    return {
      inputLength: {
        number: [14400], //初始数据
        content: "{nt}",
        style: {
          fontSize: 48, //字体大小
          fill: "#2d99ff", //字体颜色
        },
      },
      totalLength: {
        number: [14210], //初始数据
        content: "{nt}",
        style: {
          fontSize: 48, //字体大小
          fill: "#2d99ff", //字体颜色
        },
      },
      dailyTimes: {
        number: [12], //初始数据
        content: "{nt}",
        style: {
          fontSize: 48, //字体大小
          fill: "#2d99ff", //字体颜色
        },
      },
      option: {
        backgroundColor: "transparent",
        color: ["#4A99FF", "#4BFFFC"],
        // title,
        legend: {
          //data，就是取得每个series里面的name属性。
          orient: "vertical",
          icon: "circle", //图例形状
          padding: 0,
          top: 20,
          right: 40,
          itemWidth: 14, //小圆点宽度
          itemHeight: 14, // 小圆点高度
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 14,
            color: "#00E4FF",
          },
        },
        tooltip: {
          show: true,
        },
        radar: {
          center: ["50%", "50%"], //圆心坐标距离左边和上边的距离
          radius: ["1%", "75%"], //内外半径，不写默认是75%
          startAngle: 90, //可以旋转图形
          shape: "polygon",
          axisName: {
            color: "#fff",
            fontSize: 16,
          },
          indicator: [
            {
              name: "靛蓝",
              max: 4000,
              color: "#fff",
            },
            {
              name: "保险粉",
              max: 4000,
              color: "#fff",
            },
            {
              name: "水",
              max: 4000,
              color: "#fff",
            },
            {
              name: "气",
              max: 4000,
              color: "#fff",
            },
            {
              name: "母液",
              max: 4000,
              color: "#fff",
            },
            {
              name: "烧碱",
              max: 4000,
              color: "#fff",
            },
          ],
          splitArea: {
            show: false, //默认显示颜色分割区域，不需要显示
          },
          axisLine: {
            show: true, //是否显示十字交叉线
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "#ffffff75", //线条颜色
            },
          },
          axisLabel: { show: false },
          splitLine: {
            //雷达一圈圈
            show: true,
            lineStyle: {
              type: "solid",
              color: "#113865", // 雷达一圈圈颜色分隔线颜色
              width: 1, // 分隔线线宽
            },
          },
        },
        series: [
          {
            type: "radar",
            data: [
              {
                name: "标准值",
                value: [4300, 4700, 3600, 3900, 3800, 4200],
                symbolSize: 8,
                symbol: "circle",
                lineStyle: {
                  width: 1,
                },
                areaStyle: {
                  // 单项区域填充样式
                  color: {
                    type: "linear",
                    x: 0, //右
                    y: 0, //下
                    x2: 1, //左
                    y2: 1, //上
                    colorStops: [
                      {
                        offset: 0,
                        color: "#4A99FF",
                      },
                      {
                        offset: 0.5,
                        color: "rgba(0,0,0,0)",
                      },
                      {
                        offset: 1,
                        color: "#4A99FF",
                      },
                    ],
                    global: false,
                  },
                  opacity: 1, // 区域透明度
                },
              },
              {
                value: [3200, 3000, 3400, 2000, 3900, 2000],
                name: "实际值",
                symbolSize: 8,
                symbol: "circle",
                lineStyle: {
                  width: 1,
                },
                areaStyle: {
                  // 单项区域填充样式
                  color: {
                    type: "linear",
                    x: 0, //右
                    y: 0, //下
                    x2: 1, //左
                    y2: 1, //上
                    colorStops: [
                      {
                        offset: 0,
                        color: "#4BFFFC",
                      },
                      {
                        offset: 0.5,
                        color: "rgba(0,0,0,0)",
                      },
                      {
                        offset: 1,
                        color: "#4BFFFC",
                      },
                    ],
                    global: false,
                  },
                  opacity: 1, // 区域透明度
                },
              },
            ],
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.draw();
    this.getLeftChartData();
    this.getRightChartData();
    timer = setInterval(() => {
      this.getLeftChartData();
      this.getRightChartData();
    }, 5000);
  },
  computed: {},
  methods: {
    draw() {
      chart = this.$echarts.init(this.$refs.radarChart);
      chart.setOption(this.option);
    },
    // power() {
    //   this.inputLength.number[0] += Math.floor(Math.random() * 5 + 1);
    //   this.totalLength.number[0] += Math.floor(Math.random() * 7 + 1);
    //   this.dailyTimes.number[0] = Math.floor(Math.random() * 12 + 1);
    //   this.totalLength = { ...this.totalLength }; //对象解构，更新props
    //   this.inputLength = { ...this.inputLength }; //对象解构，更新props
    //   this.dailyTimes = { ...this.dailyTimes }; //对象解构，更新props
    //   this.option.series[0].data[1].value = Array(6)
    //     .fill(1)
    //     .map((v) => Math.floor(Math.random() * (6666 - 120)) + 120);
    //   chart.setOption(this.option);
    // },
    getLeftChartData() {
      this.$axios.get(`${baseURL}/api/rightBottomTwo`).then((res) => {
        if (res && res.data) {
          let result = res.data;
          this.inputLength.number[0] = result.inputLength;
          this.totalLength.number[0] = result.shaftLength;
          this.dailyTimes.number[0] = result.AxisLength;
          this.totalLength = { ...this.totalLength };
          this.inputLength = { ...this.inputLength };
          this.dailyTimes = { ...this.dailyTimes };
        }
      });
    },
    getRightChartData() {
      this.$axios.get(`${baseURL}/api/rightBottomOne`).then((res) => {
        if (res && res.data) {
          let result = res.data;
          result.trueValue = Object.values(result.trueValue);
          result.standardValue = Object.values(result.standardValue);
          this.option.series[0].data[0].value = result.standardValue;
          this.option.series[0].data[1].value = result.trueValue;
          chart.setOption(this.option);
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(timer);
    chart.clear();
  },
};
</script>

<style lang="less" scoped>
.radar-container {
  width: 100%;
  height: 100%;
  display: flex;
  .data {
    width: 150px;
    padding: 20px 10px 20px 20px;
    p {
      font-size: 18px;
      color: #ffffff85;
      margin-bottom: 10px;
    }
    /deep/.dv-digital-flop {
      flex: 1;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    h2 {
      color: #2d99ff;
      font-size: 36px;
      display: flex;
      align-items: flex-end;
      span {
        font-size: 16px;
        color: #fff;
        align-self: center;
      }
    }
    > div {
      // margin-bottom: 25px;
      position: relative;
      .dv-decoration-2 {
        position: absolute;
        bottom: 10px;
        width: 100%;
        height: 3px;
      }
    }
    .input-length {
      h2 {
        color: #00ddff;
      }
    }
  }
  .chart {
    flex: 1;
    height: 100%;
  }
}
</style>
