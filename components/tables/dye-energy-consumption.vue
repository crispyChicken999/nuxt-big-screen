<template>
  <div class="dye-chemical">
    <el-table
      fit
      ref="table"
      height="100%"
      :data="tableData"
      v-loading="isLoading"
      :header-cell-style="{
        color: '#fff',
        textAlign: 'center',
        background: '#0C1145',
        borderColor: '#133F82',
      }"
      :row-style="{
        height: '50px',
        margin: '200px',
        height: '50px',
        lineHeight: '50px',
        color: '#3F96A5',
        borderColor: '#133F82',
        background: 'transparent',
      }"
      @cell-mouse-enter="mouseEnter"
      @cell-mouse-leave="mouseLeave"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="基本资料">
        <el-table-column prop="scdh" label="生产单号"></el-table-column>
        <el-table-column prop="pz" label="品种"></el-table-column>
        <el-table-column prop="gh" label="缸号"></el-table-column>
      </el-table-column>
      <el-table-column prop="jsrq" label="浆纱日期"></el-table-column>
      <el-table-column label="出轴数量">
        <el-table-column prop="czsl" label="米"></el-table-column>
      </el-table-column>
      <el-table-column label="染色能源用量">
        <el-table-column prop="yssj" label="作业时间"></el-table-column>
        <el-table-column prop="ystonbz" label="自来水标准用量">
          <el-table-column
            prop="ystonbz"
            label="吨/万米"
            width="130"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="自来水实际用量">
          <el-table-column prop="yston" label="ton"></el-table-column>
          <el-table-column prop="ystonh" label="ton/H"></el-table-column>
          <el-table-column prop="ystonwm" label="吨/万米"></el-table-column>
        </el-table-column>
        <el-table-column prop="ysmbz" label="蒸汽标准用量">
          <el-table-column prop="ysmbz" label="m³/万米"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽实际用量">
          <el-table-column prop="ysm" label="m³"></el-table-column>
          <el-table-column prop="ysmh" label="m³/H"></el-table-column>
          <el-table-column prop="ysmwm" label="m³/万米"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="浆纱能源用量">
        <el-table-column prop="jssj" label="作业时间"></el-table-column>
        <el-table-column label="自来水用量">
          <el-table-column prop="jston" label="吨"></el-table-column>
          <el-table-column prop="jstonh" label="ton/H"></el-table-column>
          <el-table-column prop="jstonwm" label="吨/万米"></el-table-column>
        </el-table-column>
        <el-table-column prop="jsmbz" label="蒸汽标准用量">
          <el-table-column prop="jsmbz" label="m³/万米"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽实际用量">
          <el-table-column prop="jsm" label="ton"></el-table-column>
          <el-table-column prop="jsmh" label="ton/H"></el-table-column>
          <el-table-column prop="jsmwm" label="ton/万米"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
let timer = null;
export default {
  data() {
    return {
      tableData: [],
      isLoading: false,
    };
  },
  created() {},
  mounted() {
    this.getTableData();
  },
  computed: {},
  methods: {
    getTableData() {
      if (sessionStorage.getItem("dyeEnergyConsumptionTableData")) {
        this.tableData = JSON.parse(
          sessionStorage.getItem("dyeEnergyConsumptionTableData")
        );
        this.$nextTick(() => {
          timer = requestAnimationFrame(this.startScroll);
        });
        return;
      }
      this.isLoading = true;
      this.$axios
        .post("http://120.78.186.60:8091/ErpSg/api/getJrgcData")
        .then((res) => {
          this.tableData = (res && res.data && res.data.data) || [];
          this.$nextTick(() => {
            timer = requestAnimationFrame(this.startScroll);
          });
          sessionStorage.setItem(
            "dyeEnergyConsumptionTableData",
            JSON.stringify(this.tableData)
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    startScroll() {
      const table = this.$refs.table;
      const wrapper = table.bodyWrapper;
      wrapper.scrollTop += 1;
      if (wrapper.clientHeight + wrapper.scrollTop == wrapper.scrollHeight) {
        wrapper.scrollTop = 0;
      }
      timer = requestAnimationFrame(this.startScroll);
    },
    mouseEnter() {
      cancelAnimationFrame(timer);
    },
    mouseLeave() {
      timer = requestAnimationFrame(this.startScroll);
    },
  },
  destroyed() {
    cancelAnimationFrame(timer);
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
};
</script>

<style lang="less" scoped>
.dye-chemical {
  height: 100%;
  max-height: 420px;
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #133f82;
  }
  /deep/.el-table {
    border-color: #133f82;
    background-color: transparent;

    .el-table__body tr.hover-row td,
    tr:hover td {
      transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
      background-color: #00137eb7 !important;
    }

    .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 25px;
      line-height: 25px;
    }

    &.is-header-transparent {
      .el-table__header {
        tr {
          background: transparent;
        }
        th {
          background: rgba(12, 17, 69, 0.334) !important;
          transition: background 0.3s;
        }
      }
    }

    .el-table__body tr,
    .el-table__body td {
      padding: 0;
      height: 25px;
      border-collapse: collapse;
      border: 1px solid #cccccc45;
      line-height: 25px;
      text-align: center;
    }

    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        // 整个滚动条
        width: 0; // 纵向滚动条的宽度
        background: rgba(213, 215, 220, 0.3);
        border: none;
      }
      &::-webkit-scrollbar-track {
        // 滚动条轨道
        border: none;
      }
    }

    th.gutter {
      display: none;
      width: 0;
    }
    colgroup col[name="gutter"] {
      display: none;
      width: 0;
    }

    .el-table__body {
      width: 100% !important;
    }
  }
}
</style>
