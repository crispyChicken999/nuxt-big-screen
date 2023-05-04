<template>
  <div ref="flyingEarth" class="chartContainer"></div>
</template>

<script>
// import * as echarts from "echarts";
let chart = null;
import world from "@/assets/js/world.js";
if (process.client) {
  require("echarts-gl");
}
export default {
  data() {
    return {
      geoCoordMap: {
        南宁: [108.479, 23.1152],
        越南: [108.1157, 13.95006],
        韶关: [113.5969, 24.81009],
        北京: [116.407, 39.90459],
        广州: [113.5107, 23.2196],
        重庆: [107.7539, 30.1904],
        芬兰: [24.909912, 60.169095],
        美国: [-100.696295, 33.679979],
        日本: [139.710164, 35.706962],
        韩国: [126.979208, 37.53875],
        瑞士: [7.445147, 46.956241],
        东南亚: [117.53244, 5.300343],
        澳大利亚: [135.193845, -25.304039],
        德国: [13.402393, 52.518569],
        英国: [-0.126608, 51.208425],
        加拿大: [-102.646409, 59.994255],
      },
      options: {
        backgroundColor: "rgba(0,0,0,0)", //canvas的背景颜色
        title: {
          show: true,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          icon: "circle",
          itemWidth: 16,
          itemHeight: 16,
          itemGap: 15,
          bottom: "2%",
          right: "0%",
          align: "auto",
          orient: "vertical", // 排列方式，vertical:垂直排列
          textStyle: {
            fontSize: 20,
            lineHeight: 25,
            color: "#fff",
          },
        },
        geo: {
          type: "map",
          map: world,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [
            [-180, 90],
            [180, -90],
          ],
          zoom: 0,
          roam: false,
          itemStyle: {
            borderColor: "#000d2d",
            normal: {
              areaColor: "#2455ad",
              borderColor: "#000c2d",
            },
            emphasis: {
              areaColor: "#357cf8",
            },
          },
          label: {
            fontSize: 36,
          },
        },
        globe: {
          baseTexture: require("@/assets/imgs/base-texture.jpg"),
          heightTexture: require("@/assets/imgs/height-texture.jpg"),
          top: "middle",
          left: "center",
          displacementScale: 0.04,
          displacementQuality: "medium",
          environment: "auto",
          shading: "color",
          postEffect: {
            enable: false,
          },
          atmosphere: {
            show: false,
            glowPower: 10,
            innerGlowPower: 4,
          },
          viewControl: {
            distance: 170,
            autoRotate: true,
            maxDistance: 230,
            alpha: 28,
            beta: 200,
          },
        },
        series: [
          {
            type: "lines3D",
            name: "韶关",
            coordinateSystem: "globe",
            effect: {
              show: true,
              period: 2,
              trailWidth: 3,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#18ffff",
            },
            blendMode: "lighter",
            lineStyle: {
              width: 1,
              color: "#18ffff",
              opacity: 0.02,
            },
            data: [],
            silent: false,
          },
          {
            type: "lines3D",
            name: "越南",
            coordinateSystem: "globe",
            effect: {
              show: true,
              period: 2,
              trailWidth: 3,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#448aff",
            },
            blendMode: "lighter",
            lineStyle: {
              width: 1,
              color: "#448aff",
              opacity: 0.02,
            },
            data: [],
            silent: false,
          },
        ],
      },
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      chart = this.$echarts.init(this.$refs.flyingEarth);

      // 地球数据显示
      let ds = [
        {
          name: "北京",
          point: [116.46, 39.92, 0],
          itemStyleColor: "#f00",
          labelText: "北京",
        },
        {
          name: "越南",
          point: [108.1157, 13.95006, 0],
          itemStyleColor: "#304ffe",
          labelText: "越南",
        },
        {
          name: "韶关",
          point: [113.5969, 24.81009, 0],
          itemStyleColor: "#00e5ff",
          labelText: "韶关",
        },
      ];

      // 点配置信息
      let series = ds.map((item) => {
        return {
          name: item.name, // 是否显示左上角图例
          type: "scatter3D",
          coordinateSystem: "globe",
          blendMode: "lighter",
          symbol: "pin",
          zlevel: 10,
          symbolSize: 20, // 点位大小
          itemStyle: {
            color: item.itemStyleColor, // 各个点位的颜色设置
            opacity: 1, // 透明度
            borderWidth: 1, // 边框宽度
            borderColor: "rgba(255,255,255,0.8)", //rgba(180, 31, 107, 0.8)
          },
          label: {
            show: true, // 是否显示字体
            position: "left", // 字体位置。top、left、right、bottom
            distance: 15,
            formatter: item.labelText, // 具体显示的值
            textStyle: {
              color: "#333", // 字体颜色
              borderWidth: 1, // 字体边框宽度
              borderColor: "#fff", // 字体边框颜色
              fontFamily: "sans-serif", // 字体格式
              fontSize: 18, // 字体大小
              fontWeight: 700, // 字体加粗
            },
          },
          data: [item.point], // 数据来源
        };
      });
      for (let i = 0; i < 33; i++) {
        this.options.series[0].data = this.options.series[0].data.concat(
          this.randomData("韶关")
        );
      }
      for (let i = 0; i < 32; i++) {
        this.options.series[1].data = this.options.series[1].data.concat(
          this.randomData("越南")
        );
      }
      this.options.series = [...this.options.series, ...series];
      chart.setOption(this.options);
    },
    randomData(type) {
      let name = "随机点" + Math.random().toFixed(5) * 100000;
      let longitude = this.geoCoordMap[type][0];
      let latitude = this.geoCoordMap[type][1];
      let longitude2 = Math.random() * 360 - 180;
      let latitude2 = Math.random() * 180 - 90;
      return {
        name: name,
        coords: [
          [longitude2, latitude2],
          [longitude, latitude],
        ],
        value: (Math.random() * 3000).toFixed(2),
      };
    },
  },
  beforeDestroy() {
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
