<template>
  <div class="my-timer">
    <span>{{ newTime }}</span>
  </div>
</template>

<script>
let timer = null;
export default {
  data() {
    return {
      newTime: "",
    };
  },
  created() {},
  mounted() {
    this.getNowTime();
    clearInterval(timer);
    timer = setInterval(() => {
      this.getNowTime();
    }, 1000);
  },
  computed: {},
  methods: {
    getNowTime() {
      var date = new Date();
      var time =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0") +
        " " +
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ":" +
        String(date.getSeconds()).padStart(2, "0");
      this.newTime = time;
    },
  },
  beforeDestroy() {
    clearInterval(timer);
  },
};
</script>

<style lang="less" scoped>
.my-timer {
  font-family: "moto-verse";
  font-size: 24px;
  color: #18ffff;
  text-shadow: 2px 2px 0px #003bff;
  animation: shine 4s ease-in-out infinite forwards;
  @keyframes shine {
    0% {
      color: #18ffff;
    }
    50% {
      color: #0059ff;
    }
    100% {
      color: #18ffff;
    }
  }
}
</style>
