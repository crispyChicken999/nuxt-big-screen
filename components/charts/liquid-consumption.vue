<template>
  <div class="chartContainer" ref="liquidConsumption"></div>
</template>

<script>
// import * as echarts from "echarts";
import { baseURL } from "@/assets/js/request";
let chart = null;
let timer = null;
export default {
  data() {
    return {
      options: {
        title: {
          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#fff",
            fontSize: 28,
          },
        },
        legend: {
          icon: "rect",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 15,
          data: [
            "A机靛蓝",
            "A机靛蓝前",
            "A机靛蓝后",
            "B机靛蓝",
            "B机靛蓝前",
            "B机靛蓝后",
            "C机靛蓝",
            "C机靛蓝前",
            "C机靛蓝后",
            "D机靛蓝",
            "D机靛蓝前",
            "D机靛蓝后",
            "E机靛蓝",
            "E机靛蓝前",
            "E机靛蓝后",
          ],
          right: "5%",
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "8%",
          top: "8%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            margin: 5,
            rotate: 30,
            textStyle: {
              fontSize: 10,
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#354875",
              width: 1,
            },
          },
          data: [
            "A机靛蓝",
            "A机靛蓝前",
            "A机靛蓝后",
            "B机靛蓝",
            "B机靛蓝前",
            "B机靛蓝后",
            "C机靛蓝",
            "C机靛蓝前",
            "C机靛蓝后",
            "D机靛蓝",
            "D机靛蓝前",
            "D机靛蓝后",
            "E机靛蓝",
            "E机靛蓝前",
            "E机靛蓝后",
          ],
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#354875",
              width: 1,
            },
          },
          axisLabel: {
            formatter: "{value}",
            color: "white",
            fontSize: 15,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#354875",
            },
          },
        },
        calculable: true,
        animationDurationUpdate: 1200,
        series: [
          {
            name: "实际值",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0],
              color: (params) => {
                var colorList = [
                  "#f76707",
                  "#f59f00",
                  "#74b816",
                  "#37b24d",
                  "#0ca678",
                  "#1098ad",
                  "#1c7ed6",
                  "#4263eb",
                  "#7048e8",
                  "#ae3ec9",
                  "#d6336c",
                  "#f03e3e",
                ];
                return new this.$echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  {
                    offset: 0,
                    color:
                      colorList[params.dataIndex % colorList.length] + "50",
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex % colorList.length],
                  },
                ]);
              },
            },
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  //数值样式
                  color: "white",
                  fontSize: 14,
                },
              },
            },
            barGap: "-100%",
            data: Array(15)
              .fill(1)
              .map((v) => Math.floor(Math.random() * (3500 - 120)) + 120),
          },
          {
            name: "标准值",
            type: "bar",
            barWidth: 5,
            // stack: '总量',
            itemStyle: {
              normal: {
                color: "rgba(237,125,49, 0)",
                borderColor: "#fbfa50",
                borderWidth: "0",
              },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                textStyle: {
                  //数值样式
                  color: "fbfa50",
                  fontSize: 14,
                },
              },
            },
            data: Array(15)
              .fill(1)
              .map((v) => Math.floor(Math.random() * (3500 - 120)) + 120),
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.draw();
    this.getChartData();
    timer = setInterval(() => {
      this.getChartData();
    }, this.$settings.fetchDataInterval);
  },
  computed: {},
  methods: {
    draw() {
      chart = this.$echarts.init(this.$refs.liquidConsumption);
      chart.setOption(this.options);
    },
    getChartData() {
      this.$axios.get(`${baseURL}/api/rightTopThree`).then((res) => {
        if (res && res.data) {
          let result = res.data;
          this.options.series[0].data = result.trueValue;
          this.options.series[1].data = result.standardValue;
          chart.setOption(this.options);
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(timer);
    chart && chart.clear();
  },
};
</script>

<style lang="less" scoped>
.chartContainer {
  width: 100%;
  height: 100%;
}
</style>
