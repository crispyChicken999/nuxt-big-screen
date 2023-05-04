<template>
  <canvas ref="matrix" class="matrix"></canvas>
</template>

<script>
export default {
  name: "vue-matrix-raindrop",
  //插件的各种参数
  props: {
    //canvas宽度
    canvasWidth: {
      type: Number,
      default: 2560,
    },
    //canvas高度
    canvasHeight: {
      type: Number,
      default: 1440,
    },
    //下落字体大小
    fontSize: {
      type: Number,
      default: 18,
    },
    //字体类型
    fontFamily: {
      type: String,
      default: "arial",
    },
    //字体文本内容，会随机从字符串里取一个
    textContent: {
      type: String,
      default:
        "abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_<>,/?.':\+0123456789ぁいうえおかきくけことてつちたそパリマミニシアイエネメハワテボヲユ",
    },
    //字体颜色
    textColor: {
      type: String,
      default: "#00f7ff",
      validator: function (value) {
        var colorReg = /^#([0-9a-fA-F]{6})|([0-9a-fA-F]{3})$/g;
        return colorReg.test(value);
      },
    },
    //canvas背景颜色，可自定义
    backgroundColor: {
      type: String,
      default: "rgba(0,0,0,0.12)",
    },
    //下落速度
    speed: {
      type: Number,
      default: 2,
      validator: function (value) {
        return value % 1 === 0;
      },
    },
  },
  data() {
    return {
      canvasCtx: null,
      canvas: null,
      columns: 0,
      rainDropPositionArray: [],
      speedCnt: 0,
    };
  },
  mounted: function () {
    this.initRAF();
    this.initCanvas();
    this.initRainDrop();
    this.animationUpdate();
  },
  methods: {
    //初始化requestAnitaionFrame，注意兼容性
    initRAF() {
      window.requestAnimationFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();
      window.cancelAnimationFrame = (function () {
        return (
          window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.oCancelAnimationFrame ||
          window.msCancelAnimationFrame ||
          function (id) {
            window.clearTimeout(id);
          }
        );
      })();
    },
    //初始化canvas
    initCanvas() {
      this.canvas = this.$refs.matrix;
      //需要判断获取到的canvas是否是真的canvas
      if (this.canvas.tagName.toLowerCase() !== "canvas") {
        console.error("Error! Invalid canvas! Please check the canvas's id!");
      }
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      this.canvasCtx = this.canvas.getContext("2d");
      this.canvasCtx.font = this.fontSize + "px " + this.fontFamily;
      this.columns = Math.floor(this.canvas.width / this.fontSize);
    },
    //初始化数字雨下落的初始y轴位置
    initRainDrop() {
      for (var i = 0; i < this.columns; i++) {
        this.rainDropPositionArray = new Array(this.columns).fill(0);
      }
    },
    //核心动画函数，控制数字雨下落
    animationUpdate() {
      //控制雨滴下落的速度
      this.speedCnt++;
      //speed为1最快，越大越慢
      if (this.speedCnt === this.speed) {
        this.speedCnt = 0;
        //绘制背景
        this.canvasCtx.fillStyle = this.backgroundColor;
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //绘制文字
        this.canvasCtx.fillStyle = this.textColor;
        //遍历每一列的数字雨，然后在canvas上绘制该数字字母
        for (var i = 0, len = this.rainDropPositionArray.length; i < len; i++) {
          this.rainDropPositionArray[i]++;
          var randomTextIndex = Math.floor(
            Math.random() * this.textContent.length
          );
          var randomCase = Math.random() > 0.5 ? "toUpperCase" : "toLowerCase";
          var randomText = this.textContent[randomTextIndex][randomCase]();
          var textYPostion = this.rainDropPositionArray[i] * this.fontSize;
          this.canvasCtx.fillText(randomText, i * this.fontSize, textYPostion);
          //数字雨触碰canvas底部则一定概率重新回到顶部继续下落
          if (textYPostion > this.canvasHeight) {
            if (Math.random() > 0.9) {
              this.rainDropPositionArray[i] = 0;
            }
          }
        }
      }
      window.requestAnimationFrame(this.animationUpdate);
    },
  },
};
</script>

<style lang="less" scoped>
.matrix {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
