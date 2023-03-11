<template>
  <div class="dye-chemical">
    <el-table
      :data="tableData"
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
      fit
      ref="table"
      height="100%"
      @cell-mouse-enter="mouseEnter"
      @cell-mouse-leave="mouseLeave"
    >
      <el-table-column prop="sh" label="基本资料">
        <el-table-column prop="scdh" label="生产单号"></el-table-column>
        <el-table-column prop="pz" label="品种"></el-table-column>
        <el-table-column prop="gh" label="缸号"></el-table-column>
      </el-table-column>
      <el-table-column label="染色投入纱量">
        <el-table-column prop="slm" label="m"></el-table-column>
        <el-table-column prop="slkg" label="KG"></el-table-column>
      </el-table-column>
      <el-table-column prop="rssj" label="染色时间"></el-table-column>
      <el-table-column label="母液使用实绩">
        <el-table-column label="母液标准用量">
          <el-table-column label="上染">
            <el-table-column prop="mybzsr" label="OWF %"></el-table-column>
          </el-table-column>
          <el-table-column label="用量">
            <el-table-column prop="mybzyl" label="L"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="母液实际用量">
          <el-table-column label="流量计用量">
            <el-table-column prop="mysjyl" label="L"></el-table-column>
          </el-table-column>
          <el-table-column label="化料桶用量">
            <el-table-column prop="mysjyl" label="#"></el-table-column>
          </el-table-column>
          <el-table-column label="上染">
            <el-table-column prop="mysjsr" label="OWF %"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="标准偏差">
          <el-table-column prop="mybzpc" label="%"></el-table-column>
          <el-table-column
            prop="mybzpcsm"
            label="异常判断及备注说明"
            width="100"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="助剂使用实绩">
        <el-table-column label="助剂标准用量">
          <el-table-column prop="zjbz" label="L"></el-table-column>
        </el-table-column>
        <el-table-column label="助剂实际用量">
          <el-table-column prop="zjsj" label="L"></el-table-column>
        </el-table-column>
        <el-table-column label="标准偏差">
          <el-table-column prop="zjbzpc" label="%"></el-table-column>
          <el-table-column
            prop="zjbzpcsm"
            label="异常判断及备注说明"
            width="100"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="前处理槽烧碱用量">
        <el-table-column prop="sjyl" label="KG"></el-table-column>
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
    };
  },
  created() {},
  mounted() {
    this.getTableData();
  },
  computed: {},
  methods: {
    getTableData() {
      this.$axios
        .post("http://120.78.186.60:8091/ErpSg/api/getFzclRsylData")
        .then((res) => {
          this.tableData = (res && res.data && res.data.data) || [];
          this.$nextTick(() => {
            timer = requestAnimationFrame(this.startScroll);
          });
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
};
</script>

<style lang="less" scoped>
.dye-chemical {
  height: 100%;
  max-height: 430px;
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
