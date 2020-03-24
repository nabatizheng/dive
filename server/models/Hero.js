const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  // 名称 头像 称号 
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  //英雄类型 因为关联性mongoose.SchemaTypes.ObjectId 绑定到id 设置数组 实现多选
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 英雄打分 难度 技能 伤害 生存
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  // 技能描述 多个所以复数数组 图标 名称 冷却时间 花费 介绍  提示
  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  // 装备 关联装备
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 英雄关系 英雄 描述
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }],
})

module.exports = mongoose.model('Hero', schema, 'heroes')