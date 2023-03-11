<template>
  <div class="efficiency">
    <div class="machine-detail">
      <h2>机位</h2>
      <p>平均运行时间</p>
      <div class="percent">
        <p>
          {{
            currentRow.machineNo && currentRow.machineNo.split("")[0]
          }}机时间占比
        </p>
        <h1>
          <dv-digital-flop :config="config" />
          <span>%</span>
        </h1>
      </div>
    </div>
    <div class="machine-table">
      <el-table
        :data="machineTable"
        :border="false"
        size="mini"
        @row-click="handleRowClick"
      >
        <el-table-column
          label="机位"
          align="center"
          width="70px"
          prop="machineNo"
        ></el-table-column>
        <el-table-column
          label="运行时间（h）"
          align="center"
          width="100px"
          prop="time"
        ></el-table-column>
        <el-table-column
          label="效率（%）"
          align="center"
          width="80px"
          prop="efficiency"
        ></el-table-column>
        <el-table-column
          label="生产数量（米）"
          align="center"
          width="120px"
          prop="produceNum"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
let timer = null;
let timeout = null;
import { baseURL } from "@/assets/js/request";
export default {
  data() {
    return {
      config: {
        number: [39.5], //初始数据
        content: "{nt}",
        style: {
          fontSize: 48, //字体大小
          fill: "#2d99ff", //字体颜色
        },
      },
      machineTable: [
        {
          machineNo: "A机",
          time: 39.5,
          efficiency: "54.8%",
          produceNum: "56808",
        },
        {
          machineNo: "B机",
          time: 72,
          efficiency: "100%",
          produceNum: "103680",
        },
        {
          machineNo: "C机",
          time: 24.9,
          efficiency: "34.5%",
          produceNum: "35760",
        },
        {
          machineNo: "D机",
          time: 0,
          efficiency: "0%",
          produceNum: "0",
        },
        {
          machineNo: "E机",
          time: 72,
          efficiency: "100%",
          produceNum: "103680",
        },
      ],
      currentRow: {},
      rowIndex: 0,
    };
  },
  created() {},
  mounted() {
    this.currentRow = this.machineTable[0];
    this.getChartData();
    timer = setInterval(() => {
      this.getChartData();
    }, 5000);
  },
  computed: {},
  methods: {
    handleRowClick(row, column, event) {
      clearInterval(timer);
      clearTimeout(timeout);
      this.rowIndex = this.machineTable.findIndex(
        (item) => item.machineNo === row.machineNo
      );
      this.currentRow = row;
      this.config.number[0] = Number(
        row.efficiency && row.efficiency.replace("%", "")
      );
      this.config = { ...this.config };
      timeout = setTimeout(() => {
        timer = setInterval(() => {
          this.getChartData();
        }, 5000);
      }, 3000);
    },
    // generateRandomNum() {
    //   this.machineTable.forEach((item) => {
    //     item.produceNum =
    //       Number(item.produceNum) + Math.floor(Math.random() * 5 + 1);
    //     item.efficiency = Math.floor(Math.random() * 100 + 1) + "%";
    //     item.time = Number(
    //       (item.time + Number((Math.random() * 0.5).toFixed(1))).toFixed(1)
    //     );
    //   });
    //   this.config.number[0] = Number(
    //     this.machineTable[this.rowIndex].efficiency.replace("%", "")
    //   );
    //   this.config = { ...this.config }; //对象解构，更新props
    // },
    getChartData() {
      this.$axios.get(`${baseURL}/api/leftTop`).then((res) => {
        if (res && res.data) {
          let result = res.data;
          result.forEach((item, index) => {
            this.machineTable[index].time = item.runTime;
            this.machineTable[index].efficiency = item.productiveness;
            this.machineTable[index].produceNum = item.productionQuantity;
          });
          this.config.number[0] = Number(
            this.machineTable[this.rowIndex].efficiency &&
              this.machineTable[this.rowIndex].efficiency.replace("%", "")
          );
          this.config = { ...this.config };
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(timer);
    clearTimeout(timeout);
  },
};
</script>

<style lang="less" scoped>
.efficiency {
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .machine-detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      font-size: 20px;
      color: #fff;
      margin-bottom: 5px;
    }
    & > p {
      font-size: 14px;
      color: #acacac;
      margin-bottom: 30px;
    }
    .percent {
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;
      background: url("~assets/imgs/machine-bg.png");
      background-size: cover;
      p {
        color: #6648ff;
      }
      h1 {
        font-size: 36px;
        display: flex;
        .dv-digital-flop {
          width: 100px;
        }
        span {
          font-size: 24px;
          align-self: center;
        }
      }
    }
  }
  .machine-table {
    /deep/.el-table {
      height: 100%;
      background-color: transparent;
      &::before {
        display: none;
      }
      tr {
        background-color: transparent;
      }
      .el-table__header {
        background: linear-gradient(
          360deg,
          #10297b 0%,
          rgba(47, 61, 82, 0.09) 100%
        );
        .el-table__cell {
          color: #fff;
          border-bottom: none;
          background-color: transparent;
        }
      }
      .el-table__body tr:hover > td.el-table__cell {
        background-color: transparent;
      }
      .el-table__body-wrapper {
        .el-table__body {
          border-collapse: collapse;
          tbody {
            z-index: 0;
            .el-table__row {
              &:hover {
                cursor: pointer;
                position: relative;
                &::after {
                  content: "";
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 90%;
                  z-index: 1;
                  border-top: 2px solid;
                  border-bottom: 2px solid;
                  border-image: linear-gradient(
                      90deg,
                      rgba(93, 144, 194, 0),
                      rgb(49, 152, 255),
                      rgba(93, 144, 194, 0)
                    )
                    2 2;
                }
                .el-table__cell {
                  z-index: 2;
                }
              }
              .el-table__cell {
                color: #fff;
                border: none;
                padding: 15px 6px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
