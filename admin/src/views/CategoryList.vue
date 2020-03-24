<template>
    <div class="about">
        <h1>分类列表</h1>
        <el-table :data="items">
           <el-table-column prop="_id" label="ID" width="240"></el-table-column>
           <el-table-column prop="parent.name" label="上级分类"></el-table-column>
           <el-table-column prop="name" label="分类名称"></el-table-column>
            
         <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" size="small" 
        @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
     
      <!--es6字符串 `/categories/edit/${scope.row._id}`-->

      <el-button type="primary" size="small" 
        @click="remove(scope.row)">删除</el-button>
      
      </template>
    </el-table-column>
        </el-table> 
    </div>
</template>

<script>

export default {
    data(){
        return {
            items:[]
        }
    },
    methods: {
        // 刷新
       async fetch(){
        const res =await this.$http.get('rest/categories')
        this.items = res.data
        },
        // 删除
        async remove(row){
          this.$confirm(`将永久删除该分类, 是否继续?${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
        }
        // 由于用到接口,async方法
    },
    created() {
        this.fetch()
    }
}
</script>