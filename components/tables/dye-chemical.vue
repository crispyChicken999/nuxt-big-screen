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
      <el-table-column prop="sh" label="色号"></el-table-column>
      <el-table-column label="染色化料">
        <el-table-column
          prop="hlsj"
          label="化料时间"
          width="100"
        ></el-table-column>
        <el-table-column label="靛蓝前打底母液">
          <el-table-column prop="dlqxh" label="化料序号"></el-table-column>
          <el-table-column label="实际化料">
            <el-table-column prop="dlqsjhl" label="L"></el-table-column>
          </el-table-column>
          <el-table-column label="母液代码">
            <el-table-column prop="dlqmydm" label="#"></el-table-column>
          </el-table-column>
          <el-table-column label="染料用量">
            <el-table-column label="标准用量">
              <el-table-column prop="dlqrlylbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="dlqrlylsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="靛蓝母液">
          <el-table-column prop="dlxh" label="化料序号"></el-table-column>
          <el-table-column label="实际化料">
            <el-table-column prop="dlsjhl" label="L"></el-table-column>
          </el-table-column>
          <el-table-column label="母液代码">
            <el-table-column
              prop="dlmydm"
              label="#"
              width="120"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="靛蓝">
            <el-table-column label="标准用量">
              <el-table-column prop="dldlbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="dldlsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="烧碱">
            <el-table-column label="标准用量">
              <el-table-column prop="dlsjbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="dlsjsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="保险粉">
            <el-table-column label="标准用量">
              <el-table-column prop="dlbxfbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="dlbxfsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="靛蓝后套面母液">
          <el-table-column prop="dlhxh" label="化料序号"></el-table-column>
          <el-table-column label="实际化料">
            <el-table-column prop="dlhsjhl" label="L"></el-table-column>
          </el-table-column>
          <el-table-column label="母液代码">
            <el-table-column
              prop="dlhmydm"
              label="#"
              width="120"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="染料用量">
            <el-table-column label="标准用量">
              <el-table-column prop="dlhrlbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="dlhrlsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="靛蓝后套面母液">
          <el-table-column label="实际化料">
            <el-table-column prop="zjsjhl" label="L"></el-table-column>
          </el-table-column>
          <el-table-column label="烧碱">
            <el-table-column label="标准用量">
              <el-table-column prop="zjsjbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="zjsjsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="保险粉">
            <el-table-column label="标准用量">
              <el-table-column prop="zjbxfbz" label="KG"></el-table-column>
            </el-table-column>
            <el-table-column label="实际用量">
              <el-table-column prop="zjbxfsj" label="KG"></el-table-column>
            </el-table-column>
          </el-table-column>
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
      if (sessionStorage.getItem("dyeChemicalTableData")) {
        this.tableData = JSON.parse(
          sessionStorage.getItem("dyeChemicalTableData")
        );
        this.$nextTick(() => {
          timer = requestAnimationFrame(this.startScroll);
        });
        return;
      }
      this.isLoading = true;
      this.$axios
        .post("http://120.78.186.60:8091/ErpSg/api/getFzclRshlData")
        .then((res) => {
          this.tableData = (res && res.data && res.data.data) || [];
          this.$nextTick(() => {
            timer = requestAnimationFrame(this.startScroll);
          });
          sessionStorage.setItem(
            "dyeChemicalTableData",
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
  max-height: 400px;
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
