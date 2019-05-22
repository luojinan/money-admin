<template>
  <div class="money-flow">
    <!-- 添加按钮 -->
    <el-form :inline="true" ref="add_data">
      <el-form-item class="btn-right">
        <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
    v-if="tableData.length >0"
    :data="tableData"
    border>
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="70">
    </el-table-column>
    <el-table-column
      label="创建时间"
      align="center"
      width="250">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="收支类型"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="收支描述"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      label="收入"
      align="center"
      width="100">
      <template slot-scope="scope">
        <span style="color:#00d053">{{ scope.row.incode }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="支出"
      align="center"
      width="100">
      <template slot-scope="scope">
        <span style="color:#f56767">{{ scope.row.expend }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="账户现金"
      align="center"
      width="100">
      <template slot-scope="scope">
        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      align="center"
      width="220">
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      align="center"
      width="180"
      fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          icon="edit"
          type="warning"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini" 
          icon="edit"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col :span="24">
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.index"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.size"
          layout="total,sizes,prev,pager,next,jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
  <my-dialog :dialog="dialog" :formData="formData" @update="getData"></my-dialog>
  </div>
</template>

<script>
import {getMoneyFlow,deleteMoneyFlow} from '../../api/money'
import MyDialog from '../../components/MyDialog'
export default {
  name:'MoneyFlow',
  components:{
    MyDialog
  },
  data(){
   return {
     allTableData:[],
     tableData:[],
     formData:{},
     dialog:{},
     page:{
       index:1,
       total:0,
       size:5
     }
   }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      const res = await getMoneyFlow()
      this.allTableData = res.data
      this.setTableData()
    },
    setTableData(){
      this.page = {
        index:1,
        size:5,
        total:this.allTableData.length
      }
      this.tableData = this.allTableData.filter((item,index)=>{
        return index<this.page.size
      })
    },
    handleAdd(){
      console.log('添加')

      this.dialog={
        show:true,
        title:'添加资金信息',
        option:'add'
      }
      this.formData={
        type:'',
        describe:'',
        incode:'',
        expend:'',
        cash:'',
        remark:'',
        id:''
      }
    },
    handleEdit(row){
      this.dialog={
        show:true,
        title:'编辑资金信息',
        option:'edit'
      }
      this.formData=row
    },
    async handleDelete(row){
      console.log(row)
      const res = await deleteMoneyFlow(row._id)
      if(res.data){
        this.$message({
          message:'删除数据成功',
          type:'success'
        })
      }
    },
    // 组件自带参数--点击要更改成一页显示多少的size
    handleSizeChange(page_size){
      this.page.index = 1,
      this.page.size = page_size,
      this.tableData = this.allTableData,filter((item,index)=>{
        return index<page_size
      })
    },
    // 组件自带参数--点击要切换到第几页的index
    handleCurrentChange(page){
      // 获取当前页最后一个数据的序列
      let index = this.page.size*(page-1)
      // 获取总数
      let nums = this.page.size*page
      let tables = []
      for(let i = index;i<nums;i++){
        if(this.allTableData[i]) tables.push(this.allTableData[i])
      }
      this.tableData = tables
    }
  }
}
</script>

<style scoped lang="scss">
.money-flow{
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  .btn-right{
    float:right;
  }
  .pagination{
    margin-top: 10px;
    float: right;
  }
}
</style>
