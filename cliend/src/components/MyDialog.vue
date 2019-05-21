<template>
  <div class="my-dialog">
    <el-dialog
      title="添加资金信息"
      :visible.sync="dialog.show">
      <div class="dialog-form">
        <el-form ref="form" :model="formData" :rules="formRules" label-width="120px" style="margin:10px;width:auto;">
          <el-form-item prop="type" label="收支类型" >
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option v-for="(item,index) in formatTypeList" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item prop="describe" label="收支描述">
            <el-input v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="incode" label="收入">
            <el-input v-model="formData.incode"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="支出">
            <el-input v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="账户现金">
            <el-input v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addMoneyFlow,editMoneyFlow} from '../api/money' 
export default {
  name:'MyDialog',
  props:{
    dialog:Object,
    formData:Object
  },
  data(){
   return {
     formatTypeList:['提现','提现手续费','充值','优惠券','充值礼券','转账'],
     formRules:{
       type:[{required:true,message:'收支类型不能为空',trigger:'blur'}],
       describe:[{required:true,message:'收支描述不能为空',trigger:'blur'}],
       incode:[{required:true,message:'收入不能为空',trigger:'blur'}],
       expend:[{required:true,message:'支出不能为空',trigger:'blur'}],
       cash:[{required:true,message:'账户现金不能为空',trigger:'blur'}],
     }
   }
  },
  methods:{
    onSubmit(form){
      // 这种形式，element-ui通过rules判断是否可以提交，value是true/false
      this.$refs[form].validate(value=>{
        if(value){
          if(this.dialog.option == 'add') this.add()
          else this.edit()
          this.dialog.show = false  // 关闭弹窗
          this.$emit('update')      // 父组件刷新页面
        }
      })
    },
    add(){
      console.log('add')
      addMoneyFlow(this.formData).then(res=>{
        this.$message({
          message:'数据添加成功',
          type:'success'
        })
      })
    },
    edit(){
      editMoneyFlow(this.formData._id,this.formData).then(res=>{
        this.$message({
          message:'数据修改成功',
          type:'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
