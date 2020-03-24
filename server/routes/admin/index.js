module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams : true
  } )
  // 合并参数
  // const Category = require('../../models/Category')

  //老接口
  // router.post('/', async (req, res) => {
    
  //   const model = await Category.create(req.body)
  //   res.send(model)
  // })


  // 接口复用

  // 新建分类
  router.post('/', async (req, res) => {
    
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改分类 put方法提交 接收id  接受两个参数 从id找，找完更新掉
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
   // 删除分类 put方法提交 接收id  接受两个参数 从id找，找完更新掉 无需返回值 提示
   router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success:true
    })
  })
  // 查看分类 分类列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    // 满足通用性 又满足扩展性
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    // req.Model.find().populate('parent')  popilate 方法查询所有上级 limit只显示多少
    res.send(items)
  })
  // 编辑分类 接收id
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 动态参数 resource 匹配 加入中间件
  app.use('/admin/api/rest/:resource',async(req,res,next)=>{
     // 安装npm i inflection   inflection包中有很多大小写转换
    const ModelName = require('inflection').classify(req.params.resource)
    // classify转类名方法
    req.Model = require(`../../models/${ModelName}`)
    next()
  }, router)


  const multer = require('multer')
  // 中间件upload执行multer方法  传递目标地址 
  const upload = multer({dest: __dirname + '/../../uploads'})
  // 图片路由 获取上传文件 npm i multer 安装 multer 中间件处理图片上传
  app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
     const file = req.file
     file.url = `http://localhost:3000/uploads/${file.filename}`
     res.send(file)
  })


}