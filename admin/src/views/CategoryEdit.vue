<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <!--判断id es6写法 -->
    <el-form label-width="120px" @submit.native.prevent="save">
     <!--分类-->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">

          </el-option>
        </el-select>
      </el-form-item>
      <!--名称-->
       <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props:{
    id:{}
  },
  data(){
    return {
      // 分类
      model: {},
      // 选项父级
      parents:[],
    }
  },
  methods: {
    //save方法判断 新建使用pust 修改使用put 
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      }else{
        res = await this.$http.post('rest/categories', this.model)
      }
    
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 刷新方法
    async fetch(){
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
     // 获取数组 1获取分页数据 2专门一页做父级选项 
    async fetchParents(){
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  // 新建时有id执行
  created(){
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>
