<template>
  <div class="chartContainer" ref="gasConsumption"></div>
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          textStyle: {
            fontSize: 18, //字体大小
            color: "#fff", //字体颜色
            borderColor: "blue",
          },
        },
        grid: {
          left: "3%",
          right: "15%",
          bottom: "11%",
          containLabel: true,
        },
        xAxis: {
          axisLabel: {
            formatter: "{value}",
            color: "white",
            fontSize: 18,
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#354875",
              width: 2,
            },
          },
          axisLabel: {
            formatter: "{value}",
            color: "white",
            width: "8",
            fontSize: 18,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#354875",
            },
          },
          type: "category",
          data: ["E机", "D机", "C机", "B机", "A机"],
        },
        calculable: true,
        animationDurationUpdate: 1200,
        series: [
          {
            name: "实际值",
            type: "bar",
            barWidth: 20,
            color: "#00c8e1",
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  //数值样式
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#fff",
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "#5433ff",
                  },
                  {
                    offset: 0.5,
                    color: "#20bdff",
                  },
                  {
                    offset: 1,
                    color: "#a5fecb",
                  },
                ]),
                barBorderRadius: [0, 10, 10, 0],
              },
            },
            barGap: "-100%",
            data: Array(5)
              .fill(1)
              .map((v) => Math.floor(Math.random() * (6666 - 2222)) + 2222),
          },
          {
            name: "标准值",
            type: "bar",
            barWidth: 20,
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  //数值样式
                  color: "#333",
                  fontSize: 16,
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#fff",
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 1,
                    color: "#f5cbff",
                  },
                  {
                    offset: 0,
                    color: "#c53364",
                  },
                ]),
                barBorderRadius: [0, 10, 10, 0],
              },
            },
            data: Array(5)
              .fill(1)
              .map((v) => Math.floor(Math.random() * (2000 - 100)) + 100),
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
      chart = this.$echarts.init(this.$refs.gasConsumption);
      chart.setOption(this.options);
    },
    getChartData() {
      this.$axios.get(`${baseURL}/api/rightTopTwo`).then((res) => {
        if (res && res.data) {
          let result = res.data;
          let standardList = [];
          let actualList = [];
          result.forEach((item) => {
            actualList.push(item.trueValue);
            standardList.push(item.standardValue);
          });
          this.options.series[0].data = standardList;
          this.options.series[1].data = actualList;
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
.chartContainer {
  width: 100%;
  height: 100%;
}
</style>
