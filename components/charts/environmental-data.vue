<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script>
let timer = null;
let chart = null;
// import * as echarts from "echarts";
import { baseURL } from "@/assets/js/request";
export default {
  data() {
    return {
      options: {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        legend: {
          icon: "rect",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 15,
          data: ["原水量", "外排水量"],
          right: "5%",
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              margin: 5,
              rotate: 0,
              textStyle: {
                fontSize: 8,
                color: "#ffffff85",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff20",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                color: "#ffffff20",
              },
            },
            data: this.generateDate().reverse(),
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            nameTextStyle: {
              color: "#fff",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff20",
              },
            },
            axisLabel: {
              margin: 5,
              textStyle: {
                fontSize: 10,
                color: "#ffffff85",
              },
            },
            splitLine: {
              lineStyle: {
                type: "solid",
                color: "#ffffff20",
              },
            },
          },
        ],
        series: [
          {
            name: "原水量",
            type: "line",
            smooth: true,
            symbol: "",
            symbolSize: 0,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgb(32, 146, 205)",
                    },
                    {
                      offset: 1,
                      color: "rgba(32, 146, 205,0.5)",
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(32, 146, 205)",
              },
            },
            data: Array(15)
              .fill(1)
              .map((v) => Math.floor(Math.random() * (3000 - 2200)) + 2200),
          },
          {
            name: "外排水量",
            type: "line",
            smooth: true,
            symbol: "",
            symbolSize: 0,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#18ffff",
                    },
                    {
                      offset: 0.5,
                      color: "#84ffff",
                    },
                    {
                      offset: 1,
                      color: "#26c6da",
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(72, 236, 241)",
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
    }, 5000);
  },
  computed: {},
  methods: {
    draw() {
      chart = this.$echarts.init(this.$refs.chartContainer);
      chart.setOption(this.options);
    },
    // generateData() {
    //   this.options.series[1].data = Array(15)
    //     .fill(1)
    //     .map((v) => Math.floor(Math.random() * (3500 - 1597)) + 1154);
    //   chart.setOption(this.options);
    // },
    generateDate() {
      let time_data = [];
      for (let i = 0; i < 15; i++) {
        let dd = new Date();
        dd.setDate(dd.getDate() + (0 - i)); //获取p_count天后的日期
        let m = dd.getMonth() + 1; //获取当前月份的日期
        if (m < 10) {
          m = "0" + m;
        }
        let d = dd.getDate();
        if (d < 10) {
          d = "0" + d;
        }
        time_data[i] = m + "-" + d;
      }
      return time_data;
    },
    getChartData() {
      this.$axios.get(`${baseURL}/api/leftBottom`).then((res) => {
        if (res && res.data) {
          let result = res.data;
          this.options.series[0].data = result.rawWaterVolume;
          this.options.series[1].data = result.outFlow;
          chart.setOption(this.options);
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
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
