<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}广告位</h1>
    <!--判断id es6写法 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!--名称-->
       <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button size="smaell" 
        @click="model.items.push({})"><i class="el-icon-plus">
        </i>添加技能 
        </el-button>
        
        <el-row type="flex" style="flex-wrap:wrap">
        <!--点击添加后 增加数据 取索引值-->
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接Url">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item,'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            
        <el-form-item style="margin-top:1rem;">
          <el-button size="small" type="danger" 
          @click="model.items.splice(i,1)"
          >删除</el-button>
        </el-form-item>

          </el-col>
        </el-row>
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
      model: {
        items:[]
      }
    }
  },
  methods: {
    //save方法判断 新建使用pust 修改使用put 
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      }else{
        res = await this.$http.post('rest/ads', this.model)
      }
    
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 刷新方法
    async fetch(){
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({},this.model,res.data);
      //赋值items
      
    },
     // 获取数组 1获取分页数据 2专门一页做父级选项 
    // async fetchParents(){
    //   const res = await this.$http.get(`rest/ads`)
    //   this.parents = res.data
    // }
  },
  // 新建时有id执行
  created(){
    // this.fetchParents()
    this.id && this.fetch()
  }
}
</script>
